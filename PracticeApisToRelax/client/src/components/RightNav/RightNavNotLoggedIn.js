import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function RightNavNotLoggedIn() {
  
  return (
   
    <>
      <div className="mb-3">
        <div className="d-flex align-items-center">
          <input type="text" className="col-md-10" placeholder="Search" />
          <button className="col-md-2">
            <FontAwesomeIcon icon={faSearch} size="1x" />
          </button>
        </div>
      </div>

      <div className="border  border-dark p-3">
        <div className="row ">
          <div className="col-md-5">
            <input type="text" placeholder="username" />
          </div>
          <div className="col-md-5">
            <input type="text" placeholder="password" />
          </div>
        </div>

        <div className="row">
          <a className="col-md-6 mt-3 link-dark text-decoration-none" href="#">
            reset password
          </a>
          <div className="col-md-6 d-flex justify-content-end">
            <button className="btn btn-secondary mt-3">Log In</button>
          </div>
        </div>
      </div>
      <div className="sponsored-section mt-3">
        <a className="sponsored-link" href="#">
          Submit a Post
        </a>
      </div>
    </>

  );
}

export default RightNavNotLoggedIn;
