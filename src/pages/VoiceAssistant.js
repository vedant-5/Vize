import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';

function VoiceAssistant () {
  const {speak} = useSpeechSynthesis();
  const [value, setValue] = useState('Welcome to Wise. How may I help you?');
  const [microphone, setMicrophone] = useState(false);
  const [chartType, setChartType] = useState('');
  const [cols, setCols] = useState([]);

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
        }
        else {
          setValue('Please specify which chart you want to create');
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
    // {
    //   command: 'Beijing',
    //   callback: (command, spokenPhrase, similarityRatio) => setValue(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
    //   // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2
    // },
    // {
    //   command: ['eat', 'sleep', 'leave'],
    //   callback: (command) => setValue(`Best matching command: ${command}`),
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2,
    //   bestMatchOnly: true
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