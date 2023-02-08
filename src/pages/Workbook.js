import React from 'react';
import { useState } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBar, Divider, Grid } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

import TopbarHome from '../components/TopbarHome';
import Topbar from '../components/Topbar';
import WorkbookCard from '../components/WorkbookCard';
import NewWorkbookCard from '../components/NewWorkbookCard';


const Top = TopbarHome

const workbooks = [{id:1, name: "Workbook 1", created: "08/24"}, 
                    {id:2, name: "Workbook 2", created: "09/24"}, 
                    {id:3, name: "Workbook 3", created: "10/24"}]

const Workbook = () => {
    const drawerWidth = 200;
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        }),
    }));

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <>  
            <Box sx={{display:"flex"}}>
                <AppBar position="fixed" sx={{boxShadow: "none"}}>
                    <Top/>
                    <Divider />
                </AppBar>
            
                <Box sx={{paddingBottom: "100px"}}>
                    <Grid container spacing={1}>
                        <Grid item md={10} lg={10}>
                            <Box sx={{marginTop:"122px",marginLeft:"90px", paddingBottom : "100px"}}>
                                <p style={{fontFamily:"Inter"}}>Your Workbooks</p>
                            
                                <Box sx={{display: "flex"}}>
                                    
                                    <Grid
                                    container
                                    rowSpacing={3} 
                                    columnSpacing={5}
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="flex-start"
                                    >
                                        {workbooks.map((book)=>(
                                            <Grid item>
                                                <WorkbookCard cardTitle = {book.name} createdOn = {book.created}/>
                                            </Grid >
                                            
                                        ))}
                                            <Grid item>
                                                <NewWorkbookCard/>
                                            </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            
                        </Grid>
                        <Divider orientation="vertical" flexItem/>
                        <Grid item md={2} lg={2}>
                            
                            
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
        
    );
}

export default Workbook;

