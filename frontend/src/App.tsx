import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { SignUp } from './pages/SignUp'
import { LandingPage } from './pages/LandingPage'
import { SharedBrain } from './pages/SharedBrain'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route  path="/brain/:hash" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

