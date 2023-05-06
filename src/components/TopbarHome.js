/* eslint-disable no-unused-vars */

import React from "react";
import {useContext, useState} from "react";
import {Box, IconButton, useTheme, Breadcrumbs, Link} from "@mui/material";
import {ColorModeContext, tokens} from "../theme";
// import {InputBase} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import MicIcon from '@mui/icons-material/Mic';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import { deepOrange, deepPurple } from '@mui/material/colors';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import TopbarIcons from "./TopbarIcons";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

function TopbarHome() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    // const [fullScreen, setFullScreen] = useState(false);

    // const handleMicrophone = () => {
    //     setMicrophone(!microphone);
    //     if(microphone) {
    //       SpeechRecognition.startListening({ continuous: true });

    //       console.log(listening, transcript)
    //     }
    //     else {
    //       SpeechRecognition.abortListening();
    //       console.log(listening);
    //       resetTranscript();
    //     }
    //   }

    return(
        <>
            <Box width="100vw">
            <Box display="flex" justifyContent="space-between" alignContent={"center"} pt={"25px"} pb={"25px"} height="64px" >
                <Box display="flex" justifyContent="space-between" ml={"60px"} alignItems="center">
                    <p style={{fontWeight:"bold", fontFamily:"Inter"}}>Hello, Palka Dhirawani</p>
                </Box>
                {/* <Box display="flex" mr={"36px"}>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'light' ? (
                            <LightModeIcon />
                        ) : (
                            <DarkModeIcon />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton >
                        <MicIcon />
                    </IconButton>
                    <IconButton>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            >
                            <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24}}></Avatar>
                        </StyledBadge>
                    </IconButton> */}
                    <Box display="flex" mr={"36px"}>
                        <TopbarIcons />
                    </Box>
                    
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                {/* </Box> */}
            </Box>
            </Box>
        </>
    )
}

export default TopbarHome;