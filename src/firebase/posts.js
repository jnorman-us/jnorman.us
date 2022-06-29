import {collection, getDocs, doc} from "firebase/firestore";

export async function getAllPosts() {
    const postsCol = collection(this, 'posts');
    return await getDocs(postsCol);
}

export async function getPostByID(id) {
    const postRef = doc(this, 'posts', id);
    return await getDocs(postRef);
}