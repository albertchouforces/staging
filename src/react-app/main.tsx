import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/react-app/App.tsx'
import '@/react-app/index.css'

// Function to handle service worker registration and updates
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && 'caches' in window) {
    try {
      // Register service worker with cache control
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        updateViaCache: 'none'
      })

      // Check for updates immediately
      await registration.update()

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, reload automatically
              window.location.reload()
            }
          })
        }
      })

      console.log('ServiceWorker registered successfully')
    } catch (error) {
      console.log('ServiceWorker registration failed, continuing without offline support:', error)
    }
  }
}

// Clear localStorage if version mismatch
const handleVersionCheck = () => {
  const currentVersion = '1.0.1' // Update this when deploying new versions
  const storedVersion = localStorage.getItem('appVersion')
  
  if (storedVersion !== currentVersion) {
    // Clear all localStorage data
    localStorage.clear()
    // Set new version
    localStorage.setItem('appVersion', currentVersion)
  }
}

// Initialize app with proper cache and version control
const initializeApp = async () => {
  // Check version and clear cache if needed
  handleVersionCheck()
  
  // Register service worker
  await registerServiceWorker()
  
  // Mount app
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

initializeApp()
