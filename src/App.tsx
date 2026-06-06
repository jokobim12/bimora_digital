import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BerandaPage from './pages/BerandaPage'
import ProdukPage from './pages/ProdukPage'
import DetailProdukPage from './pages/DetailProdukPage'
import TentangPage from './pages/TentangPage'
import AdminDashboard from './pages/AdminDashboard'
import InvitationViewer from './pages/InvitationViewer'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BerandaPage />} />
        <Route path="/produk" element={<ProdukPage />} />
        <Route path="/produk/:id" element={<DetailProdukPage />} />
        <Route path="/tentang" element={<TentangPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/undangan/:slug" element={<InvitationViewer />} />
        {/* Redirect old paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

