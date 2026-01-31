import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client"
import { HashRouter as Router } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><Router><App /></Router></React.StrictMode>);
