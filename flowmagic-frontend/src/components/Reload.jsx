import { Panel } from "reactflow";
function Reload() {
    const refreshPage = ()=>{
        window.location.reload();
    }
    
  return (
    <div>
      {/* <Button position="bottom-center" className="btn btn-primary" onClick={ refreshPage }>Reload</Button> */}
      {<Panel position="top-right" className="btn btn-primary" onClick={refreshPage} >Reload</Panel>}
    </div>
  )
}

export default Reload
