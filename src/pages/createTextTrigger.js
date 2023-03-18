import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const  CreateTextTrigger = (props) => {

  const [inputText, setInputText] = useState();
  const [resultText, setResultText] = useState();

  useEffect(() => {
    setInputText(props.text);
  }, [props.text]);
  
  const handleSubmit = async (event) => {
    
    if(!inputText){
      alert('録音されていません。');
      event.preventDefault();
      return;
    }

    event.preventDefault();
    
    const response = await fetch('/api/chatGptApi', {
      method: 'POST',
      body: JSON.stringify({inputText}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    setResultText(data);
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-multiline-static"
          label="Text"
          multiline
          rows={4}
          defaultValue="Default Value"
          type="text"
          value={props.text}
        />
        <Button type="submit" variant="contained">Make text</Button>
      </form>
      {resultText && <p>{resultText}</p>}
    </>
  );
};

export default CreateTextTrigger;