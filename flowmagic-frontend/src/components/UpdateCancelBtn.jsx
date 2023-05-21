import { useContext } from 'react'
import ScreenFlowContext from '../context/ScreenFlowContext'
import Button from 'react-bootstrap/Button';

function UpdateCancelBtn() {
  const { updateFlow, getUpdatedFlow } = useContext(ScreenFlowContext)

    return (
        <section id="update-flow-btn">
        <Button type="submit" className="btn submit" onClick={updateFlow}>Update Flow</Button>
        <Button type="reset" className="btn cancel">Cancel</Button>   
            
      </section>
  )
}

export default UpdateCancelBtn
