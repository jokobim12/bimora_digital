import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminDashboard from './pages/AdminDashboard'
import InvitationViewer from './pages/InvitationViewer'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/undangan/:slug" element={<InvitationViewer />} />
      </Routes>
    </BrowserRouter>
  )
}
