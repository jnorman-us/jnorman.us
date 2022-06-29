import React, {useContext, useEffect} from 'react';
import FirebaseContext from "../firebase/context";

export default function BlogListPage() {
    const { firebaseReady, getAllPosts } = useContext(FirebaseContext);

    useEffect(() => {
        document.title = "Blog - jnorman.us";
    }, []);

    useEffect(() => {
        if(firebaseReady) {
            let cancel = false;
            getAllPosts().then((results) => {
                results.forEach((result) => {
                    console.log(result.data());
                });
            });
        }
    }, [ firebaseReady ]);

    return (
        <div>
            Blog page, coming soon...
        </div>
    );
}