import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Panel} from 'reactflow'
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Flow Magic User Guidelines:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Welcome to Flow Magic! Please follow the guidelines below to ensure smooth navigation and operation.</h5><br></br>
        <div id = "popup-container">
            <div>
                  1. <strong>Adjusting the Flow:</strong> Simply drag and drop screens and arrows to modify the flow as needed. Remember, you can position these elements wherever suits your flow best.
            </div>
            <br></br>
                  
            <div>
                2. <strong>Removing Connections:</strong>In case a connection needs to be removed, select the edge that corresponds to this connection and hit the 'Escape' key on your keyboard.
            </div>
                  <br></br>
                  
            <div>
                3. <strong>Saving the Flow:</strong> Once you're satisfied with your adjustments, don't forget to save your work. Click the 'Update Flow' button to ensure your new screen flow is stored.           
            </div>
                  <br></br>
                  
            <div>    
                4. <strong>Deleting Screens:</strong> Please note, you cannot delete screens outright, but you can remove the edges, i.e., the connections between screens. Use the edge removal process mentioned above to do this.
            </div>
            <br></br>
                  
            <div>
                5. <strong>Viewing Active Flow:</strong> To view the currently active flow, especially after making and saving changes, click the 'Reload' button. This will refresh your view to display the updated flow.
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Help() {
  const [modalShow, setModalShow] = React.useState(false);

  const refreshPage = ()=>{
    window.location.reload();
}

  return (
    <>
      <div className='grid-buttons'>
        <Button position="top-right" className="btn btn-info grid-buttons" onClick={() => setModalShow(true)}>Info</Button>

        {<Button position="top-right" className="btn btn-primary grid-buttons" onClick={refreshPage} >Reload</Button>}
      </div>

      
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
