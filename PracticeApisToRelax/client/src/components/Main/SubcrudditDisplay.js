// SubcrudditDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Post from '../Post/Post';

// Changing to display posts by subcrudditName
function SubcrudditDisplay({ subcrudditName }) {
  const [subcrudditId, setSubcrudditId] = useState(subcrudditName);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    // Fetching single subcruddit from url handle (prop drilling now, fix to context!)
    axios.get(`http://localhost:8080/api/subcruddits/${subcrudditName}`)
      .then(response => {
        const { subcruddit } = response.data;
        setSubcrudditId(subcruddit.id);

        // Now fetch posts based on subcrudditId
        axios.get(`http://localhost:8080/api/posts/posts/${subcruddit.id}/hot`)
          .then(response => {
            setPosts(response.data);
          })
          .catch(error => {
            console.error('Error fetching posts:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching subcruddit:', error);
      });
  }, [subcrudditName]);

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          points={post.points}
          title={post.title}
          postType={post.postType}
          UserId={post.UserId}
          SubcrudditId={post.SubcrudditId}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}

export default SubcrudditDisplay;
