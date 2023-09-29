import { useContext, useState } from 'react'
import HomePageContext from '../context/HomePageContext'
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const CircleIcon = ({ letter, OnClick }) => (
  <div
    onClick={OnClick} 
    style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
  }}>
    {letter}
  </div>
);

function Header() {
  const { companyName } = useContext(HomePageContext)
  const [show, setShow] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        credentials: "include", 
      });
  
      if (!response.ok) {
        // Handle error response (display a message, log the error, etc.)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
  
      if (jsonResponse.message === "Logout successful") {
        // If logout is successful, clear the JWT from localStorage
        localStorage.removeItem('token');
        
        // Redirect user to the authentication page (or any other page)
        window.location.href = "/auth";
      } else {
        // Handle error response (display a message, log the error, etc.)
        console.error('Logout failed');
      }
    } catch (error) {
      // Handle network error (display a message, log the error, etc.)
      console.error('Fetch failed:', error);
    }

    setShow(false) // close the modal after logout process
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id='header-container'>
      <Image src={process.env.PUBLIC_URL + '/FlowMagic.png'} alt="Flow Magic Logo" />
      <div id="user-action">
        <div className="logout">
            <CircleIcon letter="A"  OnClick={handleShow}/>
        </div>
        <h3 className='company-title'>{ companyName[0].toUpperCase() + companyName.slice(1) }</h3>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Header
