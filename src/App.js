import React from "react";
import {ColorModeContext, useMode} from './theme';
import {CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />        
        <div className="app">
          <Sidebar />
          {/* <main className='content'> */}
            {/* <Topbar /> */}
            <Routes>
              {/* <Route path="" element={<Topbar />} /> */}
            </Routes>
          {/* </main> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
