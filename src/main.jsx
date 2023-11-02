import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { WeatherContextProvider } from './context/context.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
