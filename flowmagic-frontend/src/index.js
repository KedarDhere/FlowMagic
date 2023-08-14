import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId='387115768864-j30dm2nqndvvokgnujmrq3l6ge24vode.apps.googleusercontent.com'>
        <Router>
            <App />
        </Router>
    </GoogleOAuthProvider>)
