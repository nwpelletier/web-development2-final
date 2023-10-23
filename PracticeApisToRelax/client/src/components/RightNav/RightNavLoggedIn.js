import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SubCrudditContext } from "../../pages/Subcruddit";
import crudditlogo from "../../assets/cruddit-logo.png"
import { BASE_API_URL } from "../../utils/constant";
const userId = localStorage.getItem('userId');

function RightNavLoggedIn({ subcrudDefault }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [postKarma, setPostKarma] = useState();
  const [commentKarma, setCommentKarma] = useState();
  const [comment, setComment] = useState();
  const [username, setUsername] = useState("");
  const userName = localStorage.getItem('username')

  const getKarma = async () => {
    try {

      const response = await fetch(BASE_API_URL + `/api/users/karma/${userId}`);
      const data = await response.json();
      setPostKarma(data.postKarma, 10);
      setCommentKarma(data.commentKarma, 10);
      const userKarma = postKarma + commentKarma;
    } catch (error) {
      console.error('Error getting karma:', error);
    }
  };

  useEffect(() => {






    getKarma();
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <div className="">
        <strong className="right-nav-subcruddit-name">{userName}</strong>
        <div class="karma-container">
          <div class="row">
            <div class="col-md-2">
              <div class="fs-3">{postKarma}</div>
            </div>
            <div class="col-md-6">
              <p>post Curma</p>
            </div>
          </div>
        </div>
        <br></br>
        <div class="karma-container">
          <div class="row">
            <div class="col-md-2">
              <div class="fs-3">{commentKarma}</div>
            </div>
            <div class="col-md-6">
              <p>comment Curma</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <small>
          {" "}
        </small>
      </div>
      <div className="border-top border-dark"></div>
      <div className="sponsored-section mt-3">
      </div>

      <div className="wiki-container">
        <span className="wiki-title"></span>
        <p>Welcome to your userpage!  </p>
        <p>Here you can view the content you've submitted to Cruddit!  </p>
        <p>You can get a snapshot overview of your posts and comments here.</p>
        <p>As well, you can track your total Curma on posts/comments</p>
      </div>
      <div className="text-center">
        <div className="navCrudditLogo container">
          <img src={crudditlogo} width="80px" alt="cruddit logo" />
        </div>
      </div>
    </>
  );
}

export default RightNavLoggedIn;
