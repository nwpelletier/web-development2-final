import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import { formatDistance } from 'date-fns';
import PostComments from '../Post/PostComments';

function PostDisplay({ postId }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${parseInt(postId)}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Error fetching post');
      }
    };
    if (!isNaN(parseInt(postId))) {
      fetchPost();
    }
  }, [postId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Post
        key={post.id}
        id={post.id}
        points={post.points}
        title={post.title}
        content={post.content}
        postType={post.postType}
        username={post.username} // Assuming the user object is nested within the post object
        SubcrudditId={post.SubcrudditId}
        createdAt={formatDistance(new Date(post.createdAt), new Date(), {
          addSuffix: true,
        })}
        SubcrudditName={post.subcrudditName}
      />

      <PostComments
      // Hard coded for now. :)
        order='new'
        postId={post.id} />
    </>

  );
}

export default PostDisplay;
