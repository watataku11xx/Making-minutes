import { useState } from "react";

const  CreateTextTrigger = (props) => {

  const [inputText, setInputText] = useState();
  const [resultText, setResultText] = useState();
  
  const handleSubmit = async (event) => {
    
    setInputText(props.text);

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
        <textarea type="text" value={props.text}></textarea>
        <button type="submit">議事録を作成する</button>
      </form>
      {resultText && <p>{resultText}</p>}
    </>
  );
};

export default CreateTextTrigger;