import { useContext } from "react"
import HomePageContext from "../context/HomePageContext"

function Button({ name }) {
  
    const { findId } = useContext(HomePageContext)
  
    return (
      <div>
        <button className="btn" onClick={() => findId({ name })}>{name}  </button>
      </div>
    )
  }
  
  export default Button
  