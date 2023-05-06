import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { ColorModeContext, tokens } from "../theme";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBar, Button, Divider, Grid } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import TopbarHome from '../components/TopbarHome';
import Topbar from '../components/Topbar';
import WorkbookCard from '../components/WorkbookCard';
import NewWorkbookCard from '../components/NewWorkbookCard';
import Modal from '@mui/material/Modal';



import Tour from 'reactour'
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'
import NewWorkspaceModal from '../components/NewWorkspaceModal';

const disableBody = target => disableBodyScroll(target)
const enableBody = target => enableBodyScroll(target)

const displaysteps = [
{
    selector: '.new_Workspace',
    content: (
      <div>
        <h3>Create your own workspace</h3>
        Click on the button to create your own workspace and import data to make dashboards
        <br />
      </div>
    ),
    position: 'right',
}
]


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Top = TopbarHome

// const workbooks = [{id:1, name: "Workbook 1", created: "08/24"}, 
//                     {id:2, name: "Workbook 2", created: "09/24"}, 
//                     {id:3, name: "Workbook 3", created: "10/24"}]

const Workbook = ({clickedWorkspace, setClickedWorkspace}) => {

    const [workspaces, setWorkspaces] = useState([])
    const [isTourOpen, setIsTourOpen] = useState(false)
    const [open, setOpen] = useState(false);
    const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const handleLocal = (workspace) => {
        setClickedWorkspace(workspace)
        localStorage.setItem('clicked',workspace)
    };

    
    useEffect(() => {
        fetchWorkspace();
      }, []);


    const fetchWorkspace = async () => {
        const response = await fetch(
          `http://127.0.0.1:8000/workspace`
        );
        const data = await response.json();
        //const w_id = data[0].workspace
        setWorkspaces(data);
        //console.log(data)
      };
    
    useEffect(()=> {
        if (workspaces) {
            setIsTourOpen(true)
        }
    },[workspaces])

    return (
        <>
            <Box >
                <AppBar position="fixed" sx={{boxShadow: "none"}}>
                    <Top clickedWorkspace={clickedWorkspace} setClickedWorkspace={setClickedWorkspace}/>
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
                                                
                                                    <Grid item id={book.workspace} onClick={(e)=>{handleLocal(e.currentTarget.id)}}>
                                                        <Link to={`/workspace/${book.workspace}/database/${book.database}`}>
                                                            <WorkbookCard className = "workspaces" cardTitle = {book.name} createdOn = {book.created_on}/>
                                                        </Link>
                                                    </Grid>
                                            
                                            ))}
                                       
                                            <Grid item >
                                                <div className= "new_Workspace">
                                                    <Button onClick={()=>{setWorkspaceModalOpen(true)}}>
                                                        <NewWorkbookCard />
                                                    </Button>
                                                    
                                                </div>
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

            {/* <Modal
                open={open}
                onClose={handleClose}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
            >
                <NewWorkspaceModal/>
            </Modal> */}

            <NewWorkspaceModal workspaceModalOpen={workspaceModalOpen} setWorkspaceModalOpen={setWorkspaceModalOpen} clickedWorkspace={clickedWorkspace} setClickedWorkspace = {setClickedWorkspace}/>

            {/* <Tour
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
                steps={displaysteps}
                accentColor="#5F63F2"
                style={{width: '50vw'}}
                // badgeContent={(curr, tot) => `${curr} of ${tot}`}
                isOpen={isTourOpen}
                maskSpace={15}
                rounded={10}
                onRequestClose={() => {
                //handleTourComplete(currentUser)
                setIsTourOpen(false)
                }}
            /> */}
        </>
        
    );
}

export default Workbook;

