import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function ChangeTitle({titleModalOpen, setTitleModalOpen, chartDetails}) {
    //console.log(chartDetails.title)

    const {text} = useParams()
    const [newTitle, setNewTitle] = useState('');
    //const [oldTitle, setOldTitle] =  useState(chartDetails.title)

    const handleClose = () => {
        setTitleModalOpen(false);
        setNewTitle('');
        window.location.reload()
    }


    const editChartPost = async () => {
        const data = {...chartDetails,"title":newTitle}
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


    // API call to get existing title and put it as placeholder in the textfield
    // API call to save new title

    return(
        <Dialog onClose={handleClose} open={titleModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Add / Change Title</DialogTitle>
            <DialogContent>
                <TextField id="outlined-basic" variant="outlined" placeholder={chartDetails.title} value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}}/>
            </DialogContent>
            {newTitle !== '' && <DialogActions sx={{padding: "12px"}}>
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}} onClick={editChartPost}>
                    Done
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default ChangeTitle;