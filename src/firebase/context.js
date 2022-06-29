import {createContext} from "react";

const FirebaseContext = createContext({
    firebaseReady: false,
    getAllPosts: null,
    getPostByID: null,
});

export default FirebaseContext;