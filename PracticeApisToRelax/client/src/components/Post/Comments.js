import { useState } from "react";
import PostComments from "./PostComments";
import CreateComment from "./CreateComment";


function Comments(props){
    const {comment, order} = props;
    const [loadMore, setLoadMore] = useState(false);
    const [reply, setReply] = useState(false)
    const [nestedReply, setNestedReply] = useState(false)
    const [newComment, setNewComment] = useState({})
    const [commentReplies, setCommentReplies] = useState()
    const [show, setShow] = useState(true);
   


    const load = () => {
        console.log("clicked")
        setLoadMore(true);
    }

    const replyToComment = () => {
        setReply(true)
        setCommentReplies(comment.children_count);
    }

    const hide = () => {
        setShow(!show)
        
    }


    //ONE SINGULAR COMMENT 

    return (
        <div className={`comment-box background-${comment.layer % 2}`}>
            <div className="row">
                <div className="col-1 vote-area">
                    VOTE
                </div>
                <div className="col-11 comment-area">
                    <div className="row">
                        <div className="col-12 comment-small">
                        <span onClick={hide} className="comment-info mx-1 " >[-]</span>
                            <span className="comment-info mx-1 comment-links" >{comment.username}</span>
                            <span className="comment-info mx-1" >{comment.points > 0 ? comment.points : 0} points</span>
                            <span className="comment-info mx-1" >{comment.createdAt}</span>
                            {comment.id}
                        </div>
                    </div>
                {show && <p className="comment-big my-1" >{comment.content}</p>}
                {(comment.children_count > 0 && !loadMore) && 
                <span onClick={load} className=" comment-small" ><span className="comment-links">load more comments</span> <span>({comment.children_count} replies)</span></span>
                } {comment.isActive && <span onClick={replyToComment} className="comment-small fw-bolder">reply</span>}
                </div>

                {reply && <div className="">
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

            </div>
            {nestedReply && <>
            
            <Comments 
            comment={newComment}
            order={order}
        
        />
        </>}
            {(loadMore && comment.children_count > 0) && 
                <div className="mt-2" >
                <PostComments 
                order={order}
                postId={comment.id}
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