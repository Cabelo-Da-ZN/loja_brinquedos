import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
// ESTA LINHA É OBRIGATÓRIA PARA O BANNER FUNCIONAR:
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)