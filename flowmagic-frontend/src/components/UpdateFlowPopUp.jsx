import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ScreenFlowContext from '../context/ScreenFlowContext'
import Alert from 'react-bootstrap/Alert';
export default function UpdateFlowPopUp() {
  const { updateFlow, successAlert, setSuccessAlert} = useContext(ScreenFlowContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refreshPage = ()=>{
    window.location.reload();
  }

  useEffect(() => {
    if (successAlert) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
        refreshPage();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successAlert, setSuccessAlert, refreshPage]);

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
            setSuccessAlert(false)
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {
        successAlert &&
          <Alert variant='success' style={{ position: 'fixed', top: 0 }}>
           Changes Saved Successfully!
          </Alert>
       
      }
    </>
  );
}

