import React from "react";
import {useContext, useState} from "react";
import { useLocation } from "react-router-dom";
import {Box, IconButton, useTheme, Breadcrumbs, Link} from "@mui/material";
import {ColorModeContext, tokens} from "../theme";
// import {InputBase} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import MicIcon from '@mui/icons-material/Mic';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function Topbar({open, setOpen}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const location = useLocation()
    const path_split = location.pathname.split("/")
    const first = capitalizeFirstLetter(path_split[1])
    const second = path_split[2].split("%20").join(" ")


    // const [fullScreen, setFullScreen] = useState(false);

    return(
        <Box display="flex" justifyContent="space-between" p={2} height="64px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <IconButton onClick={() => {setOpen(!open)}}>
                        {open ? (
                            <OpenInFullRoundedIcon />
                        ) : (
                            <CloseFullscreenRoundedIcon />
                        )}
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        MUI
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        {first}
                    </Link>
                    <Link
                        underline="hover"
                        color={colors.text}
                        href="/material-ui/react-breadcrumbs/"
                        aria-current="page"
                        >
                        {second}
                    </Link>
                </Breadcrumbs>
            </Box>
            <Box display="flex">
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
                <IconButton>
                    <MicIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar;