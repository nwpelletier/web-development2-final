import React from 'react';
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";

// Formatting it, then will incorporate "get" request

function Post() {
  return (
    <div>
      <div className="post-container row">
        <div className="vote-and-type-container row">
          <div className="vote-container">
            <img
              className="upvote"
              src={arrowUpImage}
              alt="upvote"
              width="40%"
              height="40%">
            </img>
            {/*  */}
            <h6 className="vote-count">3456</h6>
            <img
              className="downvote"
              src={arrowDownImage}
              alt="upvote"
              width="40%"
              height="40%">
            </img>
          </div>
          <div className="post-type-container">
            <p>post type</p>
          </div>
        </div>

        <div className="post-content-container col-md-10 col-sm-5 row">
        </div>
      </div>
    </div>
  )
}

export default Post
