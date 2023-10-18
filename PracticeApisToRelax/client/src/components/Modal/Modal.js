import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

// Using props passed down from LowerHalf
function Modal({ content, setModalContent }) {

  const closeModal = () => {
    const modal = document.getElementById('defaultModal');
    modal.setAttribute('data-bs-dismiss', 'modal');
    modal.click();
  };


  return (
    // 
    <div className={`modal fade`} id="defaultModal" tabIndex="-1" aria-labelledby="defaultModalLabel">

      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-1">
          <div className="container-fluid">
            <div className="row">


              <div className="col-7">
                <div className="modal-body login-signup-parent-container">
                  {content === 'login' ? <Login setModalContent={setModalContent} closeModal={closeModal} /> : <SignUp setModalContent={setModalContent} closeModal={closeModal} />}
                </div>
              </div>
              <div className="col-5 modal-right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Modal;
