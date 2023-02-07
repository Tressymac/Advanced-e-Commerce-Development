import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import logo from './assets/buddingPopWine.gif';
import './assets/style.css'

import './App.css';
import Task from './pages/Board/Board';
import Header from './components/Header';

import Board from './pages/Board/Board';
import AllTasks from './pages/AllTasks/AllTasks';

function App() {

  //check Node enviroment 
  // console.log(process.env.NODE_ENV);

  let apiURL = '';
  if (process.env.NODE_ENV === 'production'){
    apiURL = process.env.REACT_APP_PROD_API_URL;
  }
  else{
    apiURL = process.env.REACT_APP_DEV_API_URL;
  };
  console.log(apiURL);


  return (
    <div className='container'>
      <div className="App">
        <BrowserRouter>
          <Header buddingPopWine={logo} />
          <Routes>
            <Route path="/" element={<Board apiURL={apiURL} />}/>
            <Route path="/AllTasks" element={<AllTasks apiURL={apiURL} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
