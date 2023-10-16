// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function UserOverview() {
//   let id = 2;

//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     try {
//       axios.get(`http://localhost:8080/api/posts/${id}/posts`).then((response) => {
//         setPosts(response.data);
//       });
//     } catch (error) {}
//   }, []);

//   return (
//     <div className="container mt-3">
//       <ul className="list-group">
//         {posts.map((post, index) => (
//           <li
//             key={index}
//             className="list-group-item col-md-8 mb-3 border rounded p-3 shadow"
//           >
//             <div className="">{post.title}</div>
//             <div className="">{post.caption}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserOverview;
import axios from "axios";
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function UserOverview(userID) {

  


  const [voteStatus, setVoteStatus] = useState("none");
  const [localPoints, setLocalPoints] = useState(0);
  //let { userid } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      console.log(userID.UserID);
      axios
        .get(`http://localhost:8080/api/posts/${userID.UserID}/posts/`)
        .then((response) => {
          setPosts(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log("SHOW ERROE", error);
    }
  }, []);
  
  let { id } = useParams();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/api/posts/${id}/comments`)
        .then((response) => {
          setComments(response.data);
        });
    } catch (error) {
      
    }
  },[]);

  //  I think "localPoints" could make sense for instant feedback
  //  On an upvote/downvote, without having to refresh the posts every time
  //  The database patch will be made, so refreshing the whole page
  //  Will still show updated; but localPoints could be what
  //  affects the orange uparrow, blue downarrow + immediate points change
  //UserId = 2;
  const handleVote = (liked) => {
    // This case: it has already been upvoted, and you click upvote again
    if (voteStatus === liked) {
      axios
        .delete(`/api/votes/${posts.id}`)
        .then(() => {
          setLocalPoints(localPoints - (liked === "upvote" ? 1 : -1));
          setVoteStatus("none");
        })
        .catch((error) => {
          console.error("Error in handleVote:", error);
        });
    } else {
      // Here is where I'm having issues with the endpoint for "posting a new vote"
      // When is the vote entry actually made?  Should a "new" vote not go to
      // /api/votes  ?
      axios
        .post(`/api/votes/${posts.id}`, { liked })
        .then((response) => {
          setLocalPoints(localPoints + (liked === "upvote" ? 1 : -1));
          setVoteStatus(liked);
        })
        .catch((error) => {
          console.error("Error in handleVote:", error);
        });
    }
  };

  return (
    <div>
      {posts.map((post, index) => (
        // <div className="post-container row">

        //   <div className="vote-and-type-container row">
        //     <div className="vote-container">
        //       <img
        //         className={`upvote ${voteStatus === "upvote" ? "voted" : ""}`}
        //         src={arrowUpImage}
        //         alt="upvote"
        //         width="40%"
        //         height="40%"
        //         // onClick={() => handleVote(true)}
        //       />
        //       <h6 className="vote-count">{localPoints}</h6>
        //       <img
        //         className={`downvote ${
        //           voteStatus === "downvote" ? "voted" : ""
        //         }`}
        //         src={arrowDownImage}
        //         alt="downvote"
        //         width="40%"
        //         height="40%"
        //         // onClick={() => handleVote(false)}
        //       />
        //     </div>
        //     <div className="post-type-container">
        //       <p>{posts.postType}</p>
        //     </div>
        //   </div>

        //   <div className="">
        //     <li
        //       key={index}
        //       className=""
        //     >
        //       <div className="post-title">{post.title}</div>
        //       <div className="post-submission-info">
        //         Posted {post.createdAt} by {post.UserName} to{" "}
        //         {post.subcrudditName}
        //       </div>
        //       <div className="post-links">
        //         <span># of child comments</span>
        //         &nbsp;&nbsp;&nbsp;&nbsp;
        //         <span>report</span>
        //       </div>
        //     </li>
        //   </div>
        // </div>
        <div class="row my-2">
          <div className="post-container row">
            <div class="col-md-2 d-flex flex-column">
              <div className="row">
                <div className="col-md-2">
                  <img
                    className=""
                    src={arrowUpImage}
                    alt="upvote"
                    width="20px"
                    // onClick={() => handleVote(true)}
                  />
                  <h6 className="mx-1">{localPoints}</h6>
                  <img
                    className="mb-5"
                    src={arrowDownImage}
                    alt="downvote"
                    width="20px"
                    // onClick={() => handleVote(false)}
                  />
                </div>
                <div className="col-md-4">
                  <div className=" pt-4 ">
                    <p>{post.postType}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-10">
              <div className="post-title">{post.title}</div>
              <div className="post-submission-info">
                Posted {format(new Date(post.createdAt),"MM/dd/yyyy")} by {post.UserName} to {"  "}
                {post.subcrudditName}
              </div>
              <div className="post-links">
                <span># of child comments</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>report</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOverview;
