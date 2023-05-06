import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, private_createTypography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from "react";
import axios from "axios";



function DatabaseModal ({ databaseName, setDatabaseName}) {

    // const handleClose = () => {
    //     setDatabaseModalOpen(false);
    // }

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    //const [databaseName, setDatabaseName] =  useState("")
    const [createWorkspaceOpen,setCreateWorkspaceOpen] =  useState(false)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        await axios.post('http://127.0.0.1:8000/upload-file/', formData, {
            onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
            console.log(progress, "helllo")
            setProgress(progress);
            },
        })
        .then(function (response) {
            setDatabaseName([response.data.id, response.data.name])
            console.log(response.data.name)
            return response
        }).then (function (body){
            console.log(body)
            console.log('File uploaded successfully!' );
            //setDatabaseName([body.id, body.name])
        }).catch(err => {
            console.log(err)
        })
        };


    // const handleDatabaseModal = () => {
    //         setDatabaseModalOpen(false);
    //         setCreateWorkspaceOpen(true);
    // }
    
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <br/>
                <br/>
                <Button  variant="contained" type="submit" disabled={!file}>
                    Upload
                </Button>
                <br/>
                <br/>
                {/* {progress === 0 ? console.log(progress) : progress=== 100 ? console.log(progress) : <LinearProgress variant="determinate" value={progress} color="success" />} */}
                <LinearProgress variant="determinate" value={progress} color="success" />
                {progress === 100 ? <p>Database uploaded Successfully!!</p> : null}
                
            </form>
        </>
    )
}

export default DatabaseModal;