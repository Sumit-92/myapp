import Alert from './Alert';
import './App.css';
import Navbar from './Navbar';
import Textbox from './Textbox';
import { useState} from 'react';

function App(){
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)

  const showAlert = (message , type )=>{
    setAlert({
       msg : message ,
       type : type
    })

    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  const toggleMode = ()=>{
    if( mode === 'light' )
    {
      setMode('dark')
      document.body.style.backgroundColor = '#042743'
      showAlert( "Dark Mode has been Enabled" , "success")
      document.title = 'TextUtils - Dark Mode'
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = 'white'
      showAlert( "Light Mode has been Enabled" , "success")
      document.title = 'TextUtils - Light Mode'
    }
  }

  return (  
        <>
        <Navbar title="TextUtils" about="About" name="Sumit"  more="know more" mode={mode} toggleMode = {toggleMode} />
        <Alert alert={alert} />
        <Textbox showAlert={showAlert} mode={mode} heading="Welcome to TextUtils" />
        </>

    
    
  );
}

export default App;
