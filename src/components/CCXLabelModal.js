import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ChangeXLabel({xLabelModalOpen, setXLabelModalOpen}) {

    const [newXLabel, setNewXLabel] = useState('');

    const handleClose = () => {
        setXLabelModalOpen(false);
        setNewXLabel('');
    }

    // API call to get existing XLabel and put it as placeholder in the textfield
    // API call to save new XLabel

    return(
        <Dialog onClose={handleClose} open={xLabelModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Change X Label</DialogTitle>
            <DialogContent>
                <TextField id="outlined-basic" variant="outlined" value={newXLabel} onChange={(e)=>{setNewXLabel(e.target.value)}}/>
            </DialogContent>
            {newXLabel !== '' && <DialogActions sx={{padding: "12px"}}>
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                    Done
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default ChangeXLabel;