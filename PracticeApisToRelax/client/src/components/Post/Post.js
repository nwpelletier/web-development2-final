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
  const { id, points, title, postType, username, SubcrudditId, SubcrudditName, createdAt, content, children_count, isStickied, isLocked, isModeratorSingle } = props;
  const currentPath = useLocation().pathname;
  const contentType = useContext(ContentTypeContext);
  const userId = localStorage.getItem('userId');
  const [isPostLocked, setIsPostLocked] = useState(isLocked)
  const [isPostStickied, setIsPostStickied] = useState(isStickied)
 


  const [reply, setReply] = useState(false)
  const [postLiked, setPostLiked] = useState();
  const [postPoints, setPostPoints] = useState(points);
  const [newComment, setNewComment] = useState()
 
  const isMod = useContext(ModContext)
  const [isModerator, setIsModerator] = useState(isMod)

  //console.log(imgThumb);


  useEffect(() => {
    console.log("ISMOD?!?!")
    console.log(isModerator)

    console.log("mooooooooooodddddd")
    console.log(isModeratorSingle)
    let newPath = currentPath;
    if (currentPath.endsWith("/hot") || currentPath.endsWith("/new")) {
      newPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    }
 
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
            <a href={`${currentPath.replace('/hot', '').replace('/new', '')}/${id}/${title.replace(/[\s-]+/g, '_').replace(/["']/g, '').substring(0, 50).toLowerCase()}`}>
              {title}
            </a>
          </div>
          {currentPath.includes('/c/all') ? (
            <div className="post-submission-info"> {createdAt} by {username} to {SubcrudditName}  </div>
          ) : (
            <div className="post-submission-info">PostedALEX {createdAt} by {username} {isPostStickied && <span className='stickied-true' >Stickied Post</span>}  </div>
          )}

          {content && (
            <>
              <hr className={`stickied-${isPostStickied}`} />
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
            <span  >reply</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {isModeratorSingle === true && <span className='stickied-true'>sticky post</span>}
            {isModerator && isModerator[0]  && <span className='stickied-true'>sticky post</span>}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {isModeratorSingle === true && !isPostLocked && <span className='locked-true'>lock post</span>}
            {isModerator && isModerator[0]  && !isPostLocked && <span className='locked-true'>lock post</span>}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {isModeratorSingle === true && isPostLocked && <span className='locked-true'>unlock post</span>}
            {isModerator && isModerator[0]  && isPostLocked && <span className='locked-true'>unlock post</span>}
           
            
          </div>
        </div>
      </div>
{content && !isPostLocked &&
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