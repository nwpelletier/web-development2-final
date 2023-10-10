import { BrowserRouter as Router, Route, Routes, Link, Switch } from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react';
import Navbar from './components/Navbar/Navbar';

// The /pages/login will be imported into the modal
// import Login from './pages/login';
import './App.css';
import Register from './pages/register';



function App() {

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="App">
        <Router>
          <Routes>
            {/* <Route path="/" exact Component={Login} /> */}
            {/* <Route path="/login" exact Component={Login} /> */}
            {/* <Route path="/register" exact Component={Register} /> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
