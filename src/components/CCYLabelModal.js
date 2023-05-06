import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ChangeYLabel({yLabelModalOpen, setYLabelModalOpen}) {

    const [newYLabel, setNewYLabel] = useState('');

    const handleClose = () => {
        setYLabelModalOpen(false);
        setNewYLabel('');
    }

    // API call to get existing YLabel and put it as placeholder in the textfield
    // API call to save new YLabel

    return(
        <Dialog onClose={handleClose} open={yLabelModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Change Y Label</DialogTitle>
            <DialogContent>
                <TextField id="outlined-basic" variant="outlined" value={newYLabel} onChange={(e)=>{setNewYLabel(e.target.value)}}/>
            </DialogContent>
            {newYLabel !== '' && <DialogActions sx={{padding: "12px"}}>
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                    Done
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default ChangeYLabel;