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

// const initialNodes = [
  // // { id: "Home", position: { x: 0, y: 0 }, data: { label: "Home", position: Position.Right, ports: ["Home.Login", "Home.SignUp","Home.RandomPage"]},type: 'customNode'},
  // {
  //   id: "Home", position: { x: 0, y: 0 },
  //   data: {
  //           label: 'Home',
  //           handleData: [
  //             {
  //               type: "source", position: Position.Right, id: "Home.Login", portName: "Home.Login",
  //             },
  //             {
  //               type: "source", position: Position.Right, id: "Home.SignUp", portName: "Home.SignUp",
  //             },
  //             {
  //               type: "source", position: Position.Right, id: "Home.RandomPage", portName: "Home.RandomPage",
  //             }]
  //         },
  //   type: 'customNode',
  // },
  // {
  //   id: "Login", position: { x: 300, y: 0 },
  //   data: {
  //           label: "Login",
  //           handleData: [{
  //             type: "target", position: Position.Left, id: "Login", portName: "Login",
  //           }]
  //         },
  //   type: 'customNode',
  // },
  // {
  //   id: "SignUp", position: { x: 500, y: 100 },
  //   data: {
  //           label: "SignUp",
  //           handleData: [
  //           {
  //             type: "target", position: Position.Left, id: "SignUp", portName: "SignUp",
  //           }]
  //         },
  //   type: 'customNode',
  // },
  // {
  //   id: "RandomPage", position: { x: 700, y: 200 }, data: {
  //     label: "RandomPage",
  //     handleData:     [{
  //       type: "target", position: Position.Left, id: "RandomPage", portName: "RandomPage",
  //     }]
  //   },
  //   type: 'customNode',
  //   },
// ]
const initialNodes = []


let initialEdges = [
  // {id:"Home.Login", source: "Home", target:"Login", sourceHandle: 'Home.Login'},
  // {id:"Home.SignUp", source: "Home", target:"SignUp", sourceHandle:'Home.SignUp'},
  // {id:"Home.RandomPage", source: "Home", target:"RandomPage", sourceHandle:'Home.RandomPage'},
]

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
      if (nodes.length > 0) {
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

