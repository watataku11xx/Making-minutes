import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import CreateTextTrigger from './createTextTrigger';
import Button from '@mui/material/Button';

const Dictaphone = () => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  })

  function start() {
    SpeechRecognition.startListening({ continuous: true });
  }

  return (
      <>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <Button onClick={start} variant="outlined">Start</Button>
        <Button onClick={SpeechRecognition.stopListening} variant="outlined">Stop</Button>
        <Button onClick={resetTranscript} variant="outlined">Reset</Button>
        <CreateTextTrigger text={transcript}/>
      </>
  );
};
export default Dictaphone;