import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import SubcrudditDisplay from './SubcrudditDisplay';
import PostDisplay from './PostDisplay';

function Main({ handle }) {
  const { postId } = useParams();
  const contentType = postId ? 'post' : 'subcruddit';
  console.log(contentType)
  useEffect(() => {
    if (contentType === 'subcruddit') {
      const fetchSubcrudditId = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/subcruddits/${handle}`);
          // Handle the subcruddit data
        } catch (error) {
          console.error('Error fetching subcruddit:', error);
        }
      };
      fetchSubcrudditId().catch(error => console.error('Error fetching subcruddit:', error));
    } else if (contentType === 'post' && postId) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
          // Handle the post data
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
      fetchPost().catch(error => console.error('Error fetching post:', error));
    }
  }, [handle, postId, contentType]);

  return (
    <div>
      {contentType === 'subcruddit' ? (
        <SubcrudditDisplay subcrudditName={handle} />
      ) : (
        <PostDisplay postId={postId} />
      )}
    </div>
  );
}

export default Main;
