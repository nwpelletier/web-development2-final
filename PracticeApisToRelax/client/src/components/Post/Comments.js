import { useEffect, useState, useContext } from "react";
import PostComments from "./PostComments";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import { format } from "date-fns";
import CommentVotes from "../Comments/CommentVotes";
import axios from "axios";
import Delete from "../Modal/Delete";
import { BASE_API_URL } from "../../utils/constant";



function Comments(props){
    const {comment, order, points, isLocked, isModerator, moderators } = props;
    const [loadMore, setLoadMore] = useState(false);
    const [reply, setReply] = useState(false)
    const [nestedReply, setNestedReply] = useState(false)
    const [newComment, setNewComment] = useState()
    const [commentReplies, setCommentReplies] = useState(comment.children_count)
    const [commentContent, setCommentContent] = useState(comment.content)
    const [userLiked, setUserLiked] = useState()
    const [commentPoints, setCommentPoints] = useState(points)
    const [edit, setEdit] = useState();
    const [isUser, setIsUser] = useState();
    const [show, setShow] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    const [toBeDeleted, setToBeDeleted] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [commentOrder, setCommentOrder] = useState(order)
    
 

   

  const toggleShow = () => {
   setShow(!show)
  }
 
    useEffect(() => {
        
        const userIdentity = parseInt(userId);
       if (userIdentity === comment.UserId) {
        setIsUser(true)
       } else {
        setIsUser(false)
       }
        if (userIdentity) {
            axios
            .get(BASE_API_URL + `/api/votes/${comment.id}/${userIdentity}`)
            .then((response) => {
              setUserLiked(response.data);
            })
            .catch((error) => {
              console.log(error);
            });   
        } else {
            setUserLiked("nothing")
        }



    },[setUserLiked, setIsUser, commentOrder])
 


    const load = () => {
        console.log("clicked")
        setLoadMore(true);
        setNestedReply(false)
    }

    const replyToComment = () => {
        setReply(true)
    }

    const hide = () => {
        setShow(!show)
        
    }

    const editComment = () => {
        setEdit(true)
    }


    const destroy = () => {
        const token = localStorage.getItem('token');
        axios
        .delete(BASE_API_URL + "/api/posts/" + comment.id, {
          headers: {
            'x-access-token': token
          }
        })
        .then((response)=> {
          console.log(response.data.isActive)
          if (!response.data.isActive) {
            setIsDeleted(true)
            setToBeDeleted(false)
          }
         
        }).catch((error)=> {
          console.log(error)
        })
    
      }


    const deleteRequest = () => {
        setToBeDeleted(!toBeDeleted)
        console.log(toBeDeleted)
    }




    //ONE SINGULAR COMMENT 

    return (
        
        <div className={`comment-box  background-${comment.layer % 2}`}>
         
            <div className="comment-row">
                <div className="vote-area">
                    {comment.isActive && <>

                    <CommentVotes 
                    userLiked={userLiked} 
                    setUserLiked={setUserLiked} 
                    comment={comment} 
                    commentPoints={commentPoints}
                    setCommentPoints={setCommentPoints}
                    
                    /></>}
                </div>
                <div className=" comment-area">
                    
                    <div className="row">
                        <div className="col-12 comment-small">
                        <span onClick={toggleShow} className="comment-info mx-1 " >[-]</span>
                            <span className="comment-info mx-1 comment-links" >{comment.username}</span>
                            <span className="comment-info mx-1 comment-links" ></span>
                            {moderators && moderators.includes(comment.username, 0) && <span className='mx-1 stickied-true' >* moderator *</span>}
                            <span className="comment-info mx-1" >{commentPoints > 0 ? commentPoints : 0} points</span>
                            <span className="comment-info mx-1" >{format(new Date(comment.createdAt), "MM/dd/yyyy")}</span>
                    
                        </div>
                    </div>
                {show && <><p className="comment-big my-1" >{commentContent}</p>
                
                {(comment.children_count > 0 && !loadMore) && 
                <span onClick={load} className=" comment-small" ><span className="comment-links">load more comments</span> <span>({commentReplies} replies)</span></span>
                } 
                
                {comment.isActive && !isLocked && <span onClick={replyToComment} className="comment-small post-action-hover ms-1 fw-bolder">reply</span>}


                {(comment.isActive && isUser)&& <span onClick={editComment} className="comment-small post-action-hover ms-1">edit</span>}


                {(comment.isActive && (isUser || isModerator || role==='admin' ) && !isDeleted ) && 
                    <span onClick={() => {setToBeDeleted(true)}} className="comment-small post-action-hover ms-1">delete</span>}


                {isDeleted && <span className="comment-small text-danger  ms-1">deleted</span>}

                {toBeDeleted &&
                <>
                <span className="comment-small text-danger ms-1">Are you sure?</span>
                <span onClick={destroy} className="comment-small fw-bolder ms-1">Yes</span>
                <span className="comment-small text-danger ms-1">/</span>
                <span onClick={() => setToBeDeleted(false)} className="comment-small fw-bolder ms-1">No</span>
                </>
                }
                </>}
  

                {!show &&  <span className="ms-3 mt-1 comment-small" >{commentReplies} children</span> }
                </div>
 


{/* // value = {formObj.value ? subParam : undefined} */}

            </div>
            {reply && <div className="comment-block">
                <CreateComment 
                id={comment.id} 
                setReply={setReply} 
                order={order} 
                setNewComment={setNewComment} 
                setNestedReply={setNestedReply}
                setCommentReplies={setCommentReplies}
                commentReplies={commentReplies}/>
                </div>
                
                }

{ edit && 
                                <EditComment 
                                setCommentContent={setCommentContent}
                                comment={comment} 
                                order={order} 
                                setEdit={setEdit}
                                value={commentContent}/>

                }



            {newComment && <>
            
            <Comments 
            comment={newComment}
            order={order}
            points={1}
            isLocked={isLocked}
            isModerator={isModerator}
            moderators={moderators}

            
        
        />
        </>}
            {(loadMore && comment.children_count > 0 && show) && 
                <div className="mt-2" >
                <PostComments 
                order={order}
                postId={comment.id}
                display={show}
                isLocked={isLocked}
                isModerator={isModerator}
                moderators={moderators}
                
                />
                </div>
                }

 
        </div>
    )
}

export default Comments;


