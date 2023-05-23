
import { useCallback, useContext, useEffect, useState } from "react"
import ReactFlow, {
        useNodesState,
        useEdgesState,
        addEdge,
        Controls,
        Background,
} from "reactflow"
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import ScreenFlowContext from "../context/ScreenFlowContext"
import Help from '../components/Help'
import Reload from "./Reload"
export let updatedEdges = []


const initialNodes = []


let initialEdges = []

const nodeTypes = {
  customNode: CustomNode
}

  function ScreenFlow() {  
    const { buildEdges, fetchNodesData } = useContext(ScreenFlowContext)  
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const [loading, setLoading] = useState(true);
    const [loadingNodes, setLoadingNodes] = useState(true);

    useEffect(() => {     
      const loadNodes = async () => {
        const newNodes = await fetchNodesData()
        setNodes(newNodes)
        setLoadingNodes(false)
      }
      loadNodes();
    }, [])

    useEffect(() => {
      if (nodes) {
        const loadEdges = async () => {
          const newEdges = await buildEdges()
          setEdges(newEdges);
          setLoading(false);
        }
        loadEdges()
      }
    }, [nodes])

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

    if (loading || loadingNodes) {
      return <>Still loading...</>
    }
    
    updatedEdges = edges
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
        >
                <Controls/>
          <Background variant="lines" gap={12} size={1} />
          <Help />
            </ReactFlow>
        </div>
    )
  }



export default ScreenFlow

