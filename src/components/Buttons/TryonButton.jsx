import React, { useState, useRef, useEffect } from 'react';
import { shirts } from '../Constants/Shirts';
import { FiCamera, FiX, FiChevronLeft, FiChevronRight, FiRefreshCw, FiSliders } from 'react-icons/fi';

const VirtualTryOn = ({ onClose }) => {
  const [selectedShirt, setSelectedShirt] = useState(shirts[0]);
  const [triedOn, setTriedOn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [measurementProgress, setMeasurementProgress] = useState(0);
  const [availableShirts, setAvailableShirts] = useState([]);
  const [measurementComplete, setMeasurementComplete] = useState(false);
  const [measurements, setMeasurements] = useState({});
  const [fitStyle, setFitStyle] = useState('regular');
  const tryOnActive = useRef(false);
  const videoWindow = useRef(null);
  const statusInterval = useRef(null);

  // Enhanced logging for debugging
  const logWithTimestamp = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  };

  useEffect(() => {
    // Check available shirts from backend when component mounts
    checkAvailableShirts();
    
    // Initialize try-on session with measurement phase
    startMeasurement();
    
    return () => {
      // Clean up when component unmounts
      stopTryOn();
      if (statusInterval.current) {
        clearInterval(statusInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    // When selected shirt changes, update the backend (only after measurement phase)
    if (selectedShirt && tryOnActive.current && triedOn && !isMeasuring) {
      updateShirtSelection(selectedShirt.id);
    }
  }, [selectedShirt, triedOn, isMeasuring]);

  // Check which shirts are available on the backend
  const checkAvailableShirts = async () => {
    try {
      const response = await fetch('http://localhost:5000/check_shirts');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch available shirts: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.shirts && data.shirts.length > 0) {
        setAvailableShirts(data.shirts);
        logWithTimestamp(`Found ${data.shirts.length} shirts on backend`);
        
        // Match frontend shirts with backend shirts if possible
        const backendShirtIds = data.shirts.map(s => s.id);
        const matchedShirts = shirts.filter(s => backendShirtIds.includes(s.id));
        
        if (matchedShirts.length > 0) {
          // Use the first matched shirt as selected
          setSelectedShirt(matchedShirts[0]);
          logWithTimestamp(`Set initial shirt to: ${matchedShirts[0].id}`);
        }
      }
    } catch (error) {
      logWithTimestamp(`Error checking available shirts: ${error.message}`);
      setBackendStatus('Error connecting to backend service. Please ensure the server is running.');
    }
  };

  // Start the measurement phase
  const startMeasurement = async () => {
    setIsConnecting(true);
    setIsMeasuring(true);
    setMeasurementProgress(0);
    
    try {
      // Check backend status first
      const statusCheck = await fetch('http://localhost:5000/check_status', {
        method: 'GET',
      }).catch(() => ({ ok: false }));
      
      if (!statusCheck.ok) {
        setBackendStatus('Backend service is unavailable.');
        throw new Error('Backend service is unavailable. Please check if the server is running.');
      }
      
      // Start the measurement session
      const response = await fetch('http://localhost:5000/start_measurement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: 'frontend-session'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json().catch(() => ({}));
      logWithTimestamp('Measurement session started successfully');
      
      // Now open video feed in a new window
      const timestamp = new Date().getTime();
      const videoUrl = `http://localhost:5000/video_feed?t=${timestamp}&session_id=frontend-session`;
      
      videoWindow.current = window.open(
        videoUrl, 
        'VirtualTryOn', 
        'width=960,height=720,menubar=no,toolbar=no,location=no'
      );
      
      if (videoWindow.current) {
        videoWindow.current.focus();
        tryOnActive.current = true;
        setTriedOn(true);
        
        // Start polling for measurement status
        if (statusInterval.current) {
          clearInterval(statusInterval.current);
        }
        
        statusInterval.current = setInterval(async () => {
          try {
            const statusResponse = await fetch('http://localhost:5000/get_measurements');
            const statusData = await statusResponse.json();
            
            if (statusData.measurement_complete) {
              // Measurements are complete
              clearInterval(statusInterval.current);
              setIsMeasuring(false);
              setMeasurementComplete(true);
              
              // Store the measurements
              if (statusData.measurements) {
                setMeasurements(statusData.measurements);
              }
              
              logWithTimestamp('Measurement phase completed. Switching to try-on.');
              
              // Select initial shirt after measurement phase is done
              updateShirtSelection(selectedShirt.id);
              
              // Set the fit style
              updateFitStyle(fitStyle);
            } else {
              // Check if we have frames progress info
              if (statusData.frames_progress) {
                setMeasurementProgress(statusData.frames_progress);
              }
              
              // Update measurements as they come in (partial updates during measurement)
              if (statusData.measurements && Object.keys(statusData.measurements).length > 0) {
                setMeasurements(statusData.measurements);
              }
            }
          } catch (error) {
            logWithTimestamp(`Error checking measurement status: ${error.message}`);
          }
        }, 1000);
        
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
      logWithTimestamp(`Error starting measurement: ${error.message}`);
      alert(`Failed to connect: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  // Stop the try-on session
  const stopTryOn = async () => {
    tryOnActive.current = false;
    
    // Close the video window if it's still open
    if (videoWindow.current && !videoWindow.current.closed) {
      videoWindow.current.close();
    }
    
    // Clear intervals
    if (statusInterval.current) {
      clearInterval(statusInterval.current);
    }
    
    try {
      await fetch('http://localhost:5000/stop_measurement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: 'frontend-session'
        }),
      });
      logWithTimestamp('Try-on session stopped');
    } catch (error) {
      logWithTimestamp(`Error stopping try-on: ${error.message}`);
    }
  };

  // Skip the measurement phase
  const skipMeasurement = async () => {
    try {
      const response = await fetch('http://localhost:5000/skip_measurement', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to skip measurement: ${response.status}`);
      }
      
      setIsMeasuring(false);
      setMeasurementComplete(true);
      if (statusInterval.current) {
        clearInterval(statusInterval.current);
      }
      
      // Select initial shirt after skipping measurement
      updateShirtSelection(selectedShirt.id);
      updateFitStyle(fitStyle);
      
      logWithTimestamp('Measurement phase skipped. Switching to try-on.');
    } catch (error) {
      logWithTimestamp(`Error skipping measurement: ${error.message}`);
    }
  };

  // Update the selected shirt on the backend
  const updateShirtSelection = async (shirtId) => {
    try {
      // Find the selected shirt object
      const shirt = shirts.find(s => s.id === shirtId);
      if (!shirt) {
        logWithTimestamp(`Shirt with ID ${shirtId} not found`);
        return false;
      }
      
      logWithTimestamp(`Updating shirt selection to: ${shirt.name} (${shirt.id})`);
      
      const response = await fetch('http://localhost:5000/select_shirt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shirt_id: shirt.id,
          session_id: 'frontend-session'
        }),
      });
      
      if (!response.ok) {
        logWithTimestamp(`Failed to update shirt: ${response.status}`);
        return false;
      }
      
      const result = await response.json().catch(() => ({}));
      logWithTimestamp(`Shirt update response: ${JSON.stringify(result)}`);
      
      return true;
    } catch (error) {
      logWithTimestamp(`Error updating shirt selection: ${error.message}`);
      return false;
    }
  };

  // Update the fit style on the backend
  const updateFitStyle = async (style) => {
    try {
      setFitStyle(style);
      
      const response = await fetch('http://localhost:5000/set_fit_style', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fit_style: style
        }),
      });
      
      if (!response.ok) {
        logWithTimestamp(`Failed to update fit style: ${response.status}`);
        return false;
      }
      
      logWithTimestamp(`Fit style updated to: ${style}`);
      return true;
    } catch (error) {
      logWithTimestamp(`Error updating fit style: ${error.message}`);
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

  const restartMeasurement = async () => {
    // Close existing window if open
    if (videoWindow.current && !videoWindow.current.closed) {
      videoWindow.current.close();
    }
    
    // Clear intervals
    if (statusInterval.current) {
      clearInterval(statusInterval.current);
    }
    
    // Restart the measurement process
    await fetch('http://localhost:5000/reset_measurement', {
      method: 'POST',
    });
    
    // Reset state and start again
    setIsMeasuring(true);
    setMeasurementComplete(false);
    setMeasurementProgress(0);
    setMeasurements({});
    startMeasurement();
  };

  const reopenVideoWindow = async () => {
    // Close existing window if open
    if (videoWindow.current && !videoWindow.current.closed) {
      videoWindow.current.close();
    }
    
    if (isMeasuring) {
      // If in measurement phase, restart measurement
      startMeasurement();
    } else {
      // If in try-on phase, just reopen the window with current shirt
      await updateShirtSelection(selectedShirt.id);
      
      // Open a new window
      const timestamp = new Date().getTime();
      videoWindow.current = window.open(
        `http://localhost:5000/video_feed?t=${timestamp}&session_id=frontend-session`, 
        'VirtualTryOn', 
        'width=960,height=720,menubar=no,toolbar=no,location=no'
      );
      
      if (videoWindow.current) {
        videoWindow.current.focus();
        tryOnActive.current = true;
        setTriedOn(true);
      }
    }
  };

  // Helper function to get the status message
  const getMeasurementStatusMessage = () => {
    if (!isMeasuring) return "Measurements complete!";
    if (measurementProgress >= 90) return "Almost done...";
    if (measurementProgress >= 50) return "Hold still, measuring...";
    if (measurementProgress >= 20) return "Keep standing in T-pose...";
    return "Please stand in T-pose";
  };

  // Format measurements for display
  const renderMeasurements = () => {
    if (!measurements || Object.keys(measurements).length === 0) {
      return <p className="text-gray-400">No measurements available yet</p>;
    }
    
    // Map of measurement keys to user-friendly labels
    const measurementLabels = {
      'shoulder_width': 'Shoulder Width',
      'chest_width': 'Chest Width',
      'waist_width': 'Waist Width',
      'torso_length': 'Torso Length',
      'right_arm_length': 'Right Arm Length',
      'left_arm_length': 'Left Arm Length',
      'neck_width': 'Neck Width',
      'neck_height': 'Neck Height'
    };
    
    return (
      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(measurements).map(([key, value]) => {
          // Skip pixel measurements or internal keys
          if (key.endsWith('_px')) return null;
          
          const label = measurementLabels[key] || key;
          return (
            <div key={key} className="flex justify-between">
              <span className="text-gray-300">{label}:</span>
              <span className="text-white font-medium">{typeof value === 'number' ? value.toFixed(1) : value} inches</span>
            </div>
          );
        })}
      </div>
    );
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
          <h2 className="text-2xl text-white mb-4 text-center">
            {isMeasuring 
              ? "Body Measurement" 
              : "Virtual Try-On"}
          </h2>
          
          {backendStatus && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-md">
              <p className="text-red-300 text-center">{backendStatus}</p>
            </div>
          )}
          
          {isConnecting ? (
            <div className="flex justify-center mb-6">
              <div className="flex items-center text-white">
                <FiRefreshCw className="animate-spin mr-2" />
                <span>Connecting to service...</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mb-6">
              {isMeasuring ? (
                <>
                  <p className="text-white text-center mb-4">
                    {getMeasurementStatusMessage()}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full max-w-md h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${measurementProgress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-blue-300 mt-2">
                    Stand still until the measurement completes
                  </p>
                  
                  <button 
                    onClick={skipMeasurement}
                    className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                              transition-colors"
                  >
                    Skip Measurement
                  </button>
                </>
              ) : (
                <p className="text-white text-center">
                  Measurements complete! Choose different shirts to try on.
                </p>
              )}
            </div>
          )}
          
          <div className="flex justify-center mb-6 space-x-4">
            <button 
              onClick={reopenVideoWindow}
              disabled={isConnecting}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                        transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {triedOn ? "Reopen Video Window" : "Open Video Window"}
            </button>
            
            {!isMeasuring && (
              <button 
                onClick={restartMeasurement}
                disabled={isConnecting}
                className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 
                          transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                Retake Measurements
              </button>
            )}
          </div>
          
          {/* Measurements Display */}
          {!isMeasuring && Object.keys(measurements).length > 0 && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg max-w-md mx-auto mb-6">
              <h3 className="text-white text-lg mb-2">Your Measurements</h3>
              {renderMeasurements()}
            </div>
          )}
          
          {/* Fit Style Selector - Only enabled after measurement */}
          {!isMeasuring && (
            <div className="mt-4 mb-6">
              <p className="text-white text-sm mb-2">Fit Preference:</p>
              <div className="flex space-x-2 justify-center">
                {['slim', 'regular', 'loose'].map(style => (
                  <button
                    key={style}
                    onClick={() => updateFitStyle(style)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors
                              ${fitStyle === style 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Shirt Selection */}
          <div className={`mt-8 ${isMeasuring ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-center space-x-8">
              <button 
                onClick={handlePrevShirt}
                disabled={isConnecting || isMeasuring}
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
                disabled={isConnecting || isMeasuring}
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