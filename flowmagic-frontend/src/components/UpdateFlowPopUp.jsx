import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ScreenFlowContext from '../context/ScreenFlowContext'

export default function UpdateFlowPopUp() {
  const { updateFlow } = useContext(ScreenFlowContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refreshPage = ()=>{
    window.location.reload();
  }

  return (
    <>
      <Button variant="primary" className="btn btn-success" onClick={handleShow}>
        Update Flow
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Save Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to save the changes?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            updateFlow()
            handleClose()
            // refreshPage()
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

