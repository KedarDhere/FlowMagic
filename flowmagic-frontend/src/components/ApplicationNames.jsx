import { useContext } from "react"
import HomePageContext from "../context/HomePageContext"
import Button from "react-bootstrap/Button"
function ApplicationNames({ name }) {
  
    const { findId } = useContext(HomePageContext)
  
    return (
      <div>
        <Button variant="outline-primary" className="application-names" onClick={() => findId({ name })}>{name}  </Button>
      </div>
    )
  }
  
  export default ApplicationNames
  