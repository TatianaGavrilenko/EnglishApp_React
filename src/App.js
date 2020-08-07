import React, { useState } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Nav from "./Components/Nav/Nav";
import Score from "./Components/Score";
import Library from "./Components/Page";
import Training from "./Components/Training";
import Learn from "./Components/Learn";
import Game from "./Components/Games/Game";

const App = () => {
  const checkLevel = () =>{
    return Math.floor((0.5 + Math.sqrt(1+ 8*(score)/(5)) / 2)) - 1
  }
  const[score, setScore] = useState(+localStorage.getItem('score') || 0)
  const[level, setLevel] = useState(checkLevel())

  const CheckLevel = () => {
    setLevel(checkLevel()) 
  }
  return (
    <BrowserRouter>
      <div className = "app-wrapper">
            <Nav level={level}/>
            <Score score={score} />
            <Route path="/library" component={Library} />
            <Route path="/training" component={Training} />
            <Route path="/learn">
                <Learn CheckLevel={CheckLevel}
                      setScore={setScore}
                      score={score}
                />
            </Route>
            <Route path="/training/check-mode">
                <Game setScore={setScore}
                      score={score}
                      CheckLevel={CheckLevel}
                />
            </Route>
            <Route path="/training/write-mode">
                <Game setScore={setScore}
                      score={score}
                      CheckLevel={CheckLevel}
                />
            </Route>
      </div>
    </BrowserRouter>
  )
}

export default App;
