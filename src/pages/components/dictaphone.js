import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import CreateTextTrigger from './createTextTrigger';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

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
        <Box sx={{
          width: '100%'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 2,
          }}>
            <p>{listening ? <MicIcon fontSize='large'></MicIcon> : <MicOffIcon fontSize='large'></MicOffIcon>}</p>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            my: 2,
          }}>
            <Button onClick={start} variant="outlined">Start</Button>
            <Button onClick={SpeechRecognition.stopListening} variant="outlined">Stop</Button>
            <Button onClick={resetTranscript} variant="outlined">Reset</Button>
          </Box>
          <CreateTextTrigger text={transcript}/>
        </Box>
      </>
  );
};
export default Dictaphone;