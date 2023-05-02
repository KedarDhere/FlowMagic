import { MdOutlineAccountCircle }  from 'react-icons/md'
import { useContext } from 'react'
import HomePageContext from '../context/HomePageContext'

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
          <h3 className='flow-magic'>Flow Magic</h3>

    </div>
  )
}

export default Header
