import {collection, getDocs, doc, getDoc, runTransaction, addDoc, Timestamp} from "firebase/firestore";

export async function getAllPosts() {
    const postsCol = collection(this, 'posts');
    return await getDocs(postsCol);
}

export async function getPostByID(id) {
    const postRef = doc(this, 'posts', id);
    return await getDoc(postRef);
}

export async function iterateReads(id) {
    try {
        await runTransaction(this, async (transaction) => {
            const postRef = doc(this, 'posts', id);
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists()) {
                throw "Document does not exist!";
            }
            let newViews = postDoc.data().views != null ? postDoc.data().views : 0;
            newViews += 1;
            transaction.update(postRef, { views: newViews });
        });
    } catch(e) {
        console.log(e);
    }
}

export async function createPost(title, summary, contents) {
    const postDoc = await addDoc(collection(this, 'posts'), {
        title,
        summary,
        contents,
        time_published: Timestamp.fromDate(new Date()),
    });
    return postDoc.id;
}