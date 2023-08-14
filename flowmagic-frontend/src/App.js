import Home from "./pages/Home"
import { Route, Routes} from 'react-router-dom'
import { ApplicationDetailsProvider } from "./context/HomePageContext"
import { ScreenFlowContextProvider } from "./context/ScreenFlowContext"
import AppScreenFlow from "./pages/AppScreenFlow"
import Login from "./pages/Login"

function App() {
  
    return (
        <ApplicationDetailsProvider>
            <ScreenFlowContextProvider>
                <Routes>
                    <Route exact path ="/auth" element={<Login />}></Route>
                    <Route exact path="/applications/:companyName" element={<Home />}></Route>
                    <Route exact path="/application/*" element={<AppScreenFlow/>}></Route>
                </Routes>
                </ScreenFlowContextProvider>
        </ApplicationDetailsProvider>

  )
}

export default App
