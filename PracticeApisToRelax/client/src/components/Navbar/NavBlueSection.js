import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../utils/constant';


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
      
      const response = await fetch(BASE_API_URL + `/api/users/karma/${userId}`);
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

  const navigateSubcrudRoot = () => {
    navigate(`/c/${currentPath}`);
  };

  const handleNavigation = () => {
    navigate('/userpage');
  }

  const navigateNew = () => {
    navigate(`/c/${currentPath}/new`);
  };
  
  const navigateHot = () => {
    navigate(`/c/${currentPath}/hot`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const openModal = (content) => {
    setModalContent(content);
  };

  return (

    // Temp formatting! Fix after functionality
    <div className="lower-half row ">
      <div className="current-subcruddit my-3 mx-3 col-3" onClick={navigateSubcrudRoot}>
        {currentPath}
      </div>
      <div className="hot-new-tab row">
        <span className= "col-4 gx-2 tab-option1" onClick={navigateHot}>hot</span>
        <span className= "col-4 gx-2 offset-1 tab-option2" onClick={navigateNew}>new</span>
      </div>
      <div className="login-box">
        {isAuthenticated ? (
          <>
            <span className="navbar-user-link" onClick={handleNavigation}>{localStorage.getItem('username')}</span>
            <span id="navbar-user-karma"> ({userKarma}) </span>
            <span id="temp-for-icon">| --- | --- | </span>
            <span className="navbar-user-link px-4" onClick={userLogout}>logout</span>
          </>
        ) : (
          <span>
            Want to join?{' '}
            <span
              className="navbar-user-link"
              onClick={() => openModal('login')}
              data-bs-toggle="modal"
              data-bs-target="#defaultModal"
            >
              Log in
            </span>{' '}
            or{' '}
            <span
              className="navbar-user-link"
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
