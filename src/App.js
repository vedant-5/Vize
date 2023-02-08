import React from "react";
import {ColorModeContext, useMode} from './theme';
import {CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Router } from "react-router-dom";
import Workbook from "./pages/Workbook";
import Database from "./pages/Database";
import Dashboard from "./pages/Dashboard";
import Chart from "./pages/Chart";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar /> */}
          {/* <main className='content'> */}
          <Routes>
              <Route exact path="/dashboard" element={<Sidebar/>}/>
              <Route path="/dashboard/:text" element={<Dashboard/>}/>
              <Route path="/database/:text" element={<Database/>}/>
              <Route path="/chart/:text" element={<Chart/>}/>
              <Route path="/workbook" element={<Workbook/>}/>
            </Routes>
          {/* </main> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
