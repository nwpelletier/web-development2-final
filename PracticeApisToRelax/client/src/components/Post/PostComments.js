import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Comments';
import { BASE_API_URL } from '../../utils/constant';

function PostComments({ order, postId, isLocked, isModerator, moderators, commentOrder, setCommentOrder }) {
  const [comments, setComments] = useState([]);
  


 

  useEffect(() => {
console.log(commentOrder)
setComments([]);
    axios
      .get(BASE_API_URL + `/api/posts/comments/${commentOrder}/${postId}`)
      .then((response) => {
        console.log("re-rendering ")
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [commentOrder, postId, order]);

  return (
    
    <div>
     
      {(comments.length) > 0 && (
        comments.map((comment, key) => {
          
          return (
            <Comments 
            key={key} 
            comment={comment} 
            order={commentOrder}
            points={comment.points}
            children={comment.children_count}
            isLocked={isLocked}
            isModerator={isModerator}
            moderators={moderators}
            
 
              />
          );
        })
      )}
    </div>
  );
}

export default PostComments;
