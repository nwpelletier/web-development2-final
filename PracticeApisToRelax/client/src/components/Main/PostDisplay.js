import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostDisplay({ postId }) {
  const [selectedPost, setSelectedPost] = useState(null);

  // Log the type of postId
  console.log(typeof postId);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${parseInt(postId)}`);
        setSelectedPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    // Fetch post only if postId is a number
    if (!isNaN(parseInt(postId))) {
      fetchPost();
    }
  }, [postId]);

  return (
    <div>
      {selectedPost ? (
        <div>
          <h2>Displaying Post ID: {postId}</h2>
          <h4>{selectedPost.title}</h4>
          <p>{selectedPost.content}</p>
          <p>Points: {selectedPost.points}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostDisplay;
