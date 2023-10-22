import React, { useState } from 'react';
import arrowUpImage from '../../assets/arrow-square-up-svgrepo-com.svg';
import arrowDownImage from '../../assets/arrow-square-down-svgrepo-com.svg';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constant';
import Modal from '../Modal/Modal';

function PostVote(props) {
  const { postLiked, setPostLiked, id, postPoints, setPostPoints } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
  };

  const vote = (value) => {
    if (!isLoggedIn) {
      openModal('login');
      return;
    }
    value.UserId = 1;
    axios
      .post(BASE_API_URL + `/api/votes/${id}`, value, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then((response) => {
        setPostLiked(response.data.vote);
        setPostPoints(postPoints + response.data.points);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(postLiked);
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <img
            className={`upvote ${postLiked === true ? 'upvote-true' : ''}`}
            src={arrowUpImage}
            alt="upvote"
            width="40%"
            height="40%"
            onClick={() => vote({ liked: true })}
          />
          <h6 className="vote-count">{postPoints}</h6>
          <img
            className={`downvote ${postLiked === false ? 'downvote-false' : ''}`}
            src={arrowDownImage}
            alt="downvote"
            width="40%"
            height="40%"
            onClick={() => vote({ liked: false })}
          />
        </div>
      ) : (
        <>
          <img
            className={`upvote ${postLiked === true ? 'upvote-true' : ''}`}
            src={arrowUpImage}
            alt="upvote"
            width="40%"
            height="40%"
            onClick={() => openModal('login')}
            data-bs-toggle="modal"
            data-bs-target="#defaultModal"
          />
          <h6 className="vote-count">{postPoints}</h6>
          <img
            className={`downvote ${postLiked === false ? 'downvote-false' : ''}`}
            src={arrowDownImage}
            alt="downvote"
            width="40%"
            height="40%"
            onClick={() => openModal('login')}
            data-bs-toggle="modal"
            data-bs-target="#defaultModal"
          />
        </>
      )}
      <Modal content={modalContent} setModalContent={setModalContent} />
    </>
  );
}

export default PostVote;
