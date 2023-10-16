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
import React, { useState } from 'react';
import axios from 'axios';
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";

function UserOverview({ id, points, title, postType, UserId, SubcrudditId, createdAt }) {
  const [voteStatus, setVoteStatus] = useState('none');
  const [localPoints, setLocalPoints] = useState(points);

    //  I think "localPoints" could make sense for instant feedback
    //  On an upvote/downvote, without having to refresh the posts every time
    //  The database patch will be made, so refreshing the whole page
    //  Will still show updated; but localPoints could be what
    //  affects the orange uparrow, blue downarrow + immediate points change
  UserId = 2;
  const handleVote = (liked) => {

    // This case: it has already been upvoted, and you click upvote again
    if (voteStatus === liked) {
      axios.delete(`/api/votes/${id}`)
        .then(() => {
          setLocalPoints(localPoints - (liked === 'upvote' ? 1 : -1));
          setVoteStatus('none');
        })
        .catch(error => {
          console.error('Error in handleVote:', error);
        });
    } else {

      // Here is where I'm having issues with the endpoint for "posting a new vote"
      // When is the vote entry actually made?  Should a "new" vote not go to
      // /api/votes  ?
      axios.post(`/api/votes/${id}`, { liked })
        .then(response => {
          setLocalPoints(localPoints + (liked === 'upvote' ? 1 : -1));
          setVoteStatus(liked);
        })
        .catch(error => {
          console.error('Error in handleVote:', error);
        });
    }
  };

  return (
    <div>
      <div className="post-container row">
        <div className="vote-and-type-container row">
          <div className="vote-container">
            <img
              className={`upvote ${voteStatus === 'upvote' ? 'voted' : ''}`}
              src={arrowUpImage}
              alt="upvote"
              width="40%"
              height="40%"
              // onClick={() => handleVote(true)}
            />
            <h6 className="vote-count">{localPoints}</h6>
            <img
              className={`downvote ${voteStatus === 'downvote' ? 'voted' : ''}`}
              src={arrowDownImage}
              alt="downvote"
              width="40%"
              height="40%"
              // onClick={() => handleVote(false)}
            />
          </div>
          <div className="post-type-container">
            <p>{postType}</p>
          </div>
        </div>

        <div className="post-content-container col-md-10 col-sm-5 row">
          <div className="post-title">{title}</div>
          <div className="post-submission-info">Posted {createdAt} by {UserId} to {SubcrudditId}</div>
          <div className="post-links">
            <span># of child comments</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>report</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOverview;
