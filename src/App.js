import './MainScreen.js';
import './App.css';
import React from 'react';
import AllQuestions from './AllQuestions.js';
import MainScreen from './MainScreen.js';

function App() {

  const [started, setStarted] = React.useState(false)

  return (
    <div className="App">
       {started ? 
       <AllQuestions setStarted={setStarted}/>    
        :
        <MainScreen setStarted={setStarted}/>
       }
    </div>
 
)
 
  
}


export default App;
