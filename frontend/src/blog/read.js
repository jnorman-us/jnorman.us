import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight'
import {useEffect, useState, useContext} from "react";
import {Box, Grid, Skeleton, Typography} from "@mui/material";

import FirebaseContext from "../firebase/context";

import '../styles/font.css';
import {Helmet} from "react-helmet";
import SEO from "../seo/seo";

export default function BlogReadPage() {
    const { id } = useParams();
    const { firebaseReady, getPostByID } = useContext(FirebaseContext);

    const [ post, setPost ] = useState(null);

    useEffect(() => {
        if(firebaseReady && id != null) {
            let cancel = false;
            getPostByID(id).then((result) => {
                setTimeout(() => {
                    if(cancel) return;
                    if(result.exists()) {
                        setPost(result.data());
                    }
                }, 200);
            });
            return () => cancel = true;
        }
    }, [id, firebaseReady]);

    const ready = post != null;

    const title = (ready ?
        <Typography variant="h4" sx={{
            fontSize: '32px',
            fontWeight: '500',
        }}>
            { post.title }
        </Typography> :
        <Skeleton variant="text" />
    );
    const subtitle = (ready ?
        <Typography variant="subtitle1" sx={{
            color: '#666',
        }}>
            { post.summary }
        </Typography> :
        <Skeleton variant="text" />
    );
    const date = ready ? new Date(post.time_published.seconds * 1000) : null;
    const time_published = (ready ?
        <Typography variant="button" sx={{
            color: '#666',
        }}>
            { `Published on ${date.toLocaleString('en-us',{month:'long'})} ${date.getDate()}, ${date.getFullYear()}` }
        </Typography> :
        <Skeleton variant="text" width="100px" />
    );
    const contents = (ready ?
        <ReactMarkdown
            rehypePlugins={[ rehypeHighlight ]}
            className="font"
        >
            { post.contents }
        </ReactMarkdown> :
        <Grid container spacing={ 3 }>{ (new Array(10).fill(0)).map((x, i) => (
            <Grid item xs={ 12 } key={ i }>{ (new Array(Math.floor(Math.random() * 5 + 1)).fill(0)).map((x, i) => (
                <Skeleton variant="text" key={ i } />
            )) } </Grid>
        )) }
        </Grid>
    );

    return (
        <>
            <SEO
                title={ `${ready ? post.title : "Blog" } - jnorman.us` }
                description={ ready ? post.summary : "" }
            />
            <Grid container spacing={ 1 }>
                <Grid item xs={ 12 }>
                    { title }
                </Grid>
                <Grid item xs={ 12 }>
                    { subtitle }
                </Grid>
                <Grid item xs={ 12 }>
                    { time_published }
                </Grid>
                <Grid item xs={ 12 } sx={{
                    marginTop: 2,
                }}>
                    { contents }
                </Grid>
            </Grid>
        </>
    );
}