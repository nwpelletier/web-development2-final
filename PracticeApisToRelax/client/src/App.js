import { BrowserRouter as Router, Route, Routes, Link, Switch } from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import RightNav from './components/RightNav/RightNav';

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

        <div className="row mt-3 gx-0">
          <div className="col-10">
            <Main />
          </div>
          <div className="col-2">
            <RightNav />
          </div>
        </div>




        {/* <Router>
          <Routes> */}
        {/* <Route path="/" exact Component={Login} /> */}
        {/* <Route path="/login" exact Component={Login} /> */}
        {/* <Route path="/register" exact Component={Register} /> */}
        {/* </Routes>
        </Router> */}
      </div>
    </div>
  );
}

export default App;
