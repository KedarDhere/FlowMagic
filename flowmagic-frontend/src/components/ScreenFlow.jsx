import { useCallback, useContext, useEffect, useState} from "react"
import ReactFlow, {
        useNodesState,
        useEdgesState,
        addEdge,
        Controls,
        Background,
        Position,
} from "reactflow"
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import ScreenFlowContext from "../context/ScreenFlowContext"

export let updatedEdges = []

const initialNodes = [
  { id: "Home", position: { x: 0, y: 0 }, data: { label: "Home", position: Position.Right, ports: ["Login", "SignUp"]},type: 'customNode'},
  { id: "Login", position: { x: 500, y: 0 }, data: { label: "Login"} },
  { id: "SignUp", position: { x: 500, y: 100 }, data: { label: "SignUp"} },
  { id: "RandomPage", position: { x: 500, y: 200 }, data: { label: "RandomPage" } },
]


let initialEdges = [
  // {id:"Home.Login", source: "Home", target:"Login", sourceHandle: 'Home.Login'},
  // {id:"Home.SignUp", source: "Home", target:"SignUp", sourceHandle:'Home.SignUp'},
  // {id:"Home.RandomPage", source: "Home", target:"RandomPage", sourceHandle:'Home.RandomPage'},
]

const nodeTypes = {
  customNode: CustomNode
}

  function ScreenFlow() {  
    const { buildEdges } = useContext(ScreenFlowContext)  
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    // useEffect(() => {     
    //   const newEdges = buildEdges()
    //   setEdges(newEdges)
    //   console.log(newEdges)
    // }, []) 
    const [loading, setLoading] = useState(true);

    useEffect(() => {     
        const loadEdges = async () => {
          const newEdges = await buildEdges();
          setEdges(newEdges);
          setLoading(false);
        }
        loadEdges();
    }, [])

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

    // if (initialEdges.length === 0) {
    //   console.log("Test")   
    //   return <>Still loading...</>
    // }
    if (loading) {
      return <>Still loading...</>
    }

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

