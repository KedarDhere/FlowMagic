import { createContext, useState } from "react"
import { updatedEdges } from "../components/ScreenFlow"

const ScreenFlowContext = createContext()

export const ScreenFlowContextProvider = ({ children }) => {
    const [applicationScreenFlow, setApplicationScreenFlow] = useState([])
    const [screenInfo, setScreenInfo] = useState([])

    const fetchScreenFlow = async () => {
        try {
        const response = await fetch(`http://localhost:8000/applications/66ceb688-a2b3-11ed-a8fc-0242ac120002/screenFlow`, {
            headers: {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc5NzA2NzQ2LCJleHAiOjE3MTEyNDI3NDZ9.BJs3Eiy1e2kaAGhql8R_sEPOxcIaPT0LfNqR4OKR00s'
            }
        })

        if (!response.ok) {
            throw Error
        }
            const data = await response.json()
            setApplicationScreenFlow(data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchScreenInfo = async () => {
        try {
            const response = await fetch("http://localhost:8000/applications/66ceb688-a2b3-11ed-a8fc-0242ac120002/screens", {
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc5NzA2NzQ2LCJleHAiOjE3MTEyNDI3NDZ9.BJs3Eiy1e2kaAGhql8R_sEPOxcIaPT0LfNqR4OKR00s'
                }
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
        // console.log("TEsts")
        // console.log(updatedScreenFlow.applicationScreenFlow)
        //Change the ScreenFlow on the basis of edges and sourceHandle(portName)
        updatedScreenFlow.applicationScreenFlow.map((screenPort) => {
            const temp = updatedEdges.filter((flow) => flow.sourceHandle === screenPort.portName)
            if (temp.length > 0 && temp[0].sourceHandle === screenPort.portName) {
                screenPort.destinationView = temp[0].target
            }
        })
            
        // console.log(updatedScreenFlow.applicationScreenFlow)
        return updatedScreenFlow.applicationScreenFlow
    }

    const updateFlow = async () => {
        console.log("Test")
        try {
            const updatedFlowtemp = getUpdatedFlow();
            console.log(updatedFlowtemp)
            await fetch(`http://localhost:8000/applications/66ceb688-a2b3-11ed-a8fc-0242ac120002/screenFlow`, {
                method: "PUT",
                body: JSON.stringify(
                    // "applicationId": "66ceb688-a2b3-11ed-a8fc-0242ac120002",
                    getUpdatedFlow()
                
                ),
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc5NzA2NzQ2LCJleHAiOjE3MTEyNDI3NDZ9.BJs3Eiy1e2kaAGhql8R_sEPOxcIaPT0LfNqR4OKR00s',
                    'Content-Type': 'application/json'
                }
            })

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
            getUpdatedFlow
        }}>
            {children}
        </ScreenFlowContext.Provider>
    )
}
export default ScreenFlowContext
