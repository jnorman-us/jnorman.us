import {collection, getDocs, doc, getDoc, runTransaction, addDoc, Timestamp} from "firebase/firestore";

export async function getAllPosts() {
    const postsCol = collection(this, 'posts');
    return await getDocs(postsCol);
}

export async function getPostByID(id) {
    const postRef = doc(this, 'posts', id);
    return await getDoc(postRef);
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