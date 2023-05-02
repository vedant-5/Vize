import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CreateWorkspace = ({workspace_name,database_name}) => {

    // const handleClose = () => {
    //     setCreateWorkspaceOpen(false);
    // }

    const handleCreateWorkspace = () => {
        createWorkspace()
    }

    const createWorkspace = async () => {
        const d = new Date()
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = d.getFullYear();
        const today = yyyy + '-' + mm + '-' + dd;

        

        const data = {
          "created_by" : "1",
          "name": workspace_name,
          "database" : database_name,
          "dashboards" : null,
          "charts" : null,
          "created_on": today,
          "last_edit" : new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString(),
        }

        console.log(data)
        const requestOptions = {
          method: 'POST',
          headers: { //'Content-Type': 'application/json' 
            },
          body: JSON.stringify(data),
      };
      fetch('http://127.0.0.1:8000/workspace/', requestOptions)
          .then(function (response) {
            // ...
            return response.json();
          }).then(function (body) {
            // ...
            console.log(body);
            //setCreateWorkspaceOpen(false);
          }).catch(err => {
              console.log(err)
          })
        }

    return (
        
        <>
          <p>{workspace_name}</p>
          <p>{database_name}</p>
        </>

    );
}

export default CreateWorkspace;
