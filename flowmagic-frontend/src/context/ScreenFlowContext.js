import { createContext, useState, useEffect } from "react"
import { updatedEdges } from "../components/ScreenFlow"
import { format } from 'date-fns'
import { MarkerType} from 'reactflow'
const ScreenFlowContext = createContext()

export const buildEdges = async () => {
    try {
        const response = await fetch(process.env.REACT_APP_SCREEN_FLOW, {
            credentials: "include", 
        })

        if (!response.ok) {
            throw Error
        }
        const data = await response.json()
        console.log(data)
            console.log(data.applicationScreenFlow)
            const srvScreenFlow = data.applicationScreenFlow
            
            const temp = srvScreenFlow.map(element => {
            return {
                id: element.portName,
                source: element.screenName,
                target: element.destinationView,
                sourceHandle: element.portName,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                }
            }
                
            })
        // console.log(temp)
        return temp
        } catch (error) {
            console.log(error)
        }
} 

export const fetchNodesData = async() => {
    try {
        const response = await fetch(process.env.REACT_APP_NODES_INFO, {
            credentials: "include", 
        })
        if (!response.ok) {
            throw Error
        }

        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

export const ScreenFlowContextProvider = ({ children }) => {

    useEffect(() => {
        fetchScreenFlow()
        buildEdges()
        fetchNodesData()
    }, [])

    const [applicationScreenFlow, setApplicationScreenFlow] = useState([])
    const [screenInfo, setScreenInfo] = useState([])
    const [updFlowTimeStamp, setUpdFlowTimeStamp] = useState()
    const [successAlert, setSuccessAlert] = useState(false)

    const fetchScreenFlow = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_SCREEN_FLOW, {
            credentials: "include", 
        })

        if (!response.ok) {
            throw Error
        }
            const data = await response.json()
            setApplicationScreenFlow(data)
            setUpdFlowTimeStamp(data.lastUpdatedOn)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchScreenInfo = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_SCREENS_INFO, {
                credentials: "include", 
            })
            if (!response.ok) {
                throw Error
            }
            const data = await response.json()
            setScreenInfo(data)
        } catch (error) {
            console.log(error)
        }

    }

    const getUpdatedFlow = () => {
        const updatedScreenFlow = applicationScreenFlow

        //Change the ScreenFlow on the basis of edges and sourceHandle(portName)
        updatedScreenFlow.applicationScreenFlow.forEach((screenPort) => {
            const temp = updatedEdges.filter((flow) => flow.sourceHandle === screenPort.portName)
            if (temp.length > 0 && temp[0].sourceHandle === screenPort.portName) {
                screenPort.destinationView = temp[0].target
            }
        })
        updatedScreenFlow.lastUpdatedOn = format(new Date(), 'MM:dd:yyyy:HH:mm:ss')
        console.log(updatedScreenFlow)
        return updatedScreenFlow
    }

    const updateFlow = async () => {
        try {
            await fetch(process.env.REACT_APP_SCREEN_FLOW, {
                method: "PUT",
                body: JSON.stringify(
                    getUpdatedFlow(),
                ),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include", 
            })
            setUpdFlowTimeStamp(format(new Date(), 'MM:dd:yyyy:HH:mm:ss'))
            setSuccessAlert(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScreenFlowContext.Provider value={{
            applicationScreenFlow,
            fetchScreenFlow,
            screenInfo,
            fetchScreenInfo,
            currentFlow: updatedEdges,
            updateFlow,
            getUpdatedFlow,
            buildEdges,
            fetchNodesData,
            updFlowTimeStamp,
            successAlert,
            setSuccessAlert
        }}>
            {children}
        </ScreenFlowContext.Provider>
    )
}

export default ScreenFlowContext
