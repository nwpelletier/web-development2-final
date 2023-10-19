
import { useEffect, useState } from "react";
import { ArrowUpShort, ArrowDownShort } from 'react-bootstrap-icons';
import axios from "axios";
function CommentVotes({userLiked, setUserLiked, comment, commentPoints, setCommentPoints}) {

    const vote = (value) => {
        value.UserId = 1;
        const userId = localStorage.getItem("userId")
        if (userId) {
            axios
            .post(`http://localhost:8080/api/votes/${comment.id}`, value, {
                headers: {
                  'x-access-token': localStorage.getItem("token")
                }
                })
            .then((response) => {
                setUserLiked(response.data.vote)
                setCommentPoints(commentPoints + response.data.points)
            })
            .catch((error) => {
              console.log(error);
            });
        }

    }
   
    return (
        <>
        <div className="m-0">
            <div className="vote-up-comment">
            <ArrowUpShort
            size={25}
            onClick={() => vote({liked: true})}
            className={`comment-vote comment-${userLiked}`}  />
            </div>
            <div className="vote-down-comment">
            <ArrowDownShort
            size={25}
            onClick={() => vote({liked: false})}
            className={`comment-vote comment-${!userLiked}`} />
            </div>
   
        </div>
        
        </>
    )

}

export default CommentVotes;