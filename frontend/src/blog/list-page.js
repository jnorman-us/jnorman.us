import {Grid} from "@mui/material";
import React, {useContext, useEffect, useState} from 'react';

import BlogListing from "./listing";
import FirebaseContext from "../firebase/context";
import {Helmet} from "react-helmet";
import SEO from "../seo/seo";

export default function BlogListPage() {
    const { firebaseReady, getAllPosts } = useContext(FirebaseContext);

    const [ posts, setPosts ] = useState(null);

    useEffect(() => {
        if(firebaseReady) {
            let cancel = false;
            getAllPosts().then((results) => {
                setTimeout(() => {
                    if(cancel) return;
                    setPosts(results);
                }, 200);
            });
            return () => cancel = true;
        }
    }, [ firebaseReady ]);

    return (
        <>
            <SEO
                title={ `Blog - jnorman.us` }
                description={ "This is my blog, where I keep track of things I am working on and discuss topics that I've been studying" }
            />
            <Grid container spacing={ 5 }>{ posts == null &&
                <> { new Array(10).fill(0).map((post, i) => (
                    <Grid item xs={ 12 } key={ i }>
                        <BlogListing id={ null } post={ null } />
                    </Grid>
                )) } </>
            } { posts != null && !posts.empty &&
                <> { posts.docs.map((post) => (
                    <Grid item xs={ 12 } key={ post.id }>
                        <BlogListing id={ post.id } post={post.data()}  />
                    </Grid>
                )) } </>
            } </Grid>
        </>
    );
}