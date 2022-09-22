import {Grid} from "@mui/material";
import React, {useContext, useEffect, useState} from 'react';

import BlogListing from "./listing";

export default function BlogListPage() {
    const [ posts, setPosts ] = useState(null);

    useEffect(() => {
        const posts = JSON.parse(document.getElementById("json-data").innerText);
        setPosts(posts)
    }, []);

    return (
        <Grid container spacing={ 5 }>{ posts == null &&
            <> { new Array(10).fill(0).map((post, i) => (
                <Grid item xs={ 12 } key={ i }>
                    <BlogListing id={ null } post={ null } />
                </Grid>
            )) } </>
        } { posts != null && !posts.empty &&
            <> { posts.map((post) => (
                <Grid item xs={ 12 } key={ post.id }>
                    <BlogListing id={ post.id } post={post}  />
                </Grid>
            )) } </>
        } </Grid>
    );
}