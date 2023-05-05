import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, Button, Box, Typography, Step, Stepper, StepLabel, StepContent } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';

function DashboardModal({dashboardModalOpen, setDashboardModalOpen}) {

    const [dbName, setDbName] = useState('')

    const handleClose = () => {
        setDashboardModalOpen(false);
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // call an api here to get the list of all the created charts

    
    return(
        <Dialog onClose={handleClose} open={dashboardModalOpen} sx={{overflowY: "hidden"}}>
            <DialogContent>
                <Box sx={{ maxWidth: 400 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                            <StepLabel>
                                <Typography>Enter Dashboard Name</Typography>
                            </StepLabel>
                            <StepContent>
                                <TextField id="outlined-basic" variant="outlined" value={dbName} onChange={(e)=>{setDbName(e.target.value)}}/>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}> Continue </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                <Typography>Select which existing charts you want to add to this dashboard</Typography>
                            </StepLabel>
                            <StepContent>
                                
                                {/* display list of all created charts as checkboxes */}
                                
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
                    </Stepper>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding: "12px"}}>
                <Button sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                    Create Dashboard
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DashboardModal;