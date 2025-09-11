import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Firebase through importing the functions that will set up the connection
import { initializeApp } from 'firebase/app';
import firebaseConfig from './config/firebase';
import './lib/supabase';

// Ensure Firebase is initialized properly
if (firebaseConfig.apiKey) {
  initializeApp(firebaseConfig);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
