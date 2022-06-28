import React, {useEffect, useState} from 'react';
import {Divider, Grid} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import {useWindowWidth} from "@react-hook/window-size";

import MenuBar from "./menu/bar";
import AboutPage from "./about/page";
import BlogListPage from "./blog/list-page";

export default function App() {
    const windowWidth = useWindowWidth();
    const [ width, setWidth ] = useState(0);

    useEffect(() => {
        if(windowWidth >= 1000) {
            setWidth(930);
        } else if(windowWidth >= 700) {
            setWidth(windowWidth - 70);
        } else {
            setWidth(windowWidth - 40);
        }
    }, [ windowWidth ]);
    return (
        <Grid container sx={{
            marginY: '30px',
            marginX: 'auto',
            width: width,
        }}>
            <Grid item sm={ 4 } xs={ 12 }>
                <MenuBar />
            </Grid>
            <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
            <Grid item sm={ 8 } xs={ 12 } sx={{
                paddingLeft: '1px',
            }}>
                <Routes>
                    <Route
                        path="/"
                        element={ <AboutPage /> }
                    />
                    <Route
                        path="/about"
                        element={ <AboutPage /> }
                    />
                    <Route
                        path="/blog"
                        element={ <BlogListPage /> }
                    />
                </Routes>
            </Grid>
        </Grid>
    );
}