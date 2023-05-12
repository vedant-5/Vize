import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, FormControl, FormControlLabel, RadioGroup, Radio, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from "react-router-dom";

function ChangeColor({colorModalOpen, setColorModalOpen,chartDetails}) {

    const {text} =  useParams()
    const [newColor, setNewColor] = useState('Light');


    const handleClose = () => {
        setColorModalOpen(false);
        setNewColor('Light');
    }


    const editChartPost = async () => {
        const originalString = chartDetails.options
        const newString = originalString.replace("Dark", "") + `${newColor}`;
        
        const data = {...chartDetails,"options":newString}
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      };
      fetch(`http://127.0.0.1:8000/chart/${text}/`, requestOptions)
          .then(function (response) {
            // ...
            console.log(response);
            
            return response.json();
          }).then(function (body) {
            // ...
            console.log(body);
            window.location.reload()
            handleClose()
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
                        <FormControlLabel value="Light" control={<Radio />} label="Light" />
                        <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
                        <FormControlLabel value="Yellow" control={<Radio />} label="Yellow" />
                        <FormControlLabel value="Blue" control={<Radio />} label="Blue" />
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