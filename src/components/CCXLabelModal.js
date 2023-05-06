import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from "react-router-dom";

function ChangeXLabel({xLabelModalOpen, setXLabelModalOpen, chartDetails}) {

    const {text} = useParams()
    const [newXLabel, setNewXLabel] = useState('');

    const handleClose = () => {
        setXLabelModalOpen(false);
        setNewXLabel('');
        window.location.reload()
    }

    // API call to get existing XLabel and put it as placeholder in the textfield
    // API call to save new XLabel
    const editChartPost = async () => {
        const data = {...chartDetails,"x_axis":newXLabel}
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

    return(
        <Dialog onClose={handleClose} open={xLabelModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Change X Label</DialogTitle>
            <DialogContent>
                <TextField id="outlined-basic" variant="outlined" placeholder={chartDetails.x_axis} value={newXLabel} onChange={(e)=>{setNewXLabel(e.target.value)}}/>
            </DialogContent>
            {newXLabel !== '' && <DialogActions sx={{padding: "12px"}}>
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}} onClick={editChartPost}>
                    Done
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default ChangeXLabel;