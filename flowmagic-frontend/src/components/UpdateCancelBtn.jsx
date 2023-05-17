import { useContext } from 'react'
import ScreenFlowContext from '../context/ScreenFlowContext'

function UpdateCancelBtn() {
  const { updateFlow, getUpdatedFlow } = useContext(ScreenFlowContext)

    return (
        <section id="update-flow-btn">
        <button type="submit" className="btn submit" onClick={updateFlow}>Update Flow</button>
        <button type="reset" className="btn cancel">Cancel</button>   
            
      </section>
  )
}

export default UpdateCancelBtn
