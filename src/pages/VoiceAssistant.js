import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';

function VoiceAssistant () {
  const {speak} = useSpeechSynthesis();
  const [value, setValue] = useState('Welcome to Wise. How may I help you?');
  const [microphone, setMicrophone] = useState(false);
  const [chartType, setChartType] = useState('');
  const [cols, setCols] = useState([]);
  const [title, setTitle] = useState('');
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [chartName, setChartName] =  useState('');
  const [xLabel, setXLabel] = useState('');
  const [yLabel, setYLabel] = useState('');
  const [chartID, setChartID] =  useState('')
  const [editChart, setEditChart] = useState({
    "title": "",
    "x_axis": ``,
    "y_axis": ``,
    "chart_type": "",
    "options": "Legend, title, color",
    "summary": null,
    "workspace_name": 3,
    "dashboard_name": 6,
})
const [chartList, setChartList] = useState([])


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
        const chart_id = chart_list?.filter((chart) => chart.title.toLowerCase() === chart_name).chart_id
        console.log(chart_id)
        setChartID(chart_id)
      }
    },
    {
      command: 'Add title *',
      callback: (title) => {
        setEditChart(...cols,{"title":title})
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

 useEffect(() => {
  getChartList()
  console.log(chartName)
  }, [chartName])

  useEffect(() => {
    // if(value === 'Welcome to Wise. How may I help you?') {
      speak({text: 'Welcome to Wise. How may I help you?'});
    // }
    // setValue('');
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

  const handleMicrophone = () => {
    setMicrophone(!microphone);
    if(microphone) {
      SpeechRecognition.startListening();
    }
    else {
      SpeechRecognition.abortListening();
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
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
  };
  fetch(`http://127.0.0.1:8000/chart/${chartID}`, requestOptions)
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



  return (
    <div></div>
    // <div>
    //   {/* <p>Microphone: {listening ? 'ON' : '----------'}</p> */}
    //   <button onClick={handleMicrophone}>Start</button>
    //   {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
    //   <button onClick={resetTranscript}>Reset</button>
    //   {/* <p>{transcript}</p> */}
    // </div>
  );
};


export default VoiceAssistant;