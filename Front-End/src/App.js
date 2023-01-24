import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import logo from './assets/buddingPopWine.gif';
import './assets/style.css'

import './App.css';
import Task from './pages/Board/Board';
import Header from './components/Header';

import Board from './pages/Board/Board';

function App() {
  return (
    <div className='container'>
      <div className="App">
        <BrowserRouter>
          <Header buddingPopWine={logo} />
          <Board />
          <Routes>
            <Route path="/Task" element={<Task/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
