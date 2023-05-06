import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ChangeTitle({titleModalOpen, setTitleModalOpen}) {

    const [newTitle, setNewTitle] = useState('');

    const handleClose = () => {
        setTitleModalOpen(false);
        setNewTitle('');
    }

    // API call to get existing title and put it as placeholder in the textfield
    // API call to save new title

    return(
        <Dialog onClose={handleClose} open={titleModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Add / Change Title</DialogTitle>
            <DialogContent>
                <TextField id="outlined-basic" variant="outlined" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}}/>
            </DialogContent>
            {newTitle !== '' && <DialogActions sx={{padding: "12px"}}>
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                    Done
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default ChangeTitle;