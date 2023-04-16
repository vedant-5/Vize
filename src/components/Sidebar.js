/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {useContext, useState, useEffect} from "react";
import {ColorModeContext, tokens} from "../theme";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Topbar from './Topbar';
import { Button, MenuItem, MenuList, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
// import Database from '../pages/Database';
// import Dashboard from '../pages/Dashboard';
// import IndividualChart from '../pages/IndividualChart';

import Tour from 'reactour'
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'

const disableBody = target => disableBodyScroll(target)
const enableBody = target => enableBodyScroll(target)

const displaysteps = [
  {
      selector: '.database',
      content: (
        <div>
          <h3>View your data</h3>
          Click on your database to view the attributes that could contribute to accurate visualizations. 
          Perform visual analysis of the data file or give voice commands for vize to create charts from the columns you select. 
          <br />
        </div>
      ),
      position: 'right',
  },
  {
    selector: '.new_Dashboard',
    content: (
      <div>
        <h3>Create your dashboard</h3>
        Dashboards can help convey stories about your visualizations. They help to provide a cohesive view of your charts.
        Create your dashboard by clicking on this button and add charts to provide a comprehensive view of the story you want to convey. 
        <br />
      </div>
    ),
    position: 'right',
  },
  {
    selector: '.dashboard',
    content: (
      <div>
        <h3>View Dashboard</h3>
        Vize provides you with the list of dashboards you have created inside your workbook. Each dashboard can help convey a different story. 
        <br />
      </div>
    ),
    position: 'right',
  },
  {
    selector: '.chart',
    content: (
      <div>
        <h3>View Charts</h3>
        You can select the chart that you want to view from the Chart list. Any editing or modifications on charts can be made by either selecting commands on the user interface 
        or giving voice commands. 
        <br />
      </div>
    ),
    position: 'right',
  },
]


const Item = ({title, index, to, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // <Paper open="true">
    //   <MenuList>
        <Link to={to}>
          <MenuItem 
            sx={{
              backgroundColor: `${index === selected ? 'rgba(0,0,0,0.1) !important' : 'transparent !important'}`,
              borderRadius: '10px',
              color: colors.text,
              // padding: `${index === selected ? '0px' : '6px 16px'}`,
              // margin: `${index === selected ? '12px 16px' : '0px'}`,
            }}
            selected={index === selected} 
            onClick={() => {setSelected(index);}}>
            <Typography variant='body2' sx={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{title}</Typography>
          </MenuItem>
        </Link>
    //   </MenuList>
    // </Paper>
  )
}

// const databaselist = ['one'];
// const dashboardlist = ['Inbox', 'Starred', 'Send email', 'Drafts'];
// const chartlist = ['Inbox', 'Hello', 'Send email'];

const drawerWidth = 200;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Sidebar({open, setOpen, clickedWorkspace}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  // const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(0);
  const [dashboards, setDashboards] = useState([])
  const [database, setDatabase] = useState('')
  const [charts, setCharts] =  useState([])
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [workspaceId, setWorkspaceId] =  useState(clickedWorkspace)
  const [count,setCount] = useState(0)
  

  useEffect(() => {
    fetchDashboards();
    fetchChart();
    fetchDatabase();
    setIsTourOpen(true)
  }, []);



const fetchDashboards = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/dashboard/`
    );
    const data = await response.json();
    setDashboards(data.response);
    setWorkspaceId(data.response[0].workspace_name.workspace)
    //console.log(data.response[0].workspace_name.workspace, data.response);
  };

  const fetchDatabase = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/view-file`
    );
    const data = await response.json();
    setDatabase(data[0]);
    //console.log(data)
  };

  const fetchChart = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/chart/`
    );
    const data = await response.json();
    setCharts(data.response);
    //console.log(data.response)
  };

  useEffect(() => {
    // Retrieve the count from localStorage on component mount
    const storedCount = localStorage.getItem('count');
    if (storedCount) {
      setCount(parseInt(storedCount));
    }
  }, []);

  useEffect(() => {
    // Save the count to localStorage whenever it changes
    localStorage.setItem('count', count);
  }, [count]);


  useEffect(()=> {
    const wasRefreshed = sessionStorage.getItem("wasRefreshed")
    if(!wasRefreshed) {
      sessionStorage.setItem('wasRefreshed','true')
      setIsTourOpen(true)
    } else {
      sessionStorage.removeItem(wasRefreshed)
      setIsTourOpen(false)
    }
    // if (dashboards & charts & database & count === 0) {
    //     //localStorage.setItem('setCount', count+1);
    //     setIsTourOpen(true)
    // }
    // return()=>{
    //   setIsTourOpen(null)
    // }
    //console.log(dashboards)
  },[])


  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{boxShadow: "none"}} >
        <Topbar open={open} setOpen={setOpen} clickedWorkspace={clickedWorkspace ? clickedWorkspace :  workspaceId} />
          <Divider />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: `${colors.sidebarlight}`,
            borderRight: 'none'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Link reloadDocument to={"/"}>
        <DrawerHeader sx={{backgroundColor: `${colors.sidebardark}`}}>
          {/* <IconButton> */}
            <HomeRoundedIcon />
          {/* </IconButton> */}
          <Typography>Home</Typography>
        </DrawerHeader>
        </Link>
        <Paper 
          className='new_Dashboard'
          sx={{
            backgroundColor: `${colors.sidebarlight}`,
            borderRadius: '0px',
            boxShadow: 'none',
            padding: '30px 16px 0px 16px'
            }} >
          <Button sx={{backgroundColor: "#1C1C1C", borderRadius: "8px", textTransform: "capitalize", padding: "6px", width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)", marginBottom: "28px"}}>+ New Dashboard</Button>
        </Paper>
        <Paper 
          className='database'
          sx={{
            backgroundColor: `${colors.sidebarlight}`,
            borderRadius: '0px',
            boxShadow: 'none',
            padding: '20px 16px 0px 16px'
          }} >
          
          <Typography variant='button'
            sx={{
              textTransform: 'uppercase',
              color: `${colors.greytext}`,
              fontWeight: '600',
              padding: '16px'
            }}>
            Database
          </Typography>
          <MenuList>
            <Item title={database.name} index={0} to={`workspace/${clickedWorkspace ? clickedWorkspace :  workspaceId}/database/${database.id}`} selected={selected} setSelected={setSelected} />
            {/* {databaselist.map((text, index) => (
              <Item title={text} index={index} to={`/database/${text}`} selected={selected} setSelected={setSelected} />
            ))} */}
          </MenuList>
        </Paper>
        <Paper 
          className='dashboard'
          sx={{
            backgroundColor: `${colors.sidebarlight}`,
            borderRadius: '0px',
            boxShadow: 'none',
            padding: '20px 16px 0px 16px'
          }} >
          <Typography variant='button'
            sx={{
              textTransform: 'uppercase',
              color: `${colors.greytext}`,
              fontWeight: '600',
              padding: '16px'
            }}>
            Dashboards
          </Typography>
          <MenuList>
            {dashboards.map((arr, index) => (
              <Item title={arr.name} index={1+index} to={`workspace/${clickedWorkspace ? clickedWorkspace :  workspaceId}/dashboard/${arr.dashboard}`} selected={selected} setSelected={setSelected} />
            ))}
          </MenuList>
        </Paper>
        <Paper 
          className='chart'
          sx={{
            backgroundColor: `${colors.sidebarlight}`,
            borderRadius: '0px',
            boxShadow: 'none',
            padding: '20px 16px 0px 16px'
          }} >
          <Typography variant='button'
            sx={{
              textTransform: 'uppercase',
              color: `${colors.greytext}`,
              fontWeight: '600',
              padding: '16px'
            }}>
            Charts
          </Typography>
          <MenuList>
            {charts.map((chart, index) => (
              <Item title={chart.title} index={dashboards.length+1+index} to={`workspace/${clickedWorkspace ? clickedWorkspace :  workspaceId}/chart/${chart.chart_id}`} selected={selected} setSelected={setSelected} />
            ))}
          </MenuList>
        </Paper>
        {/* <Divider /> */}
      </Drawer>
      {/* <Main open={open}> */}
        {/* <DrawerHeader /> */}
        {/* {selected === 0 ? (
          <Database selected={selected} />
        ) : (
          (selected <= dashboardlist.length && selected > 0) ? (
            <Dashboard />
          ) : (
            <IndividualChart />
          )
        )} */}
        
      {/* </Main> */}
      <Tour
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        steps={displaysteps}
        accentColor="#5F63F2"
        style={{width: '80vw'}}
        badgeContent={(curr, tot) => `${curr} of ${tot}`}
        isOpen={isTourOpen}
        maskSpace={15}
        rounded={10}
        onRequestClose={() => {
        //handleTourComplete(currentUser)
        setCount(count + 1);
        //localStorage.setItem("count",count+1)
        console.log(count)
        setIsTourOpen(false)
        }}
      />
    </Box>
  );
}