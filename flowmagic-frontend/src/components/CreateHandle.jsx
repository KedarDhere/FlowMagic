import { Handle, Position } from 'reactflow'
let portNamePosition = "right"

function CreateHandle({ data, index }) {
    let position = Position.Right
    if (data.position === 'Right') {
        position = Position.Right
        portNamePosition = "right"
    } else {
        position = Position.Left
        portNamePosition = "left"
    }
    return (
        <div style={{
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: portNamePosition
    }}>
          <Handle
              type={data.type}
              position={position}
              id={data.id}
              style={{ top: (index + 1) * 40 }}
          > 
            </Handle>        
            <div style={{ marginTop:"10px", marginRight:"10px", marginLeft:"10px"}}>{data.portName}</div>
    </div>
  )
}

export default CreateHandle
