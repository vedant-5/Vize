import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {useContext, useState} from "react";
import {ColorModeContext, tokens} from "../theme";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Topbar from './Topbar';
import { MenuItem, MenuList, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Database from '../pages/Database';
import Dashboard from '../pages/Dashboard';
import IndividualChart from '../pages/IndividualChart';

const Item = ({title, index, to, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // <Paper open="true">
    //   <MenuList>
        // <Link to={to}>
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
            <Typography variant='body2'>{title}</Typography>
          </MenuItem>
        // </Link>
    //   </MenuList>
    // </Paper>
  )
}

const databaselist = ['one'];
const dashboardlist = ['Inbox', 'Starred', 'Send email', 'Drafts'];
const chartlist = ['Inbox', 'Hello', 'Send email'];

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

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

export default function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(1);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const chartType=['pie', 'bar', 'line', 'scatter'];


  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{boxShadow: "none"}} >
        <Topbar open={open} setOpen={setOpen} />
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
        <DrawerHeader sx={{backgroundColor: `${colors.sidebardark}`}}>
          {/* <IconButton> */}
            <HomeRoundedIcon />
          {/* </IconButton> */}
          <Typography>Home</Typography>
        </DrawerHeader>
        <Paper 
          sx={{
            backgroundColor: `${colors.sidebarlight}`,
            borderRadius: '0px',
            boxShadow: 'none',
            padding: '30px 16px 0px 16px'
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
            {databaselist.map((text, index) => (
              <Item title={text} index={index} to={`/database/${text}`} selected={selected} setSelected={setSelected} />
            ))}
          </MenuList>
        </Paper>
        <Paper 
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
            {dashboardlist.map((text, index) => (
              <Item title={text} index={databaselist.length + index} to={`/dashboard/${text}`} selected={selected} setSelected={setSelected} />
            ))}
          </MenuList>
        </Paper>
        <Paper 
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
            {chartlist.map((text, index) => (
              <Item title={text} index={databaselist.length + chartlist.length + 1 + index} to={`/chart/${text}`} selected={selected} setSelected={setSelected} />
            ))}
          </MenuList>
        </Paper>
        {/* <Divider /> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {selected === 0 ? (
          <Database selected={selected} />
        ) : (
          // (selected <= dashboardlist.length && selected > 0) ? (
            <Dashboard chartType={chartType} />
          // ) : (
          //   <IndividualChart chartType={chartType} />
          // )
        )}
        
      </Main>
    </Box>
  );
}