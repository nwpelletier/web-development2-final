import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import { formatDistance } from 'date-fns';

function SubcrudditDisplay({ subcrudditName }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (subcrudditName === 'all') {
          response = await axios.get('http://localhost:8080/api/posts/posts/hot');
        } else {
          response = await axios.get(
            `http://localhost:8080/api/posts/posts/${subcrudditName}/hot`
          );
        }
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [subcrudditName]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          points={post.points}
          title={post.title}
          postType={post.postType}
          UserId={post.UserId}
          SubcrudditId={post.SubcrudditId}

          // formatDistance (goes by hours ago, days ago, etc)
          createdAt={formatDistance(new Date(post.createdAt), new Date(), {
            addSuffix: true,
          })}
          by={post.username}
          SubcrudditName={post.subcrudditName}
        />
      ))}
    </div>
  );

}

export default SubcrudditDisplay;
