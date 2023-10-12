import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/DemoPost';

function Main() {

  // Default: will display posts by new
  // Todo: implement useEffect to allow toggling between hot/new
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts/posts/new')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []); 

  return (
    <div>
      {posts.map(posts => (
        <Post
          key={posts.id}
          id={posts.id}
          points={posts.points}
          title={posts.title}
          postType={posts.postType}
          UserId={posts.UserId}
          SubcrudditId={posts.SubcrudditId}
          createdAt={posts.createdAt}
        />
      ))}
    </div>
  );
}

export default Main;
