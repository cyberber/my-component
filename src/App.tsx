import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import Button from './components/Button/button';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1>HELLO WORLD</h1>
    <h2>HELLO WORLD</h2>
    <h3>HELLO WORLD</h3>
    <h4>HELLO WORLD</h4>
    <h5>HELLO WORLD</h5>
    <Button>hellow</Button>
    <Button size="small" type="primary">test</Button>
  </React.StrictMode>,
)
