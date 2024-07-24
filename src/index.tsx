import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
const a = 2;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>{ a == 2 ? 1 : '2'}</div>
  </React.StrictMode>,
)
