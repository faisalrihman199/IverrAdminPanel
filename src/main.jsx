import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { APP_Provider } from './contexts/Appcontext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <APP_Provider >
      <App />
    </APP_Provider>
  </StrictMode>,
)
