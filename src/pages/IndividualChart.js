import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Box } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import { useState, useContext } from "react";
// import {  ArcElement, Tooltip, Legend } from 'chart.js';
// import {Chart as ChartJS} from 'chart.js/auto';
// import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'

  
import { mockDataTeam } from "../data/mockData";


ChartJS.register(...registerables);
// ChartJS.register(ArcElement, Tooltip, Legend);

function IndividualChart ({type}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    console.log({type});

    const [chartTitle, setChartTitle] = useState('something something title');
    // const [chartType, setChartType] = useState('pie');
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
            }
        ]
    });
      
    return(
        <Box width="100%" padding="30px" backgroundColor={colors.chartbg} borderRadius="20px" >
            <Chart
                type={type}
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: {chartTitle}
                        }
                    },
                    maintainAspectRatio: false,
                }}
                // {...props}
            />
        </Box>
    )
}

export default IndividualChart;