import React, { useState,useEffect } from "react";
import UserProfileEmail from "./UserProfileEmail";
import UserProfilePassword from "./UserProfilePassword";
import Logo from "../../assets/reddit-logo.svg";

function UserProfileNav() {
  const userID = 2;

  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername); 
    }
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-8">
          <ul className="nav nav-tabs">
            <li className="nav-item d-flex align-items-center">
              <a className="nav-link" href="/c/all">
                <img
                  src={Logo}
                  alt="Reddit Logo"
                  width="100rem"
                  className="px-2"
                />
              </a>
              <div className="d-flex align-items-center">
                <strong className="text-dark me-3 fs-3">{username}</strong>
              </div>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${email ? "active" : ""}`}
                href="#"
                onClick={() => {
                  setEmail(true);
                  setPassword(false);
                }}
              >
                ADD/UPDATE EMAIL
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${password ? "active" : ""}`}
                href="#"
                onClick={() => {
                  setEmail(false);
                  setPassword(true);
                }}
              >
                UPDATE PASSWORD
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {email && <UserProfileEmail UserID={userID}/>}
          {password && <UserProfilePassword UserID={userID}/>}
        </div>
      </div>
    </div>
  );
}

export default UserProfileNav;
