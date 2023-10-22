import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import { formatDistance } from 'date-fns';
import PostComments from '../Post/PostComments';
import { BASE_API_URL } from "../../utils/constant";
// import { ModContext } from '../../pages/Subcruddit';

function PostDisplay({ postId}) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isModeratorSingle, setIsModeratorSingle] = useState(false)

  // Verifying mod status! Alex
  //  const [isMod, setIsMod] = useContext(ModContext);

  useEffect(() => {
    
    const fetchPost = async () => {
      try {
        const response = await axios.get(BASE_API_URL + `/api/posts/${parseInt(postId)}`);
        setPost(response.data);
        console.log(response.data)
        console.log(response.data.subcrudditName)
        axios.get(
          BASE_API_URL + `/api/moderators/ismod/${response.data.subcrudditName}`, {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }}).then((response)=> {
            setIsModeratorSingle(response.data.auth)
            console.log("PAGE MODERATOR: " + response.data.auth)
          }).catch((error)=> {
            console.log(error)
            setIsModeratorSingle(false)
          })

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
        children_count={post.children_count}
        isStickied={post.isStickied}
        isLocked={post.isLocked}
        isModeratorSingle={isModeratorSingle}
       
      />


      {/* <PostComments
      // Hard coded for now. :)
        order='new'
        postId={post.id} 
        isModeratorSingle={isModeratorSingle}/> */}
    </>
      

  );
}

export default PostDisplay;
