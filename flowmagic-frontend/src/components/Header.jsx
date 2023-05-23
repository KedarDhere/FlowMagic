import { MdOutlineAccountCircle }  from 'react-icons/md'
import { useContext } from 'react'
import HomePageContext from '../context/HomePageContext'

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


function Header() {
    const { companyName } = useContext(HomePageContext)
  return (
      <div id='header-container'>
          <div id="user-action">
            <button className="logout">
                <MdOutlineAccountCircle size={50}></MdOutlineAccountCircle>
            </button>
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

        <Image src={process.env.PUBLIC_URL + '/FlowMagic1.png'} alt="Flow Magic Logo" /> 

    </div>
  )
}

export default Header
