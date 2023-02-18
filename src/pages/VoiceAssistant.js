import React, { useState, useEffect } from 'react';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import { Bar } from 'react-chartjs-2';

const VoiceAssistant = () => {
  
  const [value, setValue] = useState('Welcome to Vize');
  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  return (
    <div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => speak({ text: value })}>Speak</button>
      <button onMouseDown={listen} onMouseUp={stop}>
        🎤
      </button>
      {listening && <div>Go ahead I'm listening</div>}
    </div>
  );
};

export default VoiceAssistant;