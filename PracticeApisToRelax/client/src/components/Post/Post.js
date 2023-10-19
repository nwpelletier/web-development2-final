import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";
import { ContentTypeContext } from '../Main/Main';
import PostVote from './PostVote';

function Post(props) {
  const { id, points, title, postType, username, SubcrudditId, SubcrudditName, createdAt, content } = props;
  const currentPath = useLocation().pathname;
  const contentType = useContext(ContentTypeContext);

  const [postLiked, setPostLiked] = useState();
  const [postPoints, setPostPoints] = useState(points);


  useEffect(() => {
    axios
    .get(`http://localhost:8080/api/votes/${id}`)
    .then((response) => {
      console.log(id + " " + response.data)

      setPostLiked(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    setPostLiked("nothing")
  }, [setPostLiked])


  return (
    <div>
      <div className={`post-container row ${contentType === 'subcruddit' ? 'post-subcruddit-height' : ''}`}>
        <div className="vote-and-type-container">
          <div className="vote-container">
            <PostVote
              postLiked={postLiked}
              setPostLiked={setPostLiked}
              id={id}
              postPoints={postPoints}
              setPostPoints={setPostPoints}
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