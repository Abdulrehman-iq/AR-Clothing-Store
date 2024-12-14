// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create full-width root container
const rootElement = document.getElementById('root')
rootElement.style.width = '100vw'
rootElement.style.height = '100vh'
rootElement.style.margin = '0'
rootElement.style.padding = '0'

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)