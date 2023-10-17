import axios from "axios";
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function UserCommentsTab(user) {
  //console.log("USER:", user);
  let userId = user.UserID;
  const [voteStatus, setVoteStatus] = useState("none");
  const [localPoints, setLocalPoints] = useState(0);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/api/overview/${userId}`)
        .then((response) => {
          setPosts(response.data);
          //console.log(response.data);
        });
    } catch (error) {
      console.log("SHOW ERROR", error);
    }
  }, []);

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
        <div class="row my-2">
          {post.postType === "comment" ? (          <div className="post-container row">
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
              <div>
                
                {post.postType === "comment" ? (
                  <div>
                    <p>{post.content}</p>
                  </div>
                ) : (
                  <div className="post-title">
                    <h3>{post.title}</h3>
                  </div>
                )}
              </div>
              <div className="post-submission-info">
                Posted {format(new Date(post.createdAt), "MM/dd/yyyy")} by{" "}
                {post.UserName} to {"  "}
                {post.subcrudditName}
              </div>
              <div className="post-links">
                <span># of child comments</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>report</span>
              </div>
            </div>
          </div>) :( <></>)}

        </div>
      ))}
    </div>
  );
}

export default UserCommentsTab;
