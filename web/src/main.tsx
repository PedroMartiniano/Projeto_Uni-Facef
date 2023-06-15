import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './reset.css'
import './index.css'

// criando um documento React para renderizar o App no index.html
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
