import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Comments';

function PostComments({ order, postId }) {
  const [comments, setComments] = useState([]);
 
 

  useEffect(() => {


    axios
      .get(`http://localhost:8080/api/posts/comments/${order}/${postId}`)
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
            <Comments key={key} comment={comment} order={order}  />
          );
        })
      )}
    </div>
  );
}

export default PostComments;
