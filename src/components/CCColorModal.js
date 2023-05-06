import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, FormControl, FormControlLabel, RadioGroup, Radio, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from "react-router-dom";

function ChangeColor({colorModalOpen, setColorModalOpen,chartDetails}) {

    const {text} =  useParams()
    const [newColor, setNewColor] = useState('pastel');


    const handleClose = () => {
        setColorModalOpen(false);
        setNewColor('pastel');
        window.location.reload()
    }


    const editChartPost = async () => {
        const data = {...chartDetails,"options":chartDetails.options.concat(",").concat(newColor)}
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      };
      fetch(`http://127.0.0.1:8000/chart/${text}/`, requestOptions)
          .then(function (response) {
            // ...
            console.log(response);
            handleClose()
            return response.json();
          }).then(function (body) {
            // ...
            console.log(body);
          }).catch(err => {
              console.log(err)
          })
    }
    // API call to save new Color

    return(
        <Dialog onClose={handleClose} open={colorModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Add / Change Color Palette</DialogTitle>
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
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}} onClick={editChartPost}>
                    Done
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChangeColor;