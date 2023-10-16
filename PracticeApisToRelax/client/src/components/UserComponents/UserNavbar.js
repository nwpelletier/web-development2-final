import React, { useState } from "react";
import UserCommentsTab from "./UserCommentsTab";
import UserOverview from "./UserOverview";
import UserSubmitted from "./UserSubmitted"; 
function UserNav() {
  const [showComments, setShowComments] = useState(false);
  const [showOverview, setShowOverview] = useState(true);
  const [showSubmitted, setShowSubmitted] = useState(false);

  const userID = 2;

  

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => {
            setShowOverview(true);
            setShowComments(false);
            setShowSubmitted(false);
          }}
        >
          Overview
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link fs-6"
                href="#"
                onClick={() => {
                  setShowComments(true);
                  setShowOverview(false);
                  setShowSubmitted(false);
                }}
              >
                COMMENTS
              </a>
            </li>
             <li className="nav-item">
              <a
                className="nav-link fs-6"
                href="#"
                onClick={() => {
                  setShowSubmitted(true);
                  setShowOverview(false);
                  setShowComments(false);
                }}
              >
                SUBMITTED
              </a>
            </li> 
          </ul>
        </div>
      </nav>
      {showOverview && <UserOverview  UserID={userID}/>}
      {showComments && <UserCommentsTab />}
      {showSubmitted && <UserSubmitted />}
    </div>
  );
}

export default UserNav;
