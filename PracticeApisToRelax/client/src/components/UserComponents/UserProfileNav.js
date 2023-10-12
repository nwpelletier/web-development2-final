import React, { useState } from "react";
import UserProfileEmail from "./UserProfileEmail";
import UserProfilePassword from "./UserProfilePassword";

function UserNav() {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState(false);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => {
            setEmail(true);
            setPassword(false);
          }}
        >
          ADD/UPDATE EMAIL
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
                  setEmail(false);
            setPassword(true);
                }}
              >
                UPDATE PASSWORD
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {email && <UserProfileEmail />}
      {password && <UserProfilePassword />}
    </div>
  );
}

export default UserNav;
