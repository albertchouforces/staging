import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@/react-app/index.css';
import PlayArea from '@/react-app/components/PlayArea';
import Inventory from '@/react-app/components/Inventory';
import Practice from '@/react-app/components/Practice';
import { SignalProvider, useSignal } from '@/react-app/context/SignalContext';
import Header from '@/react-app/components/Header';
import Notification from '@/react-app/components/Notification';
import DeviceInfo from '@/react-app/components/DeviceInfo';

// Create a component to consume the context
const AppContent = () => {
  const { notification } = useSignal();
  
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <Inventory />
        </div>
        <div className="w-full lg:w-1/2">
          <PlayArea />
        </div>
        <div className="w-full lg:w-1/4">
          <Practice />
        </div>
      </div>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <DeviceInfo />
    </div>
  );
};

function App() {
  useEffect(() => {
    // Include required fonts
    const links = [
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&display=swap',
        rel: 'stylesheet',
      }
    ];
    
    // Create and append all links
    const createdLinks = links.map(linkData => {
      const link = document.createElement('link');
      link.href = linkData.href;
      link.rel = linkData.rel;
      document.head.appendChild(link);
      return link;
    });

    return () => {
      // Clean up all links
      createdLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <SignalProvider>
        <AppContent />
      </SignalProvider>
    </DndProvider>
  );
}

export default App;
