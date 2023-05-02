import { createContext, useState, useEffect } from 'react'

const HomePageContext = createContext()

export const ApplicationDetailsProvider = ({ children }) => {
    const [applications, setApplications] = useState([])
    const [companyName, setCompanyName] = useState(" ")
    const [clickedApplicationID, setClickedApplicationID] = useState(" ")

    useEffect(() => {
        fetchApplication()
    }, [])

    //Fetch all the registered applications
    const fetchApplication = async () => {
        try {
            const response = await fetch("http://localhost:8000/applications/amazon", {
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc5NzA2NzQ2LCJleHAiOjE3MTEyNDI3NDZ9.BJs3Eiy1e2kaAGhql8R_sEPOxcIaPT0LfNqR4OKR00s'
                }
            })
            if (!response.ok) {
                throw Error
            }
            const applications = await response.json()
            setApplications(applications.applications)
            setCompanyName(applications.companyName)
            
        } catch (error) {
            console.log(error)
        }

    }

    // Find the applicationID of the selected applicaton
    function findId({ name }) {
        const applicationID = applications.filter((application) => application.applicationName === name)
        setClickedApplicationID(applicationID[0].applicationId)
    }
    return (
        <HomePageContext.Provider value={{
            applications,
            fetchApplication,
            companyName,
            findId,
            clickedApplicationID
        }}>
            {children}
        </HomePageContext.Provider>
    )
}



export default HomePageContext