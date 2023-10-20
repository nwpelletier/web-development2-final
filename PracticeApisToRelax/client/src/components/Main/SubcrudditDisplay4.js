import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import { formatDistance } from 'date-fns';
import { ModContext } from '../../pages/Subcruddit';
export const SubcrudditContext = createContext();
import { BASE_API_URL } from '../../utils/constant';
function SubcrudditDisplay({ subcrudditName, sortingType }) {

  const [posts, setPosts] = useState([]);
  const [isMod, setIsMod] = useContext(ModContext);

  if (!sortingType) {
    sortingType = "hot";
  }

  // Verifying mod status!
  console.log('Subcruddit Mod Status: ' + isMod);


  const [sortBy, setSortBy] = useState('')



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (subcrudditName === 'all') {
          response = await axios.get(
            BASE_API_URL + `/api/posts/posts/${sortingType}`
          );
        } else {
          response = await axios.get(
            BASE_API_URL + `/api/posts/posts/${subcrudditName}/${sortingType}`
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
          username={post.username}
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
