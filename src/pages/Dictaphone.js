import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import CreateTextTrigger from './createTextTrigger';


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
        <button onClick={start}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        <CreateTextTrigger text={transcript}/>
      </>
  );
};
export default Dictaphone;