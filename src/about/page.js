import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";

export default function AboutPage() {
    useEffect(() => {
        document.title = "About - jnorman.us";
    }, []);

    return (
        <Grid container spacing={ 3 } sx={{
            paddingX: 5,
            paddingY: 2,
        }}>
            <Grid item xs={ 12 }>
                <Typography variant="h4">
                    About Me
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <Typography variant="body1" sx={{
                    fontWeight: '300',
                }}>
                    Hey, my name is Joseph Norman and I'm a Software Engineer.
                    I started programming in high school for my robotics team. From there, I
                    was accepted into UT Dallas (2018). In the summer after my junior year,
                    I interned at Samsung (2021), where we analyzed data from semiconductor
                    plant machinery. I just graduated with my Masters and can't wait
                    to start work at Capital One this summer (2022).
                </Typography>
            </Grid>
        </Grid>
    );
}