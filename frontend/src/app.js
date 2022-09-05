import React, {useEffect, useState} from 'react';
import {Divider, Grid} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import {useWindowWidth} from "@react-hook/window-size";

import MenuBar from "./menu/bar";
import AboutPage from "./about/page";
import BlogListPage from "./blog/list-page";
import BlogReadPage from "./blog/read";
import WritePage from "./write/page";

export default function App() {
    const windowWidth = useWindowWidth();
    const [ width, setWidth ] = useState(0);
    const [ padding, setPadding ] = useState(true);

    useEffect(() => {
        if(windowWidth >= 1000) {
            setWidth(930);
        } else if(windowWidth >= 700) {
            setWidth(windowWidth - 70);
        } else {
            setWidth(windowWidth - 40);
        }
        if(windowWidth <= 500) {
            setPadding(false);
        } else {
            setPadding(true);
        }
    }, [ windowWidth ]);
    return (
        <Grid container sx={{
            marginY: '50px',
            marginX: 'auto',
            width: width,
        }}>
            <Grid item sm={ 4 } xs={ 12 } sx={{
                paddingX: padding ? 3 : 1,
                paddingY: 3,
            }}>
                <MenuBar />
            </Grid>
            <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
            <Grid item sm={ 8 } xs={ 12 } sx={{
                paddingX: padding ? 6 : 1,
                paddingY: 3,
            }}>
                <Routes>
                    <Route
                        path="/"
                        element={ <BlogListPage /> }
                    />
                    <Route
                        path="/about"
                        element={ <AboutPage /> }
                    />
                    <Route
                        path="/blog"
                        element={ <BlogListPage /> }
                    />
                    <Route
                        path="/blog/:id"
                        element={ <BlogReadPage /> }
                    />
                    <Route
                        path="/write"
                        element={ <WritePage /> }
                    />
                </Routes>
            </Grid>
        </Grid>
    );
}