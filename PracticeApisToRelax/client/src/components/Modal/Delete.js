import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import { useEffect, useState } from 'react';



function Delete( {message, showModal, onClick}) {
    const [show, setShow] = useState(showModal);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const accept = () => {
        onClick()
    }
    

    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} >Close</Button>
            <Button variant="secondary" onClick={accept} >Okay</Button>
          </Modal.Footer>
        </Modal>
      );

}

export default Delete;