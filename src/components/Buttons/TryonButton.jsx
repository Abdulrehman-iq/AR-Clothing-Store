import React, { useState, useRef, useEffect } from 'react';
import { shirts } from '../Constants/Shirts';
import { FiCamera, FiX, FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi';

const VirtualTryOn = ({ onClose }) => {
  const [selectedShirt, setSelectedShirt] = useState(shirts[0]);
  const [triedOn, setTriedOn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const tryOnActive = useRef(false);
  const videoWindow = useRef(null);

  // Enhanced logging for debugging
  const logWithTimestamp = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  };

  useEffect(() => {
    // Initialize try-on session when component mounts
    startTryOn();
    
    return () => {
      // Clean up when component unmounts
      stopTryOn();
    };
  }, []);

  useEffect(() => {
    // When selected shirt changes, update the backend
    if (selectedShirt && tryOnActive.current && triedOn) {
      updateShirtSelection(selectedShirt.id);
    }
  }, [selectedShirt, triedOn]);

  const startTryOn = async () => {
    setIsConnecting(true);
    try {
      logWithTimestamp(`Starting try-on session with shirt: ${selectedShirt.id}`);
      
      // Check backend status first
      const statusCheck = await fetch('http://localhost:5000/check_status', {
        method: 'GET',
      }).catch(() => ({ ok: false }));
      
      if (!statusCheck.ok) {
        setBackendStatus('Backend service is unavailable.');
        throw new Error('Backend service is unavailable. Please check if the server is running.');
      }
      
      // Start the try-on session with backend
      const response = await fetch('http://localhost:5000/start_tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shirt_id: selectedShirt.id,
          shirt_path: selectedShirt.image // Send the full image path if needed
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json().catch(() => ({}));
      logWithTimestamp('Try-on session started successfully');
      logWithTimestamp(`Server response: ${JSON.stringify(data)}`);
      
      // First send the selected shirt before opening video window
      await updateShirtSelection(selectedShirt.id);
      
      // Now open video feed in a new window with the shirt ID as a parameter
      const timestamp = new Date().getTime();
      const videoUrl = `http://localhost:5000/video_feed?t=${timestamp}&shirt_id=${selectedShirt.id}`;
      
      videoWindow.current = window.open(
        videoUrl, 
        'VirtualTryOn', 
        'width=640,height=480,menubar=no,toolbar=no,location=no'
      );
      
      if (videoWindow.current) {
        videoWindow.current.focus();
        tryOnActive.current = true;
        setTriedOn(true);
        
        // Setup interval to check if window is still open
        const checkInterval = setInterval(() => {
          if (videoWindow.current && videoWindow.current.closed) {
            clearInterval(checkInterval);
            tryOnActive.current = false;
            logWithTimestamp('Video window was closed by user');
          }
        }, 1000);
      } else {
        logWithTimestamp('Failed to open video window. Pop-up might be blocked.');
        alert('Please allow pop-ups to use the Try-On feature.');
      }
    } catch (error) {
      logWithTimestamp(`Error starting try-on: ${error.message}`);
      alert(`Failed to connect: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const stopTryOn = async () => {
    tryOnActive.current = false;
    
    // Close the video window if it's still open
    if (videoWindow.current && !videoWindow.current.closed) {
      videoWindow.current.close();
    }
    
    try {
      await fetch('http://localhost:5000/stop_tryon', {
        method: 'POST',
      });
      logWithTimestamp('Try-on session stopped');
    } catch (error) {
      logWithTimestamp(`Error stopping try-on: ${error.message}`);
    }
  };

  const updateShirtSelection = async (shirtId) => {
    try {
      // Find the selected shirt object
      const shirt = shirts.find(s => s.id === shirtId);
      if (!shirt) {
        logWithTimestamp(`Shirt with ID ${shirtId} not found`);
        return false;
      }
      
      logWithTimestamp(`Updating shirt selection to: ${shirt.name} (${shirt.id})`);
      
      const response = await fetch('http://localhost:5000/set_shirt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shirt_id: shirt.id,
          shirt_name: shirt.name,
          shirt_image: shirt.image // This might not send the actual file but the URL
        }),
      });
      
      if (!response.ok) {
        logWithTimestamp(`Failed to update shirt: ${response.status}`);
        return false;
      }
      
      const result = await response.json().catch(() => ({}));
      logWithTimestamp(`Shirt update response: ${JSON.stringify(result)}`);
      
      // Check if we need to refresh the video window
      if (videoWindow.current && !videoWindow.current.closed) {
        // Update the URL with the new shirt ID to refresh the stream
        const timestamp = new Date().getTime();
        videoWindow.current.location.href = `http://localhost:5000/video_feed?t=${timestamp}&shirt_id=${shirtId}`;
      }
      
      return true;
    } catch (error) {
      logWithTimestamp(`Error updating shirt selection: ${error.message}`);
      return false;
    }
  };

  const handleNextShirt = () => {
    const currentIndex = shirts.findIndex(shirt => shirt.id === selectedShirt.id);
    const nextIndex = (currentIndex + 1) % shirts.length;
    setSelectedShirt(shirts[nextIndex]);
  };

  const handlePrevShirt = () => {
    const currentIndex = shirts.findIndex(shirt => shirt.id === selectedShirt.id);
    const prevIndex = (currentIndex - 1 + shirts.length) % shirts.length;
    setSelectedShirt(shirts[prevIndex]);
  };

  const reopenVideoWindow = async () => {
    // Close existing window if open
    if (videoWindow.current && !videoWindow.current.closed) {
      videoWindow.current.close();
    }
    
    // Send the shirt selection first to ensure it's prepared
    await updateShirtSelection(selectedShirt.id);
    
    // Open a new window with explicit shirt ID
    const timestamp = new Date().getTime();
    videoWindow.current = window.open(
      `http://localhost:5000/video_feed?t=${timestamp}&shirt_id=${selectedShirt.id}`, 
      'VirtualTryOn', 
      'width=640,height=480,menubar=no,toolbar=no,location=no'
    );
    
    if (videoWindow.current) {
      videoWindow.current.focus();
      tryOnActive.current = true;
      setTriedOn(true);
    }
  };

  // Function to test connection and upload shirt images if necessary
  const testConnection = async () => {
    try {
      // Test if the backend needs image uploads
      logWithTimestamp('Testing backend capabilities...');
      
      const checkResponse = await fetch('http://localhost:5000/check_shirts', {
        method: 'GET',
      }).catch(() => ({ ok: false }));
      
      if (checkResponse.ok) {
        const result = await checkResponse.json();
        logWithTimestamp(`Server has ${result.count} shirts registered`);
        
        if (result.count < shirts.length) {
          if (window.confirm(`The server only has ${result.count} shirts registered but you have ${shirts.length} shirts. Would you like to upload the shirt images to the server?`)) {
            // Upload missing shirts
            for (const shirt of shirts) {
              logWithTimestamp(`Registering shirt: ${shirt.name}`);
              await fetch('http://localhost:5000/register_shirt', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  shirt_id: shirt.id,
                  shirt_name: shirt.name
                  // The actual image would need to be uploaded as FormData
                }),
              });
            }
            alert('All shirts registered. Please restart the try-on session.');
          }
        }
      } else {
        logWithTimestamp('Server does not support shirt checking');
      }
      
      // Test basic functionality
      const startResponse = await fetch('http://localhost:5000/start_tryon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shirt_id: selectedShirt.id }),
      });
      
      logWithTimestamp(`Start tryOn response: ${startResponse.status}`);
      
      const setResponse = await fetch('http://localhost:5000/set_shirt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shirt_id: selectedShirt.id }),
      });
      
      logWithTimestamp(`Set shirt response: ${setResponse.status}`);
      
      alert('Connection tests completed. Check console for results.');
    } catch (error) {
      logWithTimestamp(`Test connection error: ${error.message}`);
      alert(`Test failed: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <FiX size={24} />
      </button>
      
      <div className="relative w-full max-w-4xl">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl text-white mb-4 text-center">Virtual Try-On</h2>
          
          {backendStatus && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-md">
              <p className="text-red-300 text-center">{backendStatus}</p>
            </div>
          )}
          
          {isConnecting ? (
            <div className="flex justify-center mb-6">
              <div className="flex items-center text-white">
                <FiRefreshCw className="animate-spin mr-2" />
                <span>Connecting to try-on service...</span>
              </div>
            </div>
          ) : !triedOn ? (
            <div className="flex justify-center mb-6">
              <p className="text-white text-center">
                Click below to open the Try-On video feed in a new window.
              </p>
            </div>
          ) : (
            <div className="flex justify-center mb-6">
              <p className="text-white text-center">
                The Try-On video feed is open in a separate window.<br />
                Use the controls below to select different shirts.
              </p>
            </div>
          )}
          
          <div className="flex justify-center mb-6 space-x-3">
            <button 
              onClick={reopenVideoWindow}
              disabled={isConnecting}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                        transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {triedOn ? "Reopen Video Window" : "Open Video Window"}
            </button>
            
            <button
              onClick={testConnection}
              className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
            >
              Test Connection
            </button>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center justify-center space-x-8">
              <button 
                onClick={handlePrevShirt}
                disabled={isConnecting}
                className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full
                          disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <FiChevronLeft size={24} />
              </button>
              
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={selectedShirt.image} 
                    alt={selectedShirt.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-white text-sm">{selectedShirt.name}</span>
              </div>
              
              <button 
                onClick={handleNextShirt}
                disabled={isConnecting}
                className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full
                          disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
            
            <div className="mt-6 text-white text-center max-w-md mx-auto">
              <p className="font-medium">{selectedShirt.name}</p>
              <p className="text-sm text-gray-300">{selectedShirt.description}</p>
              <p className="text-xs text-gray-400 mt-2">Shirt ID: {selectedShirt.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TryOnButton = () => {
  const [showTryOn, setShowTryOn] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowTryOn(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-primary-700
                 text-surface-light rounded-full hover:bg-primary-600
                 transition-all duration-300 hover:scale-105"
      >
        <FiCamera className="h-5 w-5" />
        <span>Try On</span>
      </button>
      
      {showTryOn && (
        <VirtualTryOn onClose={() => setShowTryOn(false)} />
      )}
    </>
  );
};

export default TryOnButton;