import { Box, Button, Divider, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import React, { useState, useEffect } from "react";
import IndividualChart from "./IndividualChart";
import { useParams } from "react-router-dom";
import ChartDisplay from "../components/ChartDisplay";
import Grid from "@mui/material/Unstable_Grid2";

function Dashboard () {
    
    // const chartType = ['pie', 'bar', 'line', 'scatter'];
    const [dashboard, setDashboard] =  useState([])
    const [chartlist, setChartlist] = useState([])

    const { did } = useParams();


    useEffect(() => {
        fetchDashboards();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [did]);

    const fetchDashboards = async () => {
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/${did}`
        );
        const data = await response.json();
        setDashboard(data.response[0]);
        setChartlist(data.response[0].charts.split(","))
        console.log(data.response[0].charts.split(","))
      };
    
    
    // const Item = styled(Paper)(({ theme }) => ({
    //     // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     // ...theme.typography.body2,
    //     // padding: '10px',
    //     textAlign: 'center',
    //     boxShadow: 'none',
    //     // color: theme.palette.text.secondary,
    // }));


    const commandList = ["commnd one", "commdn two", "iuytfgh", "pwppwuerke", "heleleoeodnniuytrfgghghhjhgdjkd"];

    return(
        <Box sx={{display:"flex", marginRight: "-30px"}}>
          <Grid container spacing={1} xs={10} sx={{display: "flex", flexDirection: "column"}} >
            <h3>{dashboard.name}</h3>
            {/* <p>{dashboard.text}</p> */}
            <Grid container spacing={2}>
              {chartlist.map((chart, index)=>(
                <Grid item key={index}>
                  <ChartDisplay chart_id = {chart}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{height: "100vh", margin: "-94px 0"}}/> 
          <Grid xs={2} sx={{padding: "0 20px", width: "220px"}}>
            <Button sx={{backgroundColor: "#1C1C1C", borderRadius: "8px", textTransform: "capitalize", padding: "6px", width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)"}}>+ Add Chart</Button>
            <Button sx={{backgroundColor: "#1C1C1C", borderRadius: "8px", textTransform: "capitalize", padding: "6px", width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)", marginTop: "40px"}}>+ Add Text</Button>
            <Box>
              <List
                sx={{
                  width: '100%',
                  padding: '16px 0',
                  marginTop: '40px',
                  border: '0.8px solid #A8C5DA',
                  borderRadius: '10px',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
                }}
              >
                <ListSubheader sx={{textTransform: "uppercase", lineHeight: "160%", fontWeight: "600", fontSize: "0.85rem", color: "rgba(0,0,0,0.3)", marginBottom: "8px"}}>Voice Commands</ListSubheader>
                  {commandList.map((item, index) => (
                    <ListItem key={index} sx={{padding: "5px 16px"}}>
                      <span style={{fontSize: "0.9rem", wordWrap: "break-word", overflow: "hidden"}}>{item}</span>
                    </ListItem>
                  ))}
                </List>
            </Box>
          </Grid>
        </Box>
    )
}

export default Dashboard;