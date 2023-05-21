import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ScreenFlowContext from '../context/ScreenFlowContext'

export default function UpdateFlowPopUp() {
  const { updateFlow } = useContext(ScreenFlowContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button type="button" className="btn btn-danger" onClick={handleShow}>Cancel</Button>  
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Cancel the changes?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateFlow}>
            Cancel Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

