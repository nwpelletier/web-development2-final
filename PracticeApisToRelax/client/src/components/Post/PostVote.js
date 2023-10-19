import { useEffect, useState } from 'react'
import arrowUpImage from "../../assets/arrow-square-up-svgrepo-com.svg";
import arrowDownImage from "../../assets/arrow-square-down-svgrepo-com.svg";
import axios from "axios";


function PostVote(props) {
  const { postLiked, setPostLiked, id, postPoints, setPostPoints } = props;
  const vote = (value) => {
    value.UserId = 1;
    axios
      .post(`http://localhost:8080/api/votes/${id}`, value, {
        headers: {
          'x-access-token': localStorage.getItem("token")
        }
      })
      .then((response) => {
        setPostLiked(response.data.vote)
        setPostPoints(postPoints + response.data.points)
      })
      .catch((error) => {
        console.log(error);
      })
      console.log(postLiked)
  }


  return (
    <div>
      <img
        className={`upvote`}
        src={arrowUpImage}
        alt="upvote"
        width="40%"
        height="40%"
        onClick={() => vote({ liked: true })}
      />
      <h6 className="vote-count">{postPoints}</h6>
      <img
        className={`downvote`}
        src={arrowDownImage}
        alt="downvote"
        width="40%"
        height="40%"
        onClick={() => vote({ liked: false })}
      />
    </div>
  )
}

export default PostVote
