// 2023/10/10 Calling it "lower half" because that's all it is now - might rename to something that makes more sense

import React, { useState } from 'react';
import Modal from '../Modal/Modal';

function LowerHalf() {
  const [modalContent, setModalContent] = useState('');

  // Content will either be 'login' or 'signup' for this modal
  const openModal = (content) => {
    setModalContent(content);
  };

  return (
    <div className="lower-half">
      <div className="login-box">
        Want to join?{' '}
        <span
          id="link"
          onClick={() => openModal('login')}
          data-bs-toggle="modal"
          data-bs-target="#defaultModal"
        >
          Log in
        </span>{' '}
        or{' '}
        <span
          id="link"
          onClick={() => openModal('signup')}
          data-bs-toggle="modal"
          data-bs-target="#defaultModal"
        >
          sign up
        </span>{' '}
        in seconds. |
      </div>
      {/* Create modal, pass content, and the ability to setModalContent */}
      <Modal content={modalContent} setModalContent={setModalContent}/>
    </div>
  );
}

export default LowerHalf;
