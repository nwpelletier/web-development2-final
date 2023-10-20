import axios from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { formatDistance } from 'date-fns';
import Post from '../Post/Post';

import { ModContext } from '../../pages/Subcruddit';
import { btnText } from '../CreatePost/textPostInit';
export const SubcrudditContext = createContext();


function SubcrudditDisplay({ subcrudditName, sortingType }) {

  // Testing paginate
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5; // Renamed to avoid conflict with the 'posts' state array
  const offset = pageNumber * postsPerPage;
  const displayPosts = posts
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
        createdAt={formatDistance(new Date(post.createdAt), new Date(), {
          addSuffix: true,
        })}
      />
    ));
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }


  // Verifying mod status!
  const [isMod, setIsMod] = useContext(ModContext);
  console.log('Subcruddit Mod Status: ' + isMod);
  const [sortBy, setSortBy] = useState('')

  // Default sorting type!
  if (!sortingType) {
    sortingType = "hot";
  }


  // Get posts by sorting type!
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (subcrudditName === 'all') {
          response = await axios.get(
            `http://localhost:8080/api/posts/posts/${sortingType}`
          );
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
