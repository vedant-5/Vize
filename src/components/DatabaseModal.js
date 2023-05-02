import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CreateWorkspace from "./CreateWorkspace";


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

        try {
        const response = await fetch('http://127.0.0.1:8000/upload-file/', {
            method: 'POST',
            body: formData,
            onUploadProgress: (progressEvent) => {
            const progressPercent = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progressPercent);
            },
        })
        .then(function (response) {
            return response.json()
        }).then (function (body){
            console.log(body)
            console.log('File uploaded successfully!' );
            setDatabaseName([body.id, body.name])

        })
        } catch (error) {
        console.error('Error uploading file:', error);
        }
        };

    // const handleDatabaseModal = () => {
    //         setDatabaseModalOpen(false);
    //         setCreateWorkspaceOpen(true);
    // }
    
    
    return(
        // <Dialog onClose={handleClose} open={databaseModalOpen} sx={{overflowY: "hidden"}}>
        //     <DialogTitle sx={{fontWeight: "600"}}>Select Database File</DialogTitle>
        //     <DialogContent sx={{marginTop: "16px"}}>
        //         <form onSubmit={handleSubmit}>
        //             <input type="file" onChange={handleFileChange} />
        //             <br />
        //             <LinearProgress variant="determinate" value={progress} />
        //             <br />
        //             <button type="submit" disabled={!file}>
        //                 Upload
        //             </button>
        //             {progress === 100 && <CircularProgress />}
        //         </form>
        //     </DialogContent>
        //     {/* <DialogActions sx={{padding: "12px"}}>
        //             <Button onClick={handleDatabaseModal} sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
        //                 View Details
        //                 <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
        //             </Button>
        //     </DialogActions> */}



        //     <CreateWorkspace workspace_name= {name} database_name={databaseName} createWorkspaceOpen = {createWorkspaceOpen} setCreateWorkspaceOpen={setCreateWorkspaceOpen} /> 
            
            
        // </Dialog>
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <br />
                <LinearProgress variant="determinate" value={progress} />
                <br />
                <button type="submit" disabled={!file}>
                    Upload
                </button>
                {progress === 100 && <CircularProgress />}
            </form>
        </>
    )
}

export default DatabaseModal;