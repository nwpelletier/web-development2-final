import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import { formatDistance } from 'date-fns';

function SubcrudditDisplay({ subcrudditName, sortingType }) {
  const [posts, setPosts] = useState([]);
  if (!sortingType) {
    sortingType = "hot";
  }

  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (subcrudditName === 'all') {
          response = await axios.get('http://localhost:8080/api/posts/posts/${sortingType}');
        } else {
          response = await axios.get(
            `http://localhost:8080/api/posts/posts/${subcrudditName}/${sortingType}`
          );
        }
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [subcrudditName, sortingType]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          points={post.points}
          title={post.title}
          postType={post.postType}
          username={post.username} // Assuming the user object is nested within the post object
          SubcrudditName={post.SubcrudditName}
          createdAt={formatDistance(new Date(post.createdAt), new Date(), {
            addSuffix: true,
          })}
        />
      ))}
    </div>
  );

}

export default SubcrudditDisplay;
