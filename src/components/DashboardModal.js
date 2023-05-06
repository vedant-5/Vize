import React, { useEffect, useState } from "react";

import { Dialog, DialogActions, DialogContent, Button, Box, Typography, Step, Stepper, StepLabel, StepContent, FormGroup, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

function DashboardModal({dashboardModalOpen, setDashboardModalOpen}) {

    const [dbName, setDbName] = useState('')
    const [chartList, setChartList] = useState([])

    const handleClose = () => {
        setDashboardModalOpen(false);
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      fetchChart()
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // call an api here to get the list of all the created charts

    const fetchChart = async () => {
        const response = await fetch( `http://127.0.0.1:8000/chart/`)
        const data = await response.json();
        setChartList(data.response);
        console.log(data.response)
      };

    useEffect(()=>{
        console.log(chartList)
    },[chartList])
    
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
                                {chartList.length > 0 ? 
                                
                                chartList.map((chart)=>{
                                    <FormGroup>
                                        <FormControlLabel control={
                                        <Checkbox 
                                            sx={{
                                            color: pink[800],
                                            '&.Mui-checked': {
                                                color: pink[600],
                                            },
                                            }}
                                        />} 
                                        label = {chart.title} />
                                    </FormGroup>
                                    
                                }) : <p>No charts created</p>}
                                
                                {/* display list of all created charts as checkboxes */}
                                {/* but where is the checkbox code? */}
                                
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