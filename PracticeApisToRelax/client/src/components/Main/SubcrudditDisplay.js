import axios from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { formatDistance } from 'date-fns';
import Post from '../Post/Post';
import { BASE_API_URL } from '../../utils/constant';

import { ModContext } from '../../pages/Subcruddit';
import { btnText } from '../CreatePost/textPostInit';
export const SubcrudditContext = createContext();


function SubcrudditDisplay({ subcrudditName, sortingType,}) {

  // Testing paginate   
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
    // const [isMod, setIsMod] = useContext(ModContext);

  // Auto-navigate to /c/all upon visiting landing page
  const navigateToAll = useNavigate();



  const postsPerPage = 5; // Renamed to avoid conflict with the 'posts' state array
  const offset = pageNumber * postsPerPage;
 
  const displayPosts = posts && posts
    .slice(offset, offset + postsPerPage)
    .map((post) => (
      <Post
        key={post.id}
        id={post.id}
        points={post.points}
        title={post.title}
        postType={post.postType}
        username={post.username}
        SubcrudditName={post.SubcrudditName}
        children_count={post.children_count}
        isStickied={post.isStickied}
        isLocked={post.isLocked}
        createdAt={formatDistance(new Date(post.createdAt), new Date(), {
          addSuffix: true,
        })}
     
      />
    ));
     
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }


  // Verifying mod status! Alex

  const [sortBy, setSortBy] = useState('')

  // Default sorting type!
  if (!sortingType) {
    sortingType = "hot";
  }


  // Get posts by sorting type!
  useEffect(() => {
    console.log(subcrudditName)
    if (!subcrudditName) {
      navigateToAll("/c/all");
    }
    const fetchPosts = async () => {
      try {
        let response;
        if (subcrudditName === 'all' || !subcrudditName) {
          response = await axios.get(
            BASE_API_URL + `/api/posts/posts/${sortingType}`
          );
        } else {
          response = await axios.get(
            BASE_API_URL + `/api/posts/posts/${subcrudditName}/${sortingType}`
          );
        }
        console.log(response.data)
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [subcrudditName, sortingType]);


  // Display
  return (
    <div>
      {displayPosts}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={btnText}
        previousLinkClassName={btnText}
        nextLinkClassName={btnText}
        disabledClassName={btnText}
        activeClassName={btnText}
      />
    </div>
  );


}

export default SubcrudditDisplay;
