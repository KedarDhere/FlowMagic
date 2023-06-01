import { Panel } from "reactflow";
import { BsArrowRepeat } from "react-icons/bs"; 

<i class="cil-reload"></i>
function Reload() {
    const refreshPage = ()=>{
        window.location.reload();
    }
    
  return (
    <div>
      {/* <Button position="bottom-center" className="btn btn-primary" onClick={ refreshPage }>Reload</Button> */}
      {<Panel position="top-left" className="btn btn-primary" onClick={refreshPage} ><BsArrowRepeat /></Panel>}
    </div>
  )
}

export default Reload
