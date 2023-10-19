import { useEffect, useState } from "react";
import PostComments from "./PostComments";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import { format } from "date-fns";
import CommentVotes from "../Comments/CommentVotes";
import axios from "axios";


function Comments(props){
    const {comment, order, points, display, setChildrenShow, childrenShow } = props;
    const [loadMore, setLoadMore] = useState(false);
    const [reply, setReply] = useState(false)
    const [nestedReply, setNestedReply] = useState(false)
    const [newComment, setNewComment] = useState({})
    const [commentReplies, setCommentReplies] = useState(comment.children_count)
    const [commentContent, setCommentContent] = useState(comment.content)
    const [userLiked, setUserLiked] = useState()
    const [commentPoints, setCommentPoints] = useState(points)
    const [edit, setEdit] = useState();
    const [isUser, setIsUser] = useState();
    const [show, setShow] = useState(childrenShow);
   

  const toggleShow = () => {
    const isShow = !show
    setShow(isShow)
    setChildrenShow(isShow)
  }
 
   
    
  
    useEffect(() => {
    
        const userId = parseInt(localStorage.getItem("userId"), 10);
       if (userId === comment.UserId) {
        setIsUser(true)
       } else {
        setIsUser(false)
       }
        if (userId) {
            axios
            .get(`http://localhost:8080/api/votes/${comment.id}/${userId}`)
            .then((response) => {
              setUserLiked(response.data);
            })
            .catch((error) => {
              console.log(error);
            });   
        } else {
            setUserLiked("nothing")
        }



    },[setUserLiked, setIsUser])
 


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


    //ONE SINGULAR COMMENT 

    return (
        <div className={`comment-box  background-${comment.layer % 2}`}>
            <div className="comment-row">
                <div className="vote-area">
                    <CommentVotes 
                    userLiked={userLiked} 
                    setUserLiked={setUserLiked} 
                    comment={comment} 
                    commentPoints={commentPoints}
                    setCommentPoints={setCommentPoints}
                    
                    />
                </div>
                <div className=" comment-area">
                    <div className="row">
                        <div className="col-12 comment-small">
                        <span onClick={toggleShow} className="comment-info mx-1 " >[-]</span>
                            <span className="comment-info mx-1 comment-links" >{comment.username}</span>
                            <span className="comment-info mx-1" >{commentPoints > 0 ? commentPoints : 0} points</span>
                            <span className="comment-info mx-1" >{format(new Date(comment.createdAt), "MM/dd/yyyy")}</span>
                    
                        </div>
                    </div>
                {show && <><p className="comment-big my-1" >{commentContent}</p>
                {(comment.children_count > 0 && !loadMore) && 
                <span onClick={load} className=" comment-small" ><span className="comment-links">load more comments</span> <span>({commentReplies} replies)</span></span>
                } {comment.isActive && <span onClick={replyToComment} className="comment-small fw-bolder">reply</span>}
                {(comment.isActive && isUser )&& <span onClick={editComment} className="comment-small  ms-1">edit</span>}
                {(comment.isActive && isUser )&& <span onClick={replyToComment} className="comment-small text-danger ms-1">delete</span>}
                </>}
                </div>







{/* // value = {formObj.value ? subParam : undefined} */}

            </div>
            {reply && <div className="comment-block">
                <CreateComment 
                comment={comment} 
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



            {nestedReply && <>
            
            <Comments 
            comment={newComment}
            order={order}
            points={1}
        
        />
        </>}
            {(loadMore && comment.children_count > 0) && 
                <div className="mt-2" >
                <PostComments 
                order={order}
                postId={comment.id}
                display={childrenShow}
                
                />
                </div>
                }

 
        </div>
    )
}

export default Comments;


// "id": 4,
// "UserId": 3,
// "username": "timfranklin",
// "content": "You're stupid.",
// "children_count": 0,
// "points": 0,
// "layer": 1,
// "isStickied": false,
// "createdAt": "2023-10-16T01:24:14.000Z"