import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ColumnModal from "./ColumnModal";
import DatabaseModal from './DatabaseModal';
import { useState } from 'react';



const NewWorkspaceModal = ({workspaceModalOpen, setWorkspaceModalOpen}) => {

  const [databaseModalOpen, setDatabaseModalOpen] = useState(false);

        const handleClose = () => {
          setWorkspaceModalOpen(false);
      }

      const handleDatabaseModal = () => {
          setWorkspaceModalOpen(false);
          setDatabaseModalOpen(true);
      }


    return (
      <>
      <Dialog onClose={handleClose} open={workspaceModalOpen} sx={{overflowY: "hidden"}}>
          <DialogTitle sx={{fontWeight: "300"}}>Enter Workspace Name</DialogTitle>
          <DialogContent sx={{marginTop: "16px"}}>
              <Grid container spacing={1}>
                  <p>Heelloo dirty fellow</p>
              </Grid>
                </DialogContent>
                <DialogActions sx={{padding: "12px"}}>
                    <Button onClick={handleDatabaseModal} sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                        Select Database
                        <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                    </Button>
                </DialogActions>
            </Dialog>
            <DatabaseModal databaseModalOpen={databaseModalOpen} setDatabaseModalOpen={setDatabaseModalOpen}/>
        </>
    );
}

export default NewWorkspaceModal;
