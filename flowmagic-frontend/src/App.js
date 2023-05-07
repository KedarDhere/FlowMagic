import Home from "./pages/Home"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ApplicationDetailsProvider } from "./context/HomePageContext"

function App() {
    return (
        <ApplicationDetailsProvider>
            <Router>
                <Routes>
                    <Route path="/applications/:companyName" element={<Home/>}></Route>
                </Routes>
            </Router>
        </ApplicationDetailsProvider>

  )
}

export default App
