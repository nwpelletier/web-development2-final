import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
} from "react-router-dom";
import React, { useEffect, useState, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import RightNav from "./components/RightNav/RightNav";

// The /pages/login will be imported into the modal
import Login from "./pages/login";
import "./App.css";
import Register from "./pages/register";
import UserPage from "./pages/UserPage";
import AddSubcruddit from "./pages/AddSubcruddit"
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/userpage" element={<UserPage />}></Route>
          <Route path="/subcruddits/create" element={<AddSubcruddit/>}></Route>
        </Routes>
      </Router>

      {/* <Router>
          <Routes> */}
      {/* <Route path="/" exact Component={Login} /> */}
      {/* <Route path="/login" exact Component={Login} /> */}
      {/* <Route path="/register" exact Component={Register} /> */}
      {/* </Routes>
        </Router> */}
    </div>
  );
}

export default App;
