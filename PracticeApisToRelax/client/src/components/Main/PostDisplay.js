// Just laying it out - not functional


import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import SinglePost from '../Post/SinglePost';

function PostDisplay({ postId }) {
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${postId}`)
      .then(response => {
        setSelectedPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  return (
    <div>
      {selectedPost && (
        <SinglePost
          id={selectedPost.id}
          content={selectedPost.content}
        />
      )}
    </div>
  );
}

export default PostDisplay;
