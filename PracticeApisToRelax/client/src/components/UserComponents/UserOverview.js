import axios from "axios";
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { BASE_API_URL } from "../../utils/constant";
import Post from "../Post/Post";
import formatDistance from "date-fns/formatDistance";
import ReactPaginate from "react-paginate";

function UserOverview(user) {
  let userId = user.UserID;

// MOVE THIS BLOCK BACK----------------------

useEffect(() => {
  try {
    if (userId == 0) {
      // navigate("/c/all");
    } else {
      axios
        .get(BASE_API_URL + `/api/overview/${userId}`)
        .then((response) => {
         // console.log("POSTS IN OVERVIEW", response.data);
          // if(!response)
          setPosts(response.data);
        });
    }
  } catch (error) {
    console.log("SHOW ERROR", error);
  }
}, []);

// -----------------------------



  // Testing paginate   
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isMod, setIsMod] = useState(false)


  const postsPerPage = 7; // Renamed to avoid conflict with the 'posts' state array
  const offset = pageNumber * postsPerPage;

  const displayPosts = posts && posts
    .slice(offset, offset + postsPerPage)
    .map((post) => (
      <Post
        key={post.id}
        id={post.id}
        points={post.points}
        title={post.title}
        content={post.content}
        postType={post.postType}
        username={post.username}
        SubcrudditName={post.SubcrudditName}
        children_count={post.children_count}
        isStickied={post.isStickied}
        isLocked={post.isLocked}
        createdAt={formatDistance(new Date(post.createdAt), new Date(), {
          addSuffix: true,
        })}
        isMod={isMod}
        isUserPage={true}


      />
    ));

  const pageCount = Math.ceil(posts.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }












  return (
    <div>

        {displayPosts}
        <ReactPaginate
          previousLabel={"< prev"}
          nextLabel={"next >"}
          pageCount={pageCount}
          onPageChange={changePage}
          renderOnZeroPageCount={null}
          pageClassName="page-item-none"
          previousClassName="previous-label"
          nextClassName="next-label"
          containerClassName="pagination-container"
        />

    </div>
  );
}
export default UserOverview;
