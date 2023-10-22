import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ContentTypeContext } from '../Main/Main';
import PostVote from './PostVote';
import txtThumb from '../../assets/comment-svgrepo-com.svg'
import imgThumb from '../../assets/imageclr-svgrepo-com.svg'
import { BASE_API_URL } from '../../utils/constant';
import { ModContext } from '../../pages/Subcruddit';
import CreateComment from './CreateComment';
import Comments from './Comments';
import PostComments  from './PostComments';

function Post(props) {
  const { id, points, title, postType, username, SubcrudditId, SubcrudditName, createdAt, content, children_count, isStickied, isLocked, isModeratorSingle, isMod } = props;
  const currentPath = useLocation().pathname;
  const contentType = useContext(ContentTypeContext);
  const userId = localStorage.getItem('userId');
  const [isPostLocked, setIsPostLocked] = useState(isLocked)
  const [isPostStickied, setIsPostStickied] = useState(isStickied)
  const userRole = localStorage.getItem('userRole');
  const [commentOrder, setCommmentOrder] = useState("new")
  
 


  const [reply, setReply] = useState(false)
  const [postLiked, setPostLiked] = useState();
  const [postPoints, setPostPoints] = useState(points);
  const [newComment, setNewComment] = useState()
 
  let { handle } = useParams();
  const [isModerator, setIsModerator] = useState()

  //console.log(imgThumb);


  useEffect(() => {
  
    const subName = handle ? handle : SubcrudditName;
  
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setIsModerator(false)
        return;
      }
        axios.get(
        BASE_API_URL + `/api/moderators/ismod/${subName}`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }
      ).then((response)=> {
        const isMod = response.data.auth;
        setIsModerator(isMod);
      }).catch((error)=> {
        console.log(error)
      })
   // }

  
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


  const toggleLock = async () => {
    console.log("locking?");
    try {
      console.log("in try")
      const token = localStorage.getItem('token')
      const response = await axios.patch(BASE_API_URL + "/api/posts/lock/" + id, null, {
        headers: {
          'x-access-token': token
        }
      });
      console.log(response)
      console.log(response.data.isLocked);
      setIsPostLocked(response.data.isLocked);
    } catch (error) {
      console.log(error);
    }
  };
  
  const toggleSticky = async () => {
   
    try {
      console.log("in try")
      const token = localStorage.getItem('token')
      const response = await axios.patch(BASE_API_URL + "/api/posts/sticky/" + id, null, {
        headers: {
          'x-access-token': token
        }
      });
      console.log(response)
      console.log(response.data.isStickied);
      setIsPostStickied(response.data.isStickied);
    } catch (error) {
      console.log(error);
    }
  };




  return (
    
    <div>

{/* For Alex: viewing all posts per subcruddit */}
      <div className={`post-container row ${contentType === 'subcruddit' ? 'post-subcruddit-height' : ''} stickied-box-${isPostStickied} container-fluid`}>
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
        <div className={`post-content-container col-md-10 col-sm-5 row `}>
          <div className="post-title"> 
            <a href={`${currentPath.replace('/hot', '').replace('/new', '')}/${id}/${title.replace(/[\s-]+/g, '_').replace(/["']/g, '').substring(0, 50).toLowerCase()}`}>
              {title}
            </a>
          </div>
          {currentPath.includes('/c/all') ? (
            <div className="post-submission-info"> {createdAt} by {username} to {SubcrudditName}  </div>
          ) : (
            <div className="post-submission-info">Posted {createdAt} by {username} {isPostStickied && <span className='stickied-true' >Stickied Post</span>}  </div>
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

            
            {isModerator === true && !isPostStickied && 
            <> &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={() => toggleSticky()} className='stickied-true'>sticky post</span></>}


            {/* {isModerator && isModerator  && !isPostStickied && 
             <> &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={() => toggleSticky()} className='stickied-true'>sticky post</span></>} */}

            {isModerator === true && isPostStickied && 
             <> &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={() => toggleSticky()} className='stickied-true'>unsticky post</span></>}


            {/* {isModerator && isModerator[0]  && isPostStickied && 
             <> &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={() => toggleSticky()} className='stickied-true'>unsticky post</span></>} */}
           
            {isModerator === true && !isPostLocked && 
             <> &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={() => toggleLock()}  className='locked-true'>lock post</span></>}


            {/* {isModerator && isModerator[0]  && !isPostLocked && 
              <> &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={() => toggleLock()}  className='locked-true'>lock post</span></>} */}
            
            {isModerator === true && isPostLocked && 
            <> &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={() => toggleLock()}  className='locked-true'>unlock post</span></>}


            {/* {isModerator && isModerator[0]  && isPostLocked && 
            <> &nbsp;&nbsp;&nbsp;&nbsp;
            <span onClick={() => toggleLock()}  className='locked-true'>unlock post</span></>} */}
           
            
          </div>
        </div>
      </div>
      {content && !isPostLocked ? (
  <CreateComment
    id={id}
    setReply={setReply}
    order="new"
  />
) : null}
{content && isPostLocked && (
  <div className='ms-3'>Comments have been locked</div>
)}





{content && <>
  <PostComments
        order={commentOrder}
        postId={id}
        isLocked={isLocked}
       
         /></>}

{/* const {id, value, setReply, order, setNewComment, setNestedReply, setCommentReplies, commentReplies} = props */}


    </div>
  );
}

export default Post;