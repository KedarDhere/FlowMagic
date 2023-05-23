import { useContext, useEffect } from "react"
import Header from "../components/Header"
import ScreenFlowContext from "../context/ScreenFlowContext"
// import HomePageContext from "../context/HomePageContext"
import ScreenFlow from "../components/ScreenFlow"
import UpdateFlowPopUp from "../components/UpdateFlowPopUp"
import CancelFlowChanges from "../components/CancelFlowChanges"


function AppScreenFlow() {
    const { fetchScreenFlow, fetchScreenInfo, updFlowTimeStamp, applicationScreenFlow } = useContext(ScreenFlowContext)
    // const { applicationName } = useContext(HomePageContext)

    useEffect(() => {
        fetchScreenFlow()
        fetchScreenInfo()
    })
  
  return (
      <div id="app-screen-flow">
          <Header />
          <div className="info-bar">
              <h4 >{applicationScreenFlow.applicationName}</h4>
              <h4 >{`Last Updated on: ${updFlowTimeStamp}`}</h4>
          </div>

          <div>
              <section id="screen-flow">
                  <ScreenFlow />
        </section>
        <div id="update-flow-btn">
              <UpdateFlowPopUp />
            <CancelFlowChanges />
        </div>
          </div>
    </div>
  )
}

export default AppScreenFlow
