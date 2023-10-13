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

import "./App.css";
import UserPage from "./pages/UserPage";
import UserProfile from "./pages/UserProfile";
import AddSubcruddit from "./pages/AddSubcruddit"
import Home from './pages/Home'
import TextPost from "./pages/TextPost";

export const AuthContext = React.createContext();
export const UsernameContext = React.createContext();
export const UserRoleContext = React.createContext();

function App() {

  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);


  return (
    <div>
      <AuthContext.Provider value={[isAuth, setIsAuth]}>
        <UsernameContext.Provider value={[username, setUsername]}>
          <UserRoleContext.Provider value={[userRole, setUserRole]}>
            {/* Ignore - will delete this stuff, was for testing */}
            {/* <div>{username}</div>
            <div>{userRole}</div>
            <div>{isAuth.toString()}</div>
            <a href={`/userpage`}>USERPAGE</a> */}
            <Router>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/userpage" element={<UserPage />}></Route>
                <Route path="/userprofile" element={<UserProfile />}></Route>
                <Route path="/post" element={<TextPost />}></Route>
              </Routes>
            </Router>
          </UserRoleContext.Provider>
        </UsernameContext.Provider>
      </AuthContext.Provider>

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