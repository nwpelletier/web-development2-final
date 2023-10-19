import React, { useState, useEffect } from "react";
import UserCommentsTab from "./UserCommentsTab";
import UserOverview from "./UserOverview";
import UserSubmitted from "./UserSubmitted";
import Logo from "../../assets/reddit-logo.svg";

function UserNav() {
  const [showComments, setShowComments] = useState(false);
  const [showOverview, setShowOverview] = useState(true);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  let token = localStorage.getItem("token");
  const [userId, setUserId] = useState(
    token ? localStorage.getItem("userId") : 0
  );

  useEffect(() => {
    token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedUseId = localStorage.getItem("userId");
    //console.log("USERID TOKEN UserNav", storedUseId);
    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setUserId(storedUseId);
    }
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-8">
          <ul className="nav nav-tabs">
            {isAuthenticated && (
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
            )}
            <li className="nav-item">
              <a
                className={`nav-link ${showOverview ? "active" : ""}`}
                href="#"
                onClick={() => {
                  setShowOverview(true);
                  setShowComments(false);
                  setShowSubmitted(false);
                }}
              >
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${showComments ? "active" : ""}`}
                href="#"
                onClick={() => {
                  setShowComments(true);
                  setShowOverview(false);
                  setShowSubmitted(false);
                }}
              >
                Comments
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${showSubmitted ? "active" : ""}`}
                href="#"
                onClick={() => {
                  setShowSubmitted(true);
                  setShowOverview(false);
                  setShowComments(false);
                }}
              >
                Submitted
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {/* {console.log("USERID USERNAVBAR:",userId)} */}
          {showOverview && <UserOverview UserID={userId} />}
          {showComments && <UserCommentsTab UserID={userId} />}
          {showSubmitted && <UserSubmitted UserID={userId} />}
        </div>
      </div>
    </div>
  );
}

export default UserNav;
