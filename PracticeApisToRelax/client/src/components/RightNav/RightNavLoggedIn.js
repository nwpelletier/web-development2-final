import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function RightNavLoggedIn() {
  const [curma, setCurma] = useState(1);
  const [comment, setComment] = useState(0);

  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <>
      <h3>{username}</h3>

      <div className="mb-3">
        <div className="">
          <div className="row">
            <span className="fs-3 col-md-1">{curma}</span>
            <span className="col-md-11 pt-2">
              <small>post Curma</small>
            </span>
          </div>

          <div className="row">
            <span className="fs-3 col-md-1">{comment}</span>
            <span className="col-md-11 pt-2">
              {" "}
              <small>comment Curma</small>
            </span>
          </div>
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

export default RightNavLoggedIn;
