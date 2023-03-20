import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { ColorModeContext, tokens } from "../theme";
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

    const [workspaces, setWorkspaces] = useState([])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

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

    
    useEffect(() => {
        fetchWorkspace();
      }, []);

    const fetchWorkspace = async () => {
        const response = await fetch(
          `http://127.0.0.1:8000/workspace`
        );
        const data = await response.json();
        setWorkspaces(data);
        console.log(data)
      };
    

    return (

        <>  
            <Box >
                <AppBar position="fixed" sx={{boxShadow: "none"}}>
                    <Top/>
                    <Divider />
                </AppBar>
            
                <Box sx={{display:"flex"}}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <Box sx={{marginLeft:"30px"}}>
                                <p style={{fontFamily:"Inter", color:`${colors.greytext}`, marginBottom:"24px"}}>Your Workbooks</p>
                            
                                <Box sx={{display: "flex"}}>
                                    <Grid
                                    container
                                    rowSpacing={4} 
                                    columnSpacing={4}
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="flex-start"
                                    >
                                        {workspaces.map((book)=>(
                                            <Grid item>
                                                <WorkbookCard cardTitle = {book.name} createdOn = {book.created_on}/>
                                            </Grid >
                
                                        ))}
                                            <Grid item>
                                                <NewWorkbookCard/>
                                            </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{height: "100vh", mt:"-36px", mb:"-36px"}}/> 
                        <Grid item xs={2} >
                            
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
        
    );
}

export default Workbook;

