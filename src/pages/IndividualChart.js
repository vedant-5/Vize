import React from "react";
import { useTheme } from '@mui/material/styles';
import styled from "styled-components";
import { Box, Button, ButtonGroup, Divider, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
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
import ChartDisplay from "../components/ChartDisplay";



// ChartJS.register(...registerables);
ChartJS.register(ArcElement, Tooltip, Legend);

function IndividualChart ({chart_id}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const {wid}  = useParams()
    //console.log(wid)
    const {text} = useParams();

    const [chart, setChart] =  useState([])
    const [chartTitle, setChartTitle] = useState('something something title');
    const [chartType, setChartType] = useState('pie');
    const [xLabel, setXLabel] = useState('')
    const [yLabel, setYLabel] = useState('')
    const [summary, setSummary] = useState('')
    const [data,setData] = useState({})
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
    
    //console.log(chart_id)

    const fetchChart = async () => {
        const response = await fetch( 
           chart_id?`http://127.0.0.1:8000/chart/${chart_id}`:`http://127.0.0.1:8000/chart/${text}`
        );
        const data = await response.json();
        setChart(data.response[0]);
        console.log(data)
        //console.log(data.response[0])
        const type = data.response[0].chart_type.split(" ")[0]
        const x_label = data.response[0].x_axis
        const y_label = data.response[0].y_axis
        const summary_data =  data.response[0].summary ? data.response[0].summary : null
        setSummary(summary_data)
        setXLabel(x_label)
        setYLabel(y_label)
        setChartType(type)
      };

      const fetchWorkspace= async () => {
        const response = await fetch( 
          `http://127.0.0.1:8000/workspace/${wid}`
        );
        const data = await response.json();
        //console.log(data.response)
        const database_id = data.response[0].database
        //setChartData(data)
        fetchData(database_id)
        return data
      };

      const fetchData = async (id) => {
        const response = await fetch( 
          `http://127.0.0.1:8000/view-file/${id}`
        );
        const data = await response.json();
        
        //console.log(xLabel,yLabel)
        const x =  xLabel ? xLabel : 'name'
        const y = yLabel ? yLabel : 'maths'
        setData({
            "x_values" : data.map((data) => data[x]),
            "y_values" : data.map((data) => data[y])
        })
        //console.log(data.map((data) => data[y]),data.map((data) => data[x]))
        //store x array and y array values in a seperate variable and write it in labels and data.
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

    const generateSummary = async ()=>{
        const data_columns = {
            x_values: data.x_values,
            y_values : data.y_values,
            chart_id: chart_id ?  chart_id : text
          }
          console.log(data_columns)
    
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_columns),
        };
        fetch(`http://127.0.0.1:8000/chart-summary/${chart_id ? chart_id : text}/`, requestOptions)
            .then(function (response) {
              // ...
              console.log(response);
              return response.json();
            }).then(function (body) {
              // ...
              console.log(body);
              window.location.reload()
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchChart();
        //fetchWorkspace()
    }, [text]);

    useEffect(() => {
        fetchWorkspace();
        //fetchWorkspace()
        console.log(xLabel,yLabel)
    }, [xLabel, yLabel]);
      
    return(
        <Box sx={{display: "flex", width: "100%"}}>
            <Grid container spacing={4} xs={10} sx={{display: "flex", flexDirection: "column", maxWidth: "calc(100% - 220px)", paddingRight: "30px"}} >
                {/* <Chart
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
                /> */}
                <Grid item>
                    <Chart
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
                    />
                    {/* <ChartDisplay chart_id={1} /> */}
                </Grid>
                <Grid item>
                    <Accordion defaultExpanded={true} sx={{boxShadow: "none", borderRadius: "20px !important"}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        sx={{padding: "0px 20px"}}
                        >
                        <Typography sx={{fontSize: "16px", fontWeight: "600"}}>Summary for the chart</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{padding: "20px", borderTop: "1px solid rgb(0,0,0,0.1)"}}>
                        <Typography sx={{fontSize: "16px"}}>
                            {summary}
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{height: "100vh", margin: "-94px 0"}}/> 
            <Grid xs={2} sx={{padding: "0 20px", width: "220px"}}>
                <Button onClick={generateSummary} sx={{backgroundColor: "#1C1C1C", borderRadius: "8px", textTransform: "capitalize", padding: "6px", width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)"}}>
                    + Generate Summary
                </Button>
                <Box backgroundColor="#FFFFFF" marginTop="40px" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.4)" borderRadius="8px">
                    <Button sx={{backgroundColor: "#1C1C1C", borderRadius: "8px", textTransform: "capitalize", padding: "6px", width: "100%"}}>Customize Chart</Button>
                    <ButtonGroup orientation="vertical" aria-label="vertical outlined button group" sx={{margin: "10px 0"}}>
                        <WhiteButtons>Add title</WhiteButtons>
                        <WhiteButtons>Change color palette</WhiteButtons>
                        <WhiteButtons>Change x label</WhiteButtons>
                        <WhiteButtons>Change y label</WhiteButtons>
                        <WhiteButtons>Add legend</WhiteButtons>
                    </ButtonGroup>
                </Box>
            </Grid>
        </Box>
    )
}

export default IndividualChart;

const WhiteButtons =  styled.button`
    background-color: white;
    color: #1c1c1c !important;
    text-transform: initial !important;
    border: none !important;
    font-size: 14px;
    text-align: left !important;
    padding: 9px 20px;
`