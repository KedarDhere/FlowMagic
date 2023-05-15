import { createContext, useState } from "react"
import { currentFlow } from "../components/ScreenFlow"

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

    const updateFlow = async () => {
        console.log("Test")
        try {
            await fetch(`http://localhost:8000/applications/66ceb688-a2b3-11ed-a8fc-0242ac120002/screenFlow`, {
                method: "PUT",
                body: JSON.stringify({
                    "applicationId": "66ceb688-a2b3-11ed-a8fc-0242ac120002",
                    "applicationScreenflow": currentFlow
                }),
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
            currentFlow,
            updateFlow
        }}>
            {children}
        </ScreenFlowContext.Provider>
    )
}
export default ScreenFlowContext
