import { useContext } from 'react'
import HomePageContext from '../context/HomePageContext'
import Image from 'react-bootstrap/Image';



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
        <h3 className='company-title'>{ companyName[0].toUpperCase() + companyName.slice(1) }</h3>
      </div>
        <Image src={process.env.PUBLIC_URL + '/FlowMagic.png'} alt="Flow Magic Logo" /> 
    </div>
  )
}

export default Header
