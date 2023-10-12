import React from 'react';
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";

function Post({ points, title, postType, UserId, SubcrudditId, createdAt }) {
  console.log("Request received with the following data:");
  console.log("points:", points);
  console.log("title:", title);
  console.log("postType:", postType);
  console.log("userId:", UserId);
  console.log("subcrudditId:", SubcrudditId);
  console.log("createdAt:", createdAt);



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
            <h6 className="vote-count">{points}</h6>
            <img
              className="downvote"
              src={arrowDownImage}
              alt="upvote"
              width="40%"
              height="40%">
            </img>
          </div>
          <div className="post-type-container">
            <p>{postType}</p>
          </div>
        </div>

        <div className="post-content-container col-md-10 col-sm-5 row">
          <div className="post-title">{title}</div>
          <div className="post-submission-info">Posted {createdAt} by {UserId} to {SubcrudditId}</div>
          <div className="post-links">
            <span># of child comments</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>report</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Post
