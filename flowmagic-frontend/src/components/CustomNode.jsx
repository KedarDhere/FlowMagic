import { Handle, Position } from 'reactflow'
const handleStyle = { top: 80 };

function CustomNode() {
  return (
    <div className='custom-node'>
    <div className="custom-node-header">Home</div>
    <div>
              <Handle type="source" position={Position.Right} id="Home.Login">Home.Login</Handle>
              <Handle type="source" position={Position.Right} id="Home.SignUp" style={handleStyle}>Home.SignUp</Handle>
              <Handle type="source" position={Position.Right} id="Home.RandomPage" style={{ top: 180 }}>Home.RandomPage</Handle>
    </div>
</div>
  )
}

export default CustomNode
