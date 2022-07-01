import {createContext} from "react";

const FirebaseContext = createContext({
    firebaseReady: false,
    getAllPosts: null,
    getPostByID: null,
    iterateReads: null,
    createPost: null,
});

export default FirebaseContext;