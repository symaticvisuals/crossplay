import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HuddleProvider, HuddleClient } from '@huddle01/react';

 
import { init } from "@airstack/airstack-react";

init(import.meta.env.VITE_AIRSTACK_API_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
