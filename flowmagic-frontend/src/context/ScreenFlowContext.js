import { createContext, useState, useContext } from "react"

const ScreenFlowContext = createContext()

export const ScreenFlowContextProvider = ({ children }) => {
    const [applicationScreenFlow, setApplicationScreenFlow] = useState([])
    const [screenInfo, setScreenInfo] = useState([])

    const fetchScreenFlow = async () => {
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
    }

    const fetchScreenInfo = async () => {
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
    }

    return (
        <ScreenFlowContext.Provider value={{
            applicationScreenFlow,
            fetchScreenFlow,
            screenInfo
        }}>

        </ScreenFlowContext.Provider>
    )
}
export default ScreenFlowContext
