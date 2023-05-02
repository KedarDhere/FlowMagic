import { useContext } from 'react'
import Button from './Button'
import HomePageContext from '../context/HomePageContext'

function ButtonList() {
    
    const { applications } = useContext(HomePageContext)
    
  return (
    <>
          {
              applications.map((application,index) => (
                  <Button key={application.applicationId } name={application.applicationName}></Button>
              ))
          }
      </>
  )
}

export default ButtonList
