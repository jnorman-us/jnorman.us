import {useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

import FirebaseContext from "../firebase/context";

export default function WritePage() {
    const navigate = useNavigate();
    const { firebaseReady, createPost } = useContext(FirebaseContext);

    const [ title, setTitle ] = useState('');
    const [ summary, setSummary ] = useState('');
    const [ submit, setSubmit ] = useState(false);
    const [ contents, setContents ] = useState('');

    useEffect(() => {
        if(!submit) return;
        if(!firebaseReady) return;
        let cancel = false;
        createPost(title, summary, contents).then((id) => {
            console.log("Submitted!", id);
            navigate(`/blog/${ id }`);
        });
        return () => cancel = true;
    }, [ submit ])

    return (
        <Grid container spacing={ 1 }>
            <Grid item xs={ 12 }>
                <TextField
                    label="Title"
                    value={ title }
                    onChange={ e => setTitle(e.target.value) }
                />
            </Grid>
            <Grid item xs={ 12 }>
                <TextField
                    label="Summary"
                    value={ summary }
                    multiline
                    fullWidth
                    onChange={ e => setSummary(e.target.value) }
                />
            </Grid>
            <Grid item xs={ 12 }>
                <TextField
                    label="Contents"
                    value={ contents }
                    multiline
                    fullWidth
                    rows={ 5 }
                    onChange={ e => setContents(e.target.value) }
                />
            </Grid>
            <Grid item xs={ 12 }>
                <Button onClick={ () => setSubmit(true) } variant="contained">
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
}