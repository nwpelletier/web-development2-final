import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function LowerHalf() {
  const [modalContent, setModalContent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userKarma, setUserKarma] = useState('');
  const currentPath = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');


  // Testing w/ userId localStorage
  const getKarma = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/karma/${userId}`);
      const data = await response.json();
      const postKarma = parseInt(data.postKarma, 10);
      const commentKarma = parseInt(data.commentKarma, 10);
      const userKarma = postKarma + commentKarma;

      setUserKarma(userKarma);
    } catch (error) {
      console.error('Error getting karma:', error);
    }
  };


  useEffect(() => {
    getKarma();
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);




  const userLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate(`/c/all`);
  }

  const handleNavigation = () => {
    navigate('/userpage');

  }

  useEffect(() => {
    console.log(currentPath)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const openModal = (content) => {
    setModalContent(content);
  };

  return (
    <div className="lower-half">
      <div className="current-subcruddit my-3 mx-3">
        {currentPath}
        {userKarma}
      </div>
      <div className="login-box">
        {isAuthenticated ? (
          <>

            <span onClick={handleNavigation}>{localStorage.getItem('username')}</span>
            <span id="navbar-user-karma"> ({userKarma}) </span>
            <span id="temp-for-icon">| --- | --- | </span>
            <span className="px-4" onClick={userLogout}>logout</span>
          </>
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
