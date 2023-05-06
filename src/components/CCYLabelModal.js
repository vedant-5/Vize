import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from "react-router-dom";

function ChangeYLabel({yLabelModalOpen, setYLabelModalOpen, chartDetails}) {

    const {text} = useParams()
    const [newYLabel, setNewYLabel] = useState('');

    const handleClose = () => {
        setYLabelModalOpen(false);
        setNewYLabel('');
        window.location.reload()
    }

    const editChartPost = async () => {
        const data = {...chartDetails,"y_axis":newYLabel}
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
    // API call to get existing YLabel and put it as placeholder in the textfield
    // API call to save new YLabel

    return(
        <Dialog onClose={handleClose} open={yLabelModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Change Y Label</DialogTitle>
            <DialogContent>
                <TextField id="outlined-basic" variant="outlined" placeholder={chartDetails.y_axis} value={newYLabel} onChange={(e)=>{setNewYLabel(e.target.value)}}/>
            </DialogContent>
            {newYLabel !== '' && <DialogActions sx={{padding: "12px"}}>
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}} onClick={editChartPost}>
                    Done
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default ChangeYLabel;