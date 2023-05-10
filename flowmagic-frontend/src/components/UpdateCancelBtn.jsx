import { useContext } from 'react'
import ScreenFlow from './ScreenFlow'

function UpdateCancelBtn() {
    return (
        <section id="update-flow-btn">
        <button type="submit" className="btn submit">Update Flow</button>
        <button type="reset" className="btn cancel">Cancel</button>   
            
      </section>
  )
}

export default UpdateCancelBtn
