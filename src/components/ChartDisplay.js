import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Divider, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ColorModeContext, tokens } from "../theme";
import { useState, useContext, useEffect } from "react";
import { ArcElement, Tooltip, Legend } from 'chart.js';
import {Chart as ChartJS} from 'chart.js/auto';
import { Chart } from "react-chartjs-2";
// import { Chart as ChartJS, registerables } from 'chart.js';
// import { Chart } from 'react-chartjs-2'
import { mockDataTeam } from "../data/mockData";
import { useParams } from "react-router-dom";



// ChartJS.register(...registerables);
ChartJS.register(ArcElement, Tooltip, Legend);

function ChartDisplay ({chart_id}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const {wid}  = useParams()
    const {text} = useParams();

    const [chart, setChart] =  useState([])
    const [chartTitle, setChartTitle] = useState('something something title');
    const [chartType, setChartType] = useState('pie');
    const [xLabel, setXLabel] = useState('')
    const [yLabel, setYLabel] = useState('')
    const [chartData, setChartData] = useState({
        labels: mockDataTeam.map((data) => data.name), 
        datasets: [
            {
                label: "User Age",
                data: mockDataTeam.map((data) => data.age),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                // borderColor: "black",
                // borderWidth: 2
            },
        ]
    });
    //const [chartData, setChartData] = useState({});

    
    //console.log(chart_id)
    


    const fetchChart = async () => {
        console.log(chart_id)
        const response = await fetch( 
           chart_id?`http://127.0.0.1:8000/chart/${chart_id}`:`http://127.0.0.1:8000/chart/${text}`
        );
        const data = await response.json();
        setChart(data.response[0]);
        const type = data.response[0].chart_type.split(" ")[0]
        const x_label = data.response[0].x_axis
        const y_label = data.response[0].y_axis
        fetchWorkspace(x_label,y_label)
        setXLabel(x_label)
        setYLabel(y_label)
        setChartType(type)
      };

      const fetchWorkspace= async (x_label, y_label) => {
        const response = await fetch( 
          `http://127.0.0.1:8000/workspace/${wid}`
        );
        const data = await response.json();
        //console.log(data.response)
        const database_id = data.response[0].database
        //setChartData(data)
        fetchData(database_id, x_label, y_label)
        return data
      };

      const fetchData = async (id, x_label, y_label) => {
        const response = await fetch( 
          `http://127.0.0.1:8000/view-file/${id}`
        );
        const data = await response.json();
        //console.log(xLabel, yLabel)
        // const x =  xLabel ? xLabel : 'name'
        // const y = yLabel ? yLabel : 'maths'
        const x =  x_label
        const y = y_label 

        console.log(data, x_label,y_label)
        
        //console.log(data,xLabel, yLabel)
        setChartData(
            {
                labels: data.map((data) => data[x]), // x-axis
                datasets: [
                    {
                        label: y,
                        data: data.map((data) => data[y]), // y-axis
                        backgroundColor: [
                            "rgba(75,192,192,1)",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0",
                        ],
                        // borderColor: "black",
                        // borderWidth: 2
                    },
                ]
            }
        )
        //setChartData(data)
        return data
      };
      
      useEffect(() => {
        fetchChart();
        //fetchWorkspace()
      }, [chart_id]);

    //   useEffect(() => {
    //     fetchWorkspace();
    //     //fetchWorkspace()
    //   }, [xLabel, yLabel]);

    return(
        <Box width="100%" padding="30px" backgroundColor="#FEFEFE" borderRadius="20px" >

            {/* <Grid container spacing={1} xs={10} sx={{display: "flex", flexDirection: "column"}} > */}
                {chartData ? <Chart
                    type={chartType}
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: chart?.title
                            },
                        },
                        maintainAspectRatio: false,
                    }}
                    // {...props}
                /> :  <p>Loading</p>}
                
                {/* <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    >
                    <Typography>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{height: "100vh", margin: "-94px 0"}}/> 
            <Grid xs={2} sx={{padding: "0 20px", width: "220px"}}>
                <Button sx={{backgroundColor: "#1C1C1C", borderRadius: "8px", textTransform: "capitalize", padding: "6px", width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)"}}>+ Add Chart</Button>
                <Button sx={{backgroundColor: "#1C1C1C", borderRadius: "8px", textTransform: "capitalize", padding: "6px", width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)", marginTop: "40px"}}>+ Add Text</Button>
                <Box> */}
                {/* <List
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
                    </List> */}
                {/* </Box>
            </Grid> */}
        </Box>
    )
}

export default ChartDisplay;