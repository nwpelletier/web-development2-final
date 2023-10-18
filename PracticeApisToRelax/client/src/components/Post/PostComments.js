import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Comments';

function PostComments({ order, postId }) {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show)
  }
 
 

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
            <Comments 
            key={key} 
            comment={comment} 
            order={order}
            points={comment.points}
            children={comment.children_count}
            setShow={setShow}
            show={show}
            toggleShow={toggleShow}
              />
          );
        })
      )}
    </div>
  );
}

export default PostComments;
