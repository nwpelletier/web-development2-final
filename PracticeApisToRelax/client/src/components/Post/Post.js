import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";
import { ContentTypeContext } from '../Main/Main';

function Post({ id, points, title, postType, username, SubcrudditId, SubcrudditName, createdAt, content }) {
  const [voteStatus, setVoteStatus] = useState('none');
  const [localPoints, setLocalPoints] = useState(points);
  const currentPath = useLocation().pathname;
  const contentType = useContext(ContentTypeContext);

  const handleVote = (liked) => {

    // This case: it has already been upvoted, and you click upvote again
    if (voteStatus === liked) {
      axios.delete(`/api/votes/${id}`)
        .then(() => {
          setLocalPoints(localPoints - (liked === 'upvote' ? 1 : -1));
          setVoteStatus('none');
        })
        .catch(error => {
          console.error('Error in handleVote:', error);
        });
    } else {

      axios.post(`/api/votes/${id}`, { liked })
        .then(response => {
          setLocalPoints(localPoints + (liked === 'upvote' ? 1 : -1));
          setVoteStatus(liked);
        })
        .catch(error => {
          console.error('Error in handleVote:', error);
        });
    }
  };

  return (
    <div>
      <div className={`post-container row ${contentType === 'subcruddit' ? 'post-subcruddit-height' : ''}`}>
        <div className="vote-and-type-container">
          <div className="vote-container">
            <img
              className={`upvote ${voteStatus === 'upvote' ? 'voted' : ''}`}
              src={arrowUpImage}
              alt="upvote"
              width="40%"
              height="40%"
            // onClick={() => handleVote(true)}
            />
            <h6 className="vote-count">{localPoints}</h6>
            <img
              className={`downvote ${voteStatus === 'downvote' ? 'voted' : ''}`}
              src={arrowDownImage}
              alt="downvote"
              width="40%"
              height="40%"
            // onClick={() => handleVote(false)}
            />
          </div>
          <div className="post-type-container">
            <p>{postType}</p>
          </div>
        </div>

        <div className="post-content-container col-md-10 col-sm-5 row">
          <div className="post-title">
            <Link to={`/c/${SubcrudditName}/${id}/${title.replace(/[\s-]+/g, '_').replace(/["']/g, '').substring(0, 50).toLowerCase()}`}>
              {title}
            </Link>

          </div>
          {currentPath.includes('/c/all') ? (
            <div className="post-submission-info">Posted {createdAt} by {username} to {SubcrudditName}</div>
          ) : (
            <div className="post-submission-info">Posted {createdAt} by {username}</div>
          )}
          
          {content && (
            <>
            <hr></hr>
            <div className="post-content col-10">
              <p>{content}</p>
            </div>
            </>
          )}
          <div className="post-links">
            <span># of child comments</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>report</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;