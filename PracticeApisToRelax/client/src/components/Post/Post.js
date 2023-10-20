import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ContentTypeContext } from '../Main/Main';
import PostVote from './PostVote';
import txtThumb from '../../assets/comment-svgrepo-com.svg'
import imgThumb from '../../assets/imageclr-svgrepo-com.svg'
import { BASE_API_URL } from '../../utils/constant';

function Post(props) {
  const { id, points, title, postType, username, SubcrudditId, SubcrudditName, createdAt, content } = props;
  const currentPath = useLocation().pathname;
  const contentType = useContext(ContentTypeContext);
  const userId = localStorage.getItem('userId');

  const [postLiked, setPostLiked] = useState();
  const [postPoints, setPostPoints] = useState(points);

  console.log(imgThumb);


  useEffect(() => {
    axios
      .get(BASE_API_URL + `/api/votes/${id}/${userId}`)
      .then((response) => {
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
            {postType === 'image' ? (
              <img src={imgThumb}></img>
            ) : (
              <img src={txtThumb}></img>
            )}
          </div>
        </div>

        <div className="post-content-container col-md-10 col-sm-5 row">
          <div className="post-title">
            <a href={`${currentPath}/${id}/${title.replace(/[\s-]+/g, '_').replace(/["']/g, '').substring(0, 50).toLowerCase()}`}>
              {title}
            </a>
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
                {postType === 'image' ? (
                  <a className="main-image-post" href={content}>
                    <img src={content} alt="Image Content" />
                  </a>
                ) : (
                  <p>{content}</p>
                )}
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