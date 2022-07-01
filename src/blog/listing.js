import React from 'react';
import {Link} from "react-router-dom";
import {Button, Grid, Skeleton, Typography} from "@mui/material";

import '../styles/link.css';

export default function BlogListing({
    id,
    post,
}) {
    const empty = post == null;
    const url = `/blog/${ id }`;

    const title = (!empty ?
        <Typography variant="h4" sx={{
            fontSize: '28px',
            fontWeight: '500',
        }}>
            <Link to={ url } className="out-link">
                { post.title }
            </Link>
        </Typography> :
        <Skeleton variant="text" />
    );
    const date = !empty ? new Date(post.time_published.seconds * 1000) : null;
    const time_published = (!empty ?
        <Typography variant="button" sx={{
            color: '#666',
        }}>
            { `${date.toLocaleString('en-us',{month:'long'})} ${date.getDate()}, ${date.getFullYear()}` }
        </Typography> :
        <Skeleton variant="text" width="100px" />
    );
    const summary = (!empty ?
        <Typography variant="body1" sx={{
            fontWeight: '300',
        }}>
            { post.summary }
        </Typography> :
        <Skeleton variant="rectangular" height="60px" />
    );

    const button = (!empty ?
            <Link to={ url } className="out-link out-link-blue">
                <Typography>
                    Read
                </Typography>
            </Link> :
        <Skeleton variant="text" width="100px" />
    );

    return (
        <Grid container spacing={ 1 }>
            <Grid item xs={ 12 }>
                { title }
            </Grid>
            <Grid item xs={ 12 }>
                { time_published }
            </Grid>
            <Grid item xs={ 12 }>
                { summary }
            </Grid>
            <Grid item xs={ 12 }>
                { button }
            </Grid>
        </Grid>
    );
}