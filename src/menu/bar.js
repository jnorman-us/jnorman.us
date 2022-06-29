import React from 'react';
import {SocialIcon} from "react-social-icons";
import {Link, useLocation} from "react-router-dom";
import {LightMode, OpenInNew} from '@mui/icons-material'
import {
    Avatar, Box,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Tooltip,
    Typography
} from "@mui/material";

import profilePicture from '../assets/default-profile.png';

import '../styles/menu.css';

export default function MenuBar() {
    const location = useLocation();

    const selected = {
        blog: location.pathname.includes("/blog"),
        about: location.pathname.includes("/about") || location.pathname == '/',
    };

    return (
        <Grid container spacing={ 3 }>
            <Grid item xs={ 12 }>
                <Link to="/">
                    <Avatar src={ profilePicture } sx={{
                        width: '85px',
                        height: '85px',
                    }}/>
                </Link>
            </Grid>
            <Grid item xs={ 12 }>
                <Grid container spacing={ 0 }>
                    <Grid item xs={ 10 }>
                        <Link to="/" className="menu-link">
                            <Typography variant="h5" sx={{
                                fontWeight: '800'
                            }}>
                                Joseph Norman
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        alignSelf: 'center',
                        textAlign: 'center',
                    }} xs={ 2 }>
                        <Tooltip title="Only light mode is available">
                            <IconButton sx={{ padding: 0,}}>
                                <LightMode />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={ 12 }>
                <Typography variant="subtitle1" sx={{
                    color: 'gray',
                    fontWeight: '300',
                }}>
                    I am a Software Engineer. My focuses include multiplayer game dev,
                    distributed computing, and hydroponics.
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <MenuList>
                    <Link to="/blog" className={ `menu-link ${ selected.blog ? 'menu-link-selected' : '' }` }>
                        <MenuItem>
                            <ListItemText>
                                    Blog
                            </ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to="/about" className={ `menu-link ${ selected.about ? 'menu-link-selected' : '' }` }>
                        <MenuItem>
                            <ListItemText>
                                    About
                            </ListItemText>
                        </MenuItem>
                    </Link>
                    <a href="/Resume.pdf" target="_blank" className="menu-link">
                        <MenuItem>
                            <ListItemText>
                                    Resume
                            </ListItemText>
                            <ListItemIcon>
                                <OpenInNew />
                            </ListItemIcon>
                        </MenuItem>
                    </a>
                </MenuList>
            </Grid>
            <Grid item xs={ 12 } sx={{
                marginTop: 3,
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: '5px',
                    justifyContent: 'center',
                }}>
                    <Box>
                        <SocialIcon target="_blank" url="https://github.com/jnorman-us" className="menu-social" />
                    </Box>
                    <Box>
                        <SocialIcon target="_blank" url="https://www.linkedin.com/in/wine-craft/" className="menu-social" />
                    </Box>
                    <Box>
                        <SocialIcon target="_blank" url="https://www.instagram.com/jnorman.us" className="menu-social" />
                    </Box>
                    <Box>
                        <SocialIcon target="_blank" url="mailto:jnormantransactions@gmail.com" className="menu-social" />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={ 12 } sx={{
                textAlign: 'center',
            }}>
                <Typography variant="body2" sx={{
                    fontWeight: '100',
                    color: 'gray',
                }}>
                    &copy; Joseph Norman { new Date().getFullYear() }
                </Typography>
            </Grid>
        </Grid>
    );
}