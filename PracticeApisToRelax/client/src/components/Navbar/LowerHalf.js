import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

function LowerHalf() {
  const [modalContent, setModalContent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the presence of a JWT token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Token found, consider the user authenticated
      setIsAuthenticated(true);
    }
  }, []);

  const openModal = (content) => {
    setModalContent(content);
  };

  return (
    <div className="lower-half">
      <div className="login-box">
        {isAuthenticated ? (
          <p>Welcome, {localStorage.getItem('username')}!</p>
        ) : (
          <span>
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
          </span>
        )}
      </div>

      <Modal content={modalContent} setModalContent={setModalContent} />
    </div>
  );
}

export default LowerHalf;
