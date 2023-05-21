import { useCallback, useContext, useEffect, useState} from "react"
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
        console.log(newNodes)
        setNodes(newNodes)
        setLoadingNodes(false)
      }
      // console.log(initialNodes)
      loadNodes();
    }, [])

    useEffect(() => {
      if (nodes) {
        console.log(nodes)
        const loadEdges = async () => {
          const newEdges = await buildEdges()
          console.log(newEdges)
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
    
    console.log(nodes)
    console.log(edges)
    updatedEdges = edges
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
        >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    )
  }



export default ScreenFlow

