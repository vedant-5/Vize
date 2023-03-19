import React from "react";
import {useContext, useState, useEffect} from "react";
// import { useLocation } from "react-router-dom";
import {Box, IconButton, useTheme, Link, Alert} from "@mui/material";
import {ColorModeContext, tokens} from "../theme";
// import {InputBase} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import MicIcon from '@mui/icons-material/Mic';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
// import VoiceAssistant from "../pages/VoiceAssistant";
import CheckIcon from '@mui/icons-material/Check';
// import Button from '@mui/material/Button';


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function Topbar({open, setOpen}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const {speak} = useSpeechSynthesis();
    const [value, setValue] = useState('');
    const [microphone, setMicrophone] = useState(true);
    const [chartType, setChartType] = useState('');
    const [cols, setCols] = useState([]);
    const [title, setTitle] = useState('');
    const [isChartOpen, setIsChartOpen] = useState(false);
    const [chartName, setChartName] =  useState('')
    const [xLabel, setXLabel] = useState('');
    const [yLabel, setYLabel] = useState('');
    const [chartID, setChartID] =  useState('')
    const [editChart, setEditChart] = useState({})
    const [chartList, setChartList] = useState([])

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
        console.log(data.response)
        setChartList(data.response)
        return data.response
      };
    
      const createChart = async () => {
        const data = {
          "title": cols[0] + " vs " + cols[1],
          "x_axis": cols[0],
          "y_axis": cols[1],
          "chart_type": chartType,
          "options": "Legend, title, color",
          "summary": null,
          "workspace_name": 3,
          "dashboard_name": 6,
      }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      };
      fetch('http://127.0.0.1:8000/chart/', requestOptions)
          .then(function (response) {
            // ...
            console.log(response);
            setChartID(response.chart_id)
            return response.json();
          }).then(function (body) {
            // ...
            console.log(body);
          }).catch(err => {
              console.log(err)
          })
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
    
    
    
    const commands = [
        {
          command: 'create * chart',
          callback: (chart) => {
            setChartType(chart); 
            setValue(`Select variables for the ${chart} chart`);
            console.log(chartType, value);
          } //create handle function and call it here to make charts
        },
        // {
        //   command: 'The weather is :condition today',
        //   callback: (condition) => setValue(`Today, the weather is ${condition}`)
        // },
        {
          command: '* and *',
          callback: (col1, col2) => {
            setCols([col1, col2])
            // setEditChart(...cols,{"x_axis":col1, "y_axis":col2, "chart_type":chartType});
            if(chartType !== '') {
              setValue(`Creating ${chartType} chart with columns ${col1} and ${col2}`);
              setIsChartOpen(true);
              console.log(editChart)
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
            setChartID(chart_id)
            setEditChart(chart_list?.filter((chart) => chart.title.toLowerCase() === chart_name)[0])
            setIsChartOpen(true)
            setValue(`Chart ${chart_name} selected`)
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
            }
            else {
              setValue('Please select your desired chart first');
            }
          }
        },
        {
          command: 'Change y label to *',
          callback: (yLabel) => {
            setEditChart({...editChart,"y_axis":yLabel})
            setYLabel(yLabel);
            if(isChartOpen) {
              setValue(`Y label changed to ${yLabel}`);
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
          callback: ({ resetTranscript }) => resetTranscript()
        }
      ]

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
        }, [value])
        
        useEffect(() => {
          createChart()
        }, [cols])
      
      
        useEffect(() => {
          editChartPost()
          console.log(editChart)
        }, [editChart])
        
        if (!browserSupportsSpeechRecognition) {
          return <span>Browser doesn't support speech recognition.</span>;
        }


    // const location = useLocation()
    // const path_split = location.pathname.split("/")
    // const first = capitalizeFirstLetter(path_split[1])
    // const second = path_split[2].split("%20").join(" ")
    // const [fullScreen, setFullScreen] = useState(false);

    return(
        <Box display="flex" justifyContent="space-between" p={2} height="64px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {listening ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                    {transcript}
                                </Alert>: <p></p>}
                <IconButton onClick={() => {setOpen(!open)}}>
                        {open ? (
                            <OpenInFullRoundedIcon />
                        ) : (
                            <CloseFullscreenRoundedIcon />
                        )}
                </IconButton>
                {/* <Breadcrumbs aria-label="breadcrumb">
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
                </Breadcrumbs> */}
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
                <IconButton onClick={handleMicrophone}>
                    <MicIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar;