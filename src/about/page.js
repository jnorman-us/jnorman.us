import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import OutLink from "../util/out-link";

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
                    Hey, my name is Joseph Norman and I'm a Software Engineer with my MS in CS from UT Dallas.
                    As of right now (2022), I am a bum messing around with the rest of my summer. But in this time,
                    I will work on brushing up my technical skills by working on small projects and learning new
                    languages/frameworks. At the end of the summer, I will start work at Capital One as an Associate
                    Software Engineer.
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <Typography variant="body1" sx={{
                    fontWeight: '300',
                }}>
                    I was first introduced to programming in high school through the introductory CS class and
                    quickly learned the basics of Java and C++. Through my school's FRC team, <OutLink href="https://frc624.org">CRyptonite</OutLink>,
                    I had the opportunity to apply the things I was learning by programming robots and taking the
                    role of webmaster. My largest project from robotics was the team's <OutLink href="http://scout.team624.org">scouting website</OutLink>,
                    a site for keeping track of performance data on other teams at competition. Our team would use
                    the site's fancy graphs to decide on strategies for upcoming matches. It was pretty complicated,
                    and working on this project gave me a lot of experience in PHP, Jquery, and MySQL though I
                    didn't find out what an SQL JOIN was until much later, thus the site was slow.
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <Typography variant="body1" sx={{
                    fontWeight: '300',
                }}>
                    I was accepted into the <OutLink href="https://www.utdallas.edu/">University of Texas at Dallas</OutLink> in the Fall of 2018 to study Computer
                    Science. The classes I took were definitely valuable; they were coherently presented and
                    built upon each other. My favorite masters course was Advanced Operating Systems, where we learned
                    about synchronizing the computing between several machines connected over a network. The main
                    issue is the variances in computing speed, exacerbated by network delays, while trying to get
                    them to collaborate; we wrote distributed algorithms to solve this by ensuring mutual exclusion
                    of a shared resource, consensus across machines, and polling, and we were taught to prove them
                    logically. What I enjoyed the most was seeing the culmination of prior coursework in this class
                    and others I took my senior year. After graduating with my Masters in the Spring of 2022, I can
                    highly recommend the program at UTD.
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <Typography variant="body1" sx={{
                    fontWeight: '300',
                }}>
                    I was fortunate enough to work an internship
                    at <OutLink href="https://www.samsung.com/us/sas/">Samsung Austin Semiconductor</OutLink> during the
                    summer of 2021 with the new Infra Innovation team. This team was part of Samsung's push for the
                    consolidation of data from their production floor machinery into actionable reports for the
                    engineers. We worked in the <OutLink href="https://www.mongodb.com/mern-stack">MERN stack</OutLink> and
                    had several microservices running for the engineers, so my first project was to create a system
                    to capture log events from every service into a central dashboard. My second project was to
                    collaborate with another engineer to create the UI for their work order tracker. While working on
                    these projects, I noticed a few places where code was being duplicated, so I wrapped them up into
                    packages and shared them with my teammates through a private NPM registry. By the end of the summer,
                    I had created 4 packages and setup the workflow for more to be shared between the JavaScript
                    developers at Samsung.
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <Typography variant="body1" sx={{
                    fontWeight: '300',
                }}>
                    Outside of work and school, I have several personal projects that I've been working on available
                    on my <OutLink href="https://github.com/jnorman-us">Github</OutLink>...
                </Typography>
            </Grid>
        </Grid>
    );
}