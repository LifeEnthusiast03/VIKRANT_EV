import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminDashboard from './admindashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminDashboard />
  </StrictMode>,
)
