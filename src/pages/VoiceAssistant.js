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
  const [xLabel, setXLabel] = useState('');
  const [yLabel, setYLabel] = useState('');

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
        setCols([col1, col2]);
        if(chartType !== '') {
          setValue(`Creating ${chartType} chart with columns ${col1} and ${col2}`);
          setIsChartOpen(true);
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
      command: 'Add title *',
      callback: (title) => {
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
    // {
    //   command: 'Pass the salt (please)',
    //   callback: () => setValue('My pleasure')
    // },
    // {
    //   command: ['Hello', 'Hi'],
    //   callback: ({ command }) => setValue(`Hi there! You said: "${command}"`),
    //   matchInterim: true
    // },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

  const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition({commands});

  
  useEffect(() => {
    // if(value === 'Welcome to Wise. How may I help you?') {
      speak({text: 'Welcome to Wise. How may I help you?'});
    // }
    // setValue('');
  }, []);

  useEffect(() => {
    speak({text: value})
  }, [value])
  
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

  return (
    <div>
      <p>Microphone: {listening ? 'ON' : '----------'}</p>
      <button onClick={handleMicrophone}>Start</button>
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};


export default VoiceAssistant;