import { BsPCircleFill }  from 'react-icons/bs'
import { useContext } from 'react'
import HomePageContext from '../context/HomePageContext'

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


const CircleIcon = ({ letter }) => (
  <div style={{
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
  return (
      <div id='header-container'>
      <div id="user-action">
        <div className="logout">
            <CircleIcon letter="A"  />
        </div>
        <h3 className='company-title'>{ companyName }</h3>
      </div>
        {/* <h3 className='flow-magic'>Flow Magic</h3> */}
        {/* <Container>
                <Row>
                    <Col xs={6} md={4}>
                    <Image src={process.env.PUBLIC_URL + '/FlowMagic.png'} alt="Flow Magic Logo" />
                    </Col>
                </Row>
          </Container> */}

        <Image src={process.env.PUBLIC_URL + '/FlowMagic.png'} alt="Flow Magic Logo" /> 

    </div>
  )
}

export default Header
