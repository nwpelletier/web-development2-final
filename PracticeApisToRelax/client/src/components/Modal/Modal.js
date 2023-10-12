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

      {/* Testing bootstrap/CSS to format modal */}
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-7">
                <div className="modal-body">
                  {/* simple check for whether it displays Login or SignUp (or other if we need more modals...) */}
                  {content === 'login' ? <Login setModalContent={setModalContent} closeModal={closeModal}/> : <SignUp setModalContent={setModalContent} closeModal={closeModal} />}
                </div>
              </div>
              <div className="col-5 modal-right">
                {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Modal;
