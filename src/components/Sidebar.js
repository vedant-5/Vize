import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {useContext, useState} from "react";
import {ColorModeContext, tokens} from "../theme";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Topbar from './Topbar';
import { Menu, MenuItem, MenuList, Paper } from '@mui/material';
import { Link } from 'react-router-dom';


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
              // padding: `${index === selected ? '0px' : '6px 16px'}`,
              // margin: `${index === selected ? '12px 16px' : '0px'}`,
            }}
            selected={index === selected} 
            onClick={() => {setSelected(index);}}>
            <ListItemText sx={{}} >{title}</ListItemText>
          </MenuItem>
        // </Link>
    //   </MenuList>
    // </Paper>
  )
}

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
  const [selected, setSelected] = useState(0);


  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open} sx={{boxShadow: "none"}} >
        {/* <Toolbar> */}
            <Topbar open={open} setOpen={setOpen} />
            <Divider />
        {/* </Toolbar> */}
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
            padding: '0px 16px'
          }} >
          <Typography 
            sx={{
              textTransform: 'uppercase',
              color: `${colors.greytext}`,
              fontWeight: '600',
              padding: '30px 16px 0px 16px'
            }}>
            Database
          </Typography>
          <MenuList>
            {['one', 'two'].map((text, index) => (
              <Item title={text} index={index} to="/" selected={selected} setSelected={setSelected} />
            ))}
          </MenuList>
        </Paper>
        <Paper 
          sx={{
            backgroundColor: `${colors.sidebarlight}`,
            borderRadius: '0px',
            boxShadow: 'none',
            padding: '0px 16px'
          }} >
          <Typography 
            sx={{
              textTransform: 'uppercase',
              color: `${colors.greytext}`,
              fontWeight: '600',
              padding: '20px 16px 0px 16px'
            }}>
            Dashboards
          </Typography>
          <MenuList>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <Item title={text} index={index} to="/" selected={selected} setSelected={setSelected} />
            ))}
          </MenuList>
        </Paper>
        <Paper 
          sx={{
            backgroundColor: `${colors.sidebarlight}`,
            borderRadius: '0px',
            boxShadow: 'none',
            padding: '0px 16px'
          }} >
          <Typography 
            sx={{
              textTransform: 'uppercase',
              color: `${colors.greytext}`,
              fontWeight: '600',
              padding: '20px 16px 0px 16px'
            }}>
            Charts
          </Typography>
          <MenuList>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <Item title={text} index={index} to="/" selected={selected} setSelected={setSelected} />
            ))}
          </MenuList>
        </Paper>
        {/* <Divider /> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
      </Main>
    </Box>
  );
}

// import React from 'react';
// import { useState } from 'react';
// import {Sidebar, Menu, MenuItem} from "react-pro-sidebar";
// // import 'react-pro-sidebar/dist/css/styles.css';
// import {Box, IconButton, Typography, useTheme} from "@mui/material";
// import { Link } from 'react-router-dom';
// import { tokens } from '../theme';

// function Sidebars () {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [open, setOpen] = useState(true);
//   const [selected, setSelected] = useState('Dashboard');

//   return (
//     <Box sx={{
//       "& .pro-sidebar-inner": {
//         background: `${colors.sidebarlight} !important`,
//       },
//       "& .pro-icon-wrapper": {
//         backgroundColor: "transparent !important",
//       },
//       "& .pro-inner-item": {
//         padding: "5px 35px 5px 20px !important",
//       },
//       "& .pro-inner-item:hover": {
//         color: "#868dfb !important",
//       },
//       "& .pro-menu-item.active": {
//         color: "#6870fa !important",
//       }
//     }} >
//       <Sidebar collapsed={open}>
//         <Menu iconShape="square">
//           <MenuItem onClick={() => setOpen(!open)}>Pie charts</MenuItem>
//         </Menu>
//       </Sidebar>
//     </Box>
//   )
// }

// export default Sidebars;