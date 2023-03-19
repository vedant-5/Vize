import React from "react";
import { styled } from '@mui/material/styles';
import { useState} from "react";
import {ColorModeContext, useMode} from './theme';
import {AppBar, CssBaseline, Divider, ThemeProvider} from "@mui/material";
// import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Workbook from "./pages/Workbook";
import Database from "./pages/Database";
import Dashboard from "./pages/Dashboard";
import IndividualChart from "./pages/IndividualChart";
import VoiceAssistant from "./pages/VoiceAssistant";
import Topbar from "./components/Topbar";
// import { AuthProvider } from "./context/AuthContext";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import PrivateRoute from "./utils/PrivateRoute";
// import ProtectedPage from "./pages/ProtectedPage";

function App() {
  const [theme, colorMode] = useMode();
  const [open, setOpen] = useState(true);

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: '-200px',
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
            <div className="app">
              {window.location.pathname === '/' ? (<></>) : (<Sidebar open={open} setOpen={setOpen} />)}
              <Main className='content' open={open}>
              {/* <AppBar position="fixed" open={open} sx={{boxShadow: "none"}} >
                <Topbar open={open} setOpen={setOpen} />
                  <Divider />
              </AppBar> */}
                <Routes>
                  {/* <Route component={Login} path="/login" />
                  <Route component={Register} path="/register" /> */}
                  <Route path="/" element={<Workbook/>}/>
                  <Route exact path="/voice" element={<VoiceAssistant/>}/>
                  <Route path="/dashboard/:id" element={<Dashboard/>}/>
                  <Route path="/database/:text" element={<Database/>}/>
                  <Route path="/chart/:text" element={<IndividualChart/>}/>
                </Routes>
              </Main>
            </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
