
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/react'
import App from './App.jsx'
import store from './redux/store.js'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const renderApp = () => {
  if (!PUBLISHABLE_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <div className="max-w-xl w-full bg-white border border-red-200 rounded-xl p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-red-700 mb-4">Clerk publishable key missing</h1>
          <p className="text-sm text-slate-700 leading-6">
            Add a `VITE_CLERK_PUBLISHABLE_KEY` value to `front_end/.env` or copy `.env.example` to `.env` and set your Clerk publishable key.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      {renderApp()}
    </BrowserRouter>
  </Provider>
)

