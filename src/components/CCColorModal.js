import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, FormControl, FormControlLabel, RadioGroup, Radio, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ChangeColor({colorModalOpen, setColorModalOpen}) {

    const [newColor, setNewColor] = useState('pastel');

    const handleClose = () => {
        setColorModalOpen(false);
        setNewColor('pastel');
    }

    // API call to save new Color

    return(
        <Dialog onClose={handleClose} open={colorModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Add / Change Title</DialogTitle>
            <DialogContent>
                <FormControl>
                    <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={newColor} onChange={(e)=>{setNewColor(e.target.value)}}>
                        <FormControlLabel value="pastel" control={<Radio />} label="Pastel" />
                        <FormControlLabel value="palette two" control={<Radio />} label="Palette Two" />
                        <FormControlLabel value="third" control={<Radio />} label="Third" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions sx={{padding: "12px"}}>
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                    Done
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChangeColor;