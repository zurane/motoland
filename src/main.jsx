import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Search from './components/Search.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < App />
  </StrictMode>,
)
