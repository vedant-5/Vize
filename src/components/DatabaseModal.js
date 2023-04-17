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


function DatabaseModal ({databaseModalOpen, setDatabaseModalOpen}) {

    const handleClose = () => {
        setDatabaseModalOpen(false);
    }

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

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
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('File uploaded successfully!', response);
        } catch (error) {
        console.error('Error uploading file:', error);
        }
        };
    
    return(
        <Dialog onClose={handleClose} open={databaseModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Select Database File</DialogTitle>
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
            
        </Dialog>
    )
}

export default DatabaseModal;