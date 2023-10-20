import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Comments';
import { BASE_API_URL } from '../../utils/constant';

function PostComments({ order, postId, }) {
  const [comments, setComments] = useState([]);


 

  useEffect(() => {


    axios
      .get(BASE_API_URL + `/api/posts/comments/${order}/${postId}`)
      .then((response) => {
        
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [order, postId]);

  return (
    
    <div>
      {(comments.length) > 0 && (
        comments.map((comment, key) => {
          
          return (
            <Comments 
            key={key} 
            comment={comment} 
            order={order}
            points={comment.points}
            children={comment.children_count}
 
              />
          );
        })
      )}
    </div>
  );
}

export default PostComments;
