/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */


import React from "react";
import {useContext, useState, useEffect} from "react";
import {Box, IconButton, useTheme, Alert} from "@mui/material";
import {ColorModeContext, tokens} from "../theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';


function TopbarIcons({clickedWorkspace}) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    
    // const {wid}  = useParams();
    // console.log(wid)
    const navigate = useNavigate()

    const {speak} = useSpeechSynthesis();
    const [value, setValue] = useState('');
    const [microphone, setMicrophone] = useState(true);
    const [chartType, setChartType] = useState('');
    const [cols, setCols] = useState([]);
    const [title, setTitle] = useState('');
    const [isChartOpen, setIsChartOpen] = useState(false);
    const [chartName, setChartName] =  useState('')
    const [chartID, setChartID] =  useState('')
    const [editChart, setEditChart] = useState({})
    const [chartList, setChartList] = useState([])
    const [dashboardName, setDashboardName] =  useState('')
    const [workspaceID, setWorkspaceID] = useState('')
    const [dashboardID, setDashboardID] = useState('')
    const [workspaceData, setWorkspaceData] = useState({})
    const [dashboardData, setDashboardData] =  useState({})
    const [getDatabase, setGetDatabase] = useState(false)
    const [xLabel, setXLabel] = useState('')
    const [yLabel, setYLabel] = useState('')
    const [xAxis, setXAxis] = useState('')
    const [yAxis, setYAxis] = useState('')

    const handleMicrophone = () => {
        setMicrophone(!microphone);
        if(microphone) {
          SpeechRecognition.startListening({ continuous: true });

          console.log(listening, transcript)
        }
        else {
          SpeechRecognition.abortListening();
          console.log(listening);
          resetTranscript();
        }
    }

    const getChartList = async () => {
        const response = await fetch( 
          `http://127.0.0.1:8000/chart`
        );
        const data = await response.json();
        //console.log(data.response)
        setChartList(data.response)
        return data.response
    };
    
    const createChart = async () => {
        if(clickedWorkspace) {
          console.log(clickedWorkspace, dashboardID)
        const data = {
          "title": cols[0] + " and " + cols[1],
          "x_axis": cols[0],
          "y_axis": cols[1],
          "chart_type": chartType,
          "options": "Legend, title, color",
          "summary": null,
          "workspace_name": clickedWorkspace,
          "dashboard_name": dashboardID,
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      };
      fetch('http://127.0.0.1:8000/chart/', requestOptions)
          .then(function (response) {
            // ...
            return response.json();
          }).then(function (body) {
            // ...
            const dashboard_data =  {...dashboardData, "charts":dashboardData.charts + `,${body.chart_id}`}
            const workspace_data = {...workspaceData, "charts":workspaceData.charts + `,${body.chart_id}`}
            updateDashboard(dashboard_data)
            updateWorkspace(workspace_data)
            console.log(body);
          }).catch(err => {
              console.log(err)
          })
        }
        else {
          console.log("not happening")
        }
        
    }

    const createDashboard = async (name) => {
        if(clickedWorkspace) {
          console.log(clickedWorkspace)
        const data = {
          "name" : name,
          "charts" : null,
          "text": null,
          "created_by" : "1",
          "workspace_name" :  parseInt(clickedWorkspace),
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      };
      fetch('http://127.0.0.1:8000/dashboard/', requestOptions)
          .then(function (response) {
            // ...
            return response.json();
          }).then(function (body) {
            // ...
            const workspace_data = {...workspaceData, "charts":workspaceData.charts + `,${body.dashboard}`}
            updateWorkspace(workspace_data)
            console.log(body);
            window.location.reload()
            navigate(`/workspace/${clickedWorkspace}/database/${body.dashboard}`)
            
          }).catch(err => {
              console.log(err)
          })
        }
        else {
          console.log("not happening")
        }
    }
    
    const updateDashboard =  async (dashboard_data) => {
        console.log(dashboard_data)
        const data = dashboard_data
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dashboard_data),
      };
      fetch(`http://127.0.0.1:8000/dashboard/${dashboardID}/`, requestOptions)
          .then(function (response) {
            // ...
            console.log(response);
            return response.json();
          }).then(function (body) {
            // ...
            console.log(body);
          }).catch(err => {
              console.log(err)
          })
    }

    const updateWorkspace =  async (data) => {
        console.log(data)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      };
      fetch(`http://127.0.0.1:8000/workspace/${clickedWorkspace}/`, requestOptions)
          .then(function (response) {
            // ...
            console.log(response);
            return response.json();
          }).then(function (body) {
            // ...
            console.log(body);
          }).catch(err => {
              console.log(err)
          })
    }
    
    const getDashboardList = async () => {
        const response = await fetch( 
          `http://127.0.0.1:8000/dashboard`
        );
        const data = await response.json();
        //console.log(data.response)
        //console.log(data.response.filter((dashboard) => dashboard.name.toLowerCase() === dashboardName.toLowerCase())[0].dashboard)
        const id = data.response.filter((dashboard) => dashboard.name.toLowerCase() === dashboardName.toLowerCase())[0].dashboard
        setDashboardID(id)
        console.log(data.response,id)
        getDashboard(id)
        return data.response
    }

    const getDashboard = async (id) => {
        //console.log(id)
        const response = await fetch( 
          `http://127.0.0.1:8000/dashboard/${id}/`
        );
        const data = await response.json()
        setDashboardData(data.response[0])
        const workspace_id = data.response[0].workspace_name.workspace
        const workspace_data =  data.response[0].workspace_name
        setWorkspaceData(workspace_data)
        setWorkspaceID(workspace_id)
        //console.log(workspace_data, data.response[0])
        return data.response
    }
      
    const editChartPost = async () => {
        const data = editChart
        console.log(editChart)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      };
      fetch(`http://127.0.0.1:8000/chart/${chartID}/`, requestOptions)
          .then(function (response) {
            // ...
            console.log(response);
            return response.json();
          }).then(function (body) {
            // ...
            console.log(body);
          }).catch(err => {
              console.log(err)
          })
    }

    const fetchWorkspace= async () => {
      const response = await fetch( 
        `http://127.0.0.1:8000/workspace/${workspaceID}`
      );
      const data = await response.json();
      console.log(data.response)
      const database_id = data.response[0].database
      //setChartData(data)
      fetchData(database_id)
      return data
    };

    const fetchData =  async (id)=> {
      const response = await fetch( 
        `http://127.0.0.1:8000/view-file/${id}`
      );
      const data = await response.json();
      //console.log(data)
      const x_values  = data.map((data) => data[xAxis])
      const y_values  = data.map((data) => data[yAxis])
      createSummary(x_values,y_values)
    };

    const createSummary =  async(x_values,y_values) => {
      const data = {
        x_values: x_values,
        y_values : y_values,
        chart_id: chartID
      }
      console.log(data)

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    fetch(`http://127.0.0.1:8000/chart-summary/${chartID}/`, requestOptions)
        .then(function (response) {
          // ...
          console.log(response);
          return response.json();
        }).then(function (body) {
          // ...
          console.log(body);
        }).catch(err => {
            console.log(err)
        })
    };
    
    
    const commands = [
        {
          command: 'create * chart',
          callback: (chart) => {
            setChartType(chart); 
            setValue(`Select which dashboard you want to add the chart to`)
            // setValue(`Select variables for the ${chart} chart`);
            console.log(chartType, value);
          } //create handle function and call it here to make charts
        },
        {
          command: 'create dashboard *',
          callback: (dashboard) => {
            //setChartType(chart); 
            createDashboard(dashboard)
            setValue(`Dashboard ${dashboard} being created`)
            // setValue(`Select variables for the ${chart} chart`);
            //console.log(chartType, value);
          } //create handle function and call it here to make charts
        },
        {
          command: 'select dashboard *',
          callback: (dashboard) => {
            setDashboardName(dashboard); 
            //setValue(`Specify which dashboard you want to add the chart to`)
            setValue(`Select variables for the ${chartType} chart`);
            //console.log(chartType, value);
          } //create handle function and call it here to make charts
        },
        {
          command: 'dashboard *',
          callback: (dashboard) => {
            setDashboardName(dashboard); 
            //setValue(`Specify which dashboard you want to add the chart to`)
            setValue(`Select variables for the ${chartType} chart`);
            //console.log(chartType, value);
          } //create handle function and call it here to make charts
        },
        // {
        //   command: 'The weather is :condition today',
        //   callback: (condition) => setValue(`Today, the weather is ${condition}`)
        // },
        {
          command: '* and *',
          callback: (col1, col2) => {

            setCols([col1.toLowerCase(), col2.toLowerCase()])
            // setEditChart(...cols,{"x_axis":col1, "y_axis":col2, "chart_type":chartType});
            if(chartType !== '') {
              setValue(`Creating ${chartType} chart with columns ${col1} and ${col2}`);
              setIsChartOpen(true);
              window.location.reload()
              //console.log(editChart)
              // call api to create chart (get chart id)
              // redirect to individual chart screen (using chart id)
              // maybe give alert about edit options
            }
            else {
              setValue('Please specify which chart you want to create');
            }
          }
        },
        {
          command: 'select variables * and *',
          callback: (col1, col2) => {

            setCols([col1.toLowerCase(), col2.toLowerCase()])
            // setEditChart(...cols,{"x_axis":col1, "y_axis":col2, "chart_type":chartType});
            if(chartType !== '') {
              setValue(`Creating ${chartType} chart with columns ${col1} and ${col2}`);
              setIsChartOpen(true);
              window.location.reload()
              //console.log(editChart)
              // call api to create chart (get chart id)
              // redirect to individual chart screen (using chart id)
              // maybe give alert about edit options
            }
            else {
              setValue('Please specify which chart you want to create');
            }
          }
        },
        {
          command: 'Select Chart *',
          callback: (chart_name) => {
            setChartName(chart_name)
            const chart_list =  chartList
            const chart_id = chart_list?.filter((chart) => chart.title.toLowerCase() === chart_name)[0].chart_id
            const x_axis = chart_list?.filter((chart) => chart.title.toLowerCase() === chart_name)[0].x_axis
            const y_axis = chart_list?.filter((chart) => chart.title.toLowerCase() === chart_name)[0].y_axis
            const workspace_id =  chart_list?.filter((chart) => chart.title.toLowerCase() === chart_name)[0].workspace_name
            setChartID(chart_id)
            setWorkspaceID(workspace_id)
            setEditChart(chart_list?.filter((chart) => chart.title.toLowerCase() === chart_name)[0])
            setXAxis(x_axis)
            setYAxis(y_axis)
            setIsChartOpen(true)
            setValue(`Chart ${chart_name} selected`)
          }
        },
        {
          command: 'Add Summary',
          callback: () => {
            setGetDatabase(true)
            // setEditChart({...editChart,"y_axis":yLabel})
            // setYLabel(yLabel);
            if(isChartOpen) {
              setValue(`Generating Summary for ${chartName}`);
              //window.location.reload()
              
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Generate Summary',
          callback: () => {
            setGetDatabase(true)
            // setEditChart({...editChart,"y_axis":yLabel})
            // setYLabel(yLabel);
            if(isChartOpen) {
              setValue(`Generating Summary for ${chartName}`);
              //window.location.reload()
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Add title *',
          callback: (title) => {
            setEditChart({...editChart,"title":title})
            setTitle(title);
            if(isChartOpen) {
              setValue(`Title ${title} added`);
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change title to *',
          callback: (title) => {
            setEditChart({...editChart,"title":title})
            setTitle(title);
            if(isChartOpen) {
              setValue(`Title changed to ${title}`);
              window.location.reload()
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change x label to *',
          callback: (xLabel) => {
            setEditChart({...editChart,"x_axis":xLabel})
            setXLabel(xLabel);
            if(isChartOpen) {
              setValue(`X label changed to ${xLabel}`);
              window.location.reload()
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change x level to *',
          callback: (xLabel) => {
            setEditChart({...editChart,"x_axis":xLabel})
            setXLabel(xLabel);
            if(isChartOpen) {
              setValue(`X label changed to ${xLabel}`);
              window.location.reload()
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change x label 2 *',
          callback: (xLabel) => {
            setEditChart({...editChart,"x_axis":xLabel})
            setXLabel(xLabel);
            if(isChartOpen) {
              setValue(`X label changed to ${xLabel}`);
              window.location.reload()
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change x level 2 *',
          callback: (xLabel) => {
            setEditChart({...editChart,"x_axis":xLabel})
            setXLabel(xLabel);
            if(isChartOpen) {
              setValue(`X label changed to ${xLabel}`);
              window.location.reload()
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change acceleable 2 *',
          callback: (xLabel) => {
            setEditChart({...editChart,"x_axis":xLabel})
            setXLabel(xLabel);
            if(isChartOpen) {
              setValue(`X label changed to ${xLabel}`);
              window.location.reload()
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change acceleable to *',
          callback: (xLabel) => {
            setEditChart({...editChart,"x_axis":xLabel})
            setXLabel(xLabel);
            if(isChartOpen) {
              setValue(`X label changed to ${xLabel}`);
              //window.location.reload()
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change y label to *',
          callback: (y_Label) => {
            setEditChart({...editChart,"y_axis":y_Label})
            setYLabel(y_Label);
            if(isChartOpen) {
              setValue(`Y label changed to ${y_Label}`);
              //window.location.reload()
              
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change y level to *',
          callback: (yLabel) => {
            setEditChart({...editChart,"y_axis":yLabel})
            setYLabel(yLabel);
            if(isChartOpen) {
              setValue(`Y label changed to ${yLabel}`);
              window.location.reload()
              
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change y label 2 *',
          callback: (yLabel) => {
            setEditChart({...editChart,"y_axis":yLabel})
            setYLabel(yLabel);
            if(isChartOpen) {
              setValue(`Y label changed to ${yLabel}`);
              window.location.reload()
              
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change y level 2 *',
          callback: (yLabel) => {
            setEditChart({...editChart,"y_axis":yLabel})
            setYLabel(yLabel);
            if(isChartOpen) {
              setValue(`Y label changed to ${yLabel}`);
              window.location.reload()
              
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Add legend',
          callback: () => {
            if(isChartOpen) {
              setValue(`Legend added`);
              window.location.reload()
              // call api to add legend
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Delete the chart',
          callback: () => {
            if(isChartOpen) {
              setValue(`Chart is deleted`);
              window.location.reload()
              // call api to delete chart
              // redirect to dashboard page
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'clear',
          callback: ({ resetTranscript }) => {
            setValue("Give commands to visualize with Vize!")
            resetTranscript();
            
          }
        }
    ];

    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition({commands});
    
    //   console.log(listening, transcript)

        useEffect(() => {
          getChartList()
          console.log(chartName)
        }, [chartName])

        useEffect(() => {
          // if(value === 'Welcome to Wise. How may I help you?') {
            speak({text: 'Welcome to Wise. How may I help you?'});
          // }
          // setValue('Welcome to Wise. How may I help you?');
        }, []);
      
        useEffect(() => {
          speak({text: value})
          console.log(value)
        }, [value])

        useEffect(()=>{
          getDashboardList()
          console.log("happening")
        },[dashboardName])
        
        useEffect(() => {
          createChart()
          //window.location.reload()
          //updateDashboard()
          //updateWorkspace()
        }, [cols])
      
        useEffect(() => {
          fetchWorkspace()
          console.log(workspaceID,chartID)
        }, [getDatabase])

        useEffect(() => {
          editChartPost()
          console.log(editChart)
        }, [editChart])
        
        if (!browserSupportsSpeechRecognition) {
          return <span>Browser doesn't support speech recognition.</span>;
        }


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


    return(
        <Box display="flex">
            {listening ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            {transcript}
                         </Alert>: <p></p>}
            <Box display="flex">
                <IconButton onClick={handleMicrophone} sx={{marginTop: "3px", padding: "8px 12px", position: "relative"}}>
                    {microphone ? (<MicIcon />) : 
                                  (<><div style={{width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#B1CF51", position: "absolute", top: "-7px", zIndex: "-1"}}></div> 
                                  <MicIcon sx={{color: "white"}}/> </>)}
                </IconButton>
                <IconButton onClick={colorMode.toggleColorMode} sx={{padding: "8px 12px"}}>
                    {theme.palette.mode === 'light' ? (
                        <LightModeIcon />
                    ) : (
                        <DarkModeIcon />
                    )}
                </IconButton>
                <IconButton sx={{padding: "8px 12px"}}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        >
                        <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24}}></Avatar>
                        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                    </StyledBadge>
                </IconButton>
            </Box>
        </Box>
    )
}

export default TopbarIcons;