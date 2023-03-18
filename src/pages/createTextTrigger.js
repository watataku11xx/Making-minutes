import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import styles from '../styles/createTextTrigger.module.css'
import { Box } from "@mui/system";

const  CreateTextTrigger = (props) => {

  const [inputText, setInputText] = useState();
  const [resultText, setResultText] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    setInputText(props.text);
  }, [props.text]);
  
  const handleSubmit = async (event) => {
    
    if(!inputText){
      setAlert();
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

  const setAlert = () => {
    setOpenAlert(true);
  };

  return(
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Text"
          multiline
          rows={4}
          type="text"
          value={props.text}
          className={styles.textField}
        />
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
        }}>
          <Button type="submit" variant="contained">Make text</Button>
        </Box>
      </form>
      <Box sx={{
        width: 500,
        position: 'fixed',
        bottom: 0,
        right: 0,
      }}>
        <Collapse in={openAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ 
              mb: 2,
              mr: 2,
            }}>
            ERROR! 音声入力がされていません。
          </Alert>
        </Collapse>
      </Box>
      {resultText && 
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Minutes"
          multiline
          rows={4}
          type="text"
          value={resultText}
          className={styles.textField}
          sx={{
            mt: 2,
          }}
        />
      }
    </>
  );
};

export default CreateTextTrigger;