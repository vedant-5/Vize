import React, { useEffect } from 'react';


import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ColumnModal from "./ColumnModal";
import DatabaseModal from './DatabaseModal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
//import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
//import Typography from '@mui/material/Typography';

const { forwardRef, useRef, useImperativeHandle } = React;

const NewWorkspaceModal = ({workspaceModalOpen, setWorkspaceModalOpen, clickedWorkspace, setClickedWorkspace,workspaceName }) => {

  const [databaseModalOpen, setDatabaseModalOpen] = useState(false);
  const [name, setName] = useState(workspaceName? workspaceName : "")

  console.log("workspce nme", workspaceName);
  console.log("nm", name);

  const [databaseName,setDatabaseName] =  useState([])
  const navigate = useNavigate()

        const handleClose = () => {
          setWorkspaceModalOpen(false);
      }

      const handleDatabaseModal = () => {
          setWorkspaceModalOpen(false);
          setDatabaseModalOpen(true);
      }

      const [activeStep, setActiveStep] = React.useState(0);

      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };

      const createWorkspace = async () => {
        const d = new Date()
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = d.getFullYear();
        const today = yyyy + '-' + mm + '-' + dd;

        const data = {
          "created_by" : "1",
          "name": name,
          "database" : databaseName[0],
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
            setWorkspaceModalOpen(false);
            // navigate(`/workspace/${body.workspace}/database/${body.database}`)
            // window.location.reload()
            setClickedWorkspace(body.workspace)
            //setCreateWorkspaceOpen(false);
          }).catch(err => {
              console.log(err)
          })
        }

    // useEffect(() => {
    //       databaseRef.current = {handleNext};
    // }, [databaseRef]);

    
    // useEffect(() => {
    //   detailsRef.current = {handleNext};
    // }, [detailsRef]);


    // useEffect(() => {
    //       childRef.current = {createWorkspace};
    // }, [childRef]);

    // useImperativeHandle(childRef, () => ({
    //   createWorkspace (){
    //     createWorkspace()
    //   }
    // }))

    // useImperativeHandle(databaseRef, () => ({
    //   handleNext () {
    //     handleNext()
    //   }
    // }))

    // useImperativeHandle(detailsRef, () => ({
    //   handleNext() {
    //     handleNext()
    //   }
    // }))


    return (
      <>
     
                <Dialog onClose={handleClose} open={workspaceModalOpen} sx={{overflowY: "hidden"}}>
                  <DialogContent>
                    <Box sx={{ maxWidth: 400 }}>
                      <DialogTitle sx={{fontWeight: "600"}}>Creating New Workspace</DialogTitle>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                          <StepLabel>
                              <Typography>Enter Workspace Name</Typography>
                          </StepLabel>
                            <StepContent>
                            <TextField id="outlined-basic" variant="outlined"  defaultValue={ workspaceName ? workspaceName: ""} onChange={(e)=>{setName(e.target.value ? e.target.value : workspaceName)}}/>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                > Continue
                                </Button>
                                {/* <Button
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button> */}
                                </div>
                            </Box>
                            </StepContent>
                        </Step>

                        <Step>
                          <StepLabel>
                              <Typography>Upload Database</Typography>
                          </StepLabel>
                            <StepContent>
                            <DatabaseModal name={name} databaseName={databaseName} setDatabaseName={setDatabaseName}/>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                > Continue
                                </Button>
                                <Button
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                                </div>
                            </Box>
                            </StepContent>
                        </Step>

                        <Step>
                          <StepLabel>
                              <Typography>Verfify Details</Typography>
                          </StepLabel>
                            <StepContent>
                              <p>{name}</p>
                              <p>{databaseName[1]}</p>
                            {/* <CreateWorkspace workspace_name= {name} database_name={databaseName}  /> */}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                <Button
                                    variant="contained"
                                    onClick={createWorkspace}
                                    sx={{ mt: 1, mr: 1 }}
                                > Create Workspace
                                </Button>
                                <Button
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                                </div>
                            </Box>
                            </StepContent>
                        </Step>

                    </Stepper>
                </Box>
              </DialogContent>
            </Dialog>
            
            
        </>
    );
}

export default NewWorkspaceModal;
