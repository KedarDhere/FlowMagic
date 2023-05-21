import CreateHandle from './CreateHandle';


function CustomNode({ data}) {
  return (
    <div className='custom-node'>
          <div className="custom-node-header">{data.label}</div>
        <div>   
                
              {/* <Handle type="source" position={Position.Right} id="Home.Login">{ data.ports[0]}</Handle>
              <Handle type="source" position={Position.Right} id="Home.SignUp" style={handleStyle}>{ data.ports[1]}</Handle>
              <Handle type="source" position={Position.Right} id="Home.RandomPage" style={{ top: 180 }}>{ data.ports[2]}</Handle> */}
              {
                  data.handleData.map((handle, index) => (
                      
                       <CreateHandle data={handle} index={index} key={index}></CreateHandle>
                      
                  ))
              }
              
        </div>
    </div>
  )
}

export default CustomNode
