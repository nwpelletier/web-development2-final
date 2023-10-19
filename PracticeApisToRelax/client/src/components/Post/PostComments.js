import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Comments';

function PostComments({ order, postId, display }) {
  const [comments, setComments] = useState([]);
  const [childrenShow, setChildrenShow] = useState(display)
  // const [show, setShow] = useState(display);

  // const toggleShow = () => {
  //   setShow(!show)
  // }
 
 

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
            // setShow={setShow}
            // show={show}
            // toggleShow={toggleShow}
            setChildrenShow={setChildrenShow}
            childrenShow={childrenShow}
              />
          );
        })
      )}
    </div>
  );
}

export default PostComments;
