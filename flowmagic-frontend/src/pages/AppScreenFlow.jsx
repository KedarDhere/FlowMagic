import { useContext, useEffect } from "react"
import Header from "../components/Header"
import ScreenFlowContext from "../context/ScreenFlowContext"
import HomePageContext from "../context/HomePageContext"
import UpdateCancelBtn from "../components/UpdateCancelBtn"
import ScreenFlow from "../components/ScreenFlow"

function AppScreenFlow() {
    const { fetchScreenFlow, fetchScreenInfo } = useContext(ScreenFlowContext)
    const { applicationName } = useContext(HomePageContext)

    useEffect(() => {
        fetchScreenFlow()
        fetchScreenInfo()
    })
    
  return (
      <div id="app-screen-flow">
          <Header />
          <div className="application-name">
              <h3>{ applicationName }</h3>
          </div>
          <div>
              <section id="screen-flow">
                  <ScreenFlow />
              </section>
              <UpdateCancelBtn />
          </div>
    </div>
  )
}

export default AppScreenFlow
