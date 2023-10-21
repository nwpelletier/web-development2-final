import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ContentTypeContext } from '../Main/Main';
import PostVote from './PostVote';
import txtThumb from '../../assets/comment-svgrepo-com.svg'
import imgThumb from '../../assets/imageclr-svgrepo-com.svg'
import { BASE_API_URL } from '../../utils/constant';
import { ModContext } from '../../pages/Subcruddit';
import CreateComment from './CreateComment';
import Comments from './Comments';

function Post(props) {
  const { id, points, title, postType, username, SubcrudditId, SubcrudditName, createdAt, content, children_count } = props;
  const currentPath = useLocation().pathname;
  const contentType = useContext(ContentTypeContext);
  const userId = localStorage.getItem('userId');


  const [reply, setReply] = useState(false)
  const [postLiked, setPostLiked] = useState();
  const [postPoints, setPostPoints] = useState(points);
  const [newComment, setNewComment] = useState()

  //console.log(imgThumb);


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

{/* For Alex: viewing all posts per subcruddit */}
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

{/* Alex: Single post view */}
        <div className="post-content-container col-md-10 col-sm-5 row">
          <div className="post-title"> 
            <a href={`${currentPath}/${id}/${title.replace(/[\s-]+/g, '_').replace(/["']/g, '').substring(0, 50).toLowerCase()}`}>
              {title}
            </a>
          </div>
          {currentPath.includes('/c/all') ? (
            <div className="post-submission-info"> {createdAt} by {username} to {SubcrudditName} </div>
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
            <span>  {children_count} comment{children_count === 1 ? '' : 's'}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>report</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={()=>setReply(true)} >reply</span>
          </div>
        </div>
      </div>
{reply &&
      <CreateComment
      id={id}
      setReply={setReply}
      order={"new"}
      
      
      />
}
{newComment && <>
            <Comments 
            comment={newComment}
            order={"new"}
            points={1}
            replyToComment={false}
        
        /></>}

{/* const {id, value, setReply, order, setNewComment, setNestedReply, setCommentReplies, commentReplies} = props */}


    </div>
  );
}

export default Post;