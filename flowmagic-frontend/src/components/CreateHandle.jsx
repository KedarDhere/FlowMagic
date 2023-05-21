import { Handle, Position } from 'reactflow'

function CreateHandle({ data, index }) {
    let position = Position.Right
    if (data.position === 'Right') {
        position = Position.Right
    } else {
        position = Position.Left
    }
    return (
    <div>
          <Handle
              type={data.type}
              position={position}
              id={data.id}
              style={{top: (index  + 1)* 50}}
          > {data.portName}
          </Handle>        
    </div>
  )
}

export default CreateHandle
