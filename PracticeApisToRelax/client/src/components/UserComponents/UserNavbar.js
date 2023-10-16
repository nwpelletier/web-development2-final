import React, { useState } from "react";
import UserCommentsTab from "./UserCommentsTab";
import UserOverview from "./UserOverview";
import UserSubmitted from "./UserSubmitted"; 
import UserUpvoted from "./UserUpvoted"; 
import UserDownvoted from "./UserDownvoted"; 
function UserNav() {
  const [showComments, setShowComments] = useState(false);
  const [showOverview, setShowOverview] = useState(true);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [showUpvoted, setShowUpvoted] = useState(false);
  const [showDownvoted, setShowDownvoted] = useState(false);

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
            setShowUpvoted(false);
            setShowDownvoted(false);
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
                  setShowUpvoted(false);
                  setShowDownvoted(false);
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
                  setShowUpvoted(false);
                  setShowDownvoted(false);
                }}
              >
                SUBMITTED
              </a>
            </li> 
            <li className="nav-item">
              <a
                className="nav-link fs-6"
                href="#"
                onClick={() => {
                  setShowUpvoted(true);
                  setShowOverview(false);
                  setShowComments(false);
                  setShowSubmitted(false);
                  setShowDownvoted(false);
                }}
              >
                UPVOTED
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fs-6"
                href="#"
                onClick={() => {
                  setShowDownvoted(true);
                  setShowOverview(false);
                  setShowComments(false);
                  setShowSubmitted(false);
                  setShowUpvoted(false);
                }}
              >
                DOWNVOTED
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {showOverview && <UserOverview />}
      {showComments && <UserCommentsTab />}
      {showSubmitted && <UserSubmitted />}
      {showUpvoted && <UserUpvoted />}
      {showDownvoted && <UserDownvoted />}
    </div>
  );
}

export default UserNav;
