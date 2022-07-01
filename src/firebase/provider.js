import {useEffect, useState} from "react";
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore';

import FIREBASE_CONFIG from "./config";
import FirebaseContext from "./context";
import {createPost, getAllPosts, getPostByID, iterateReads} from "./posts";

export default function FirebaseProvider({
    children,
}) {
    const [ ready, setReady ] = useState(false);
    const [ app, setApp ] = useState(null);
    const [ db, setDB ] = useState(null);

    useEffect(() => {
        const app = initializeApp(FIREBASE_CONFIG);
        const db = getFirestore(app);

        setApp(app);
        setDB(db);
        setReady(true);
    }, []);

    return (
        <FirebaseContext.Provider value={{
            firebaseReady: ready,
            getAllPosts: getAllPosts.bind(db),
            getPostByID: getPostByID.bind(db),
            iterateReads: iterateReads.bind(db),
            createPost: createPost.bind(db),
        }}>
            { children }
        </FirebaseContext.Provider>
    );
}