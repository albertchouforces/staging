import { useEffect, useState } from 'react';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { AlertTriangle, Check, Loader } from 'lucide-react';
import { FIREBASE_CONFIGURED } from '../config/features';

export function FirebaseStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error' | 'not-configured'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkFirebaseConnection = async () => {
      if (!FIREBASE_CONFIGURED) {
        setStatus('not-configured');
        return;
      }

      try {
        const db = getFirestore();
        
        // Try to fetch a document to verify connection
        await getDocs(collection(db, 'global_scores'));
        
        // If we get here, connection is successful
        setStatus('connected');
      } catch (error) {
        console.error('Firebase connection error:', error);
        setStatus('error');
        setErrorMessage('Could not connect to Firebase. Please check your configuration.');
      }
    };

    checkFirebaseConnection();
  }, []);

  if (status === 'checking') {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Loader className="animate-spin" size={16} />
        <span>Checking Firebase connection...</span>
      </div>
    );
  }

  if (status === 'not-configured') {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
        <div className="flex items-center gap-2 text-yellow-700">
          <AlertTriangle size={20} />
          <span className="font-semibold">Firebase Not Configured</span>
        </div>
        <p className="mt-2 text-yellow-600 text-sm">
          To enable global leaderboards, follow the setup instructions in the src/config/firebase.ts file,
          then set FIREBASE_CONFIGURED to true in src/config/features.ts.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle size={20} />
          <span className="font-semibold">Firebase Connection Error</span>
        </div>
        <p className="mt-2 text-red-600 text-sm">
          {errorMessage || 'There was an error connecting to Firebase. Please check your configuration.'}
        </p>
      </div>
    );
  }

  if (status === 'connected') {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <Check size={16} />
        <span>Firebase connected</span>
      </div>
    );
  }

  return null;
}
