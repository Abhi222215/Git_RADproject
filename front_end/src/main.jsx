
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const PULISHABLE_KEY = import.meta.env.VITE_PUBLISHABLE_KEY



createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <App />
    </BrowserRouter>
)
