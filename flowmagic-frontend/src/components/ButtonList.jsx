import { useContext } from 'react'
import ApplicatonNames from './ApplicationNames'
import Button from 'react-bootstrap/esm/Button'
import HomePageContext from '../context/HomePageContext'

function ButtonList() {
    
    const { applications } = useContext(HomePageContext)
    
  return (
    <>
          {
              applications.map((application,index) => (
                  <ApplicatonNames key={application.id } name={application.applicationName} className="btn btn-primary"></ApplicatonNames>
              ))
          }
      </>
  )
}

export default ButtonList
