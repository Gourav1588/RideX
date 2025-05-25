import React, { useState, useEffect } from 'react';
import Vehiclepanel from './Vehiclepanel';

const baseurl = import.meta.env.VITE_BASE_URL;

function LocationSearchPannel(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeField, setActiveField] = useState('');
   
  const [pickupValue, setPickupValue] = useState(props.from || '');
  const [destinationValue, setDestinationValue] = useState(props.destination || '');
 
    
   async function getfare(pickup, destination) {
    fetch(`${baseurl}/ride/fare?pickup=${pickup}&destination=${destination}`) 
      .then((response) => response.json())
      .then((data) => {
        console.log('Fare data:', data);
        
        
        // Handle the fare data as needed   
       if (data.success && data.data) {
      props.setFare(data.data); // ✅ Set full fare object in parent
    }
    console.log('Fare:', data.data);
        
      })
      .catch((error) => {
        console.error('Error fetching fare:', error);
        // Handle the error
      });         
  }
 

  // Fetch suggestions from API
  const fetchSuggestions = async (query) => {
    if (!query || query.trim() === '') {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseurl}/maps/get-suggestions?input=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Unable to load suggestions. Please try again.');
      setSuggestions([
        { id: 1, name: "Shree Krishna Bakery And SuperMart" },
        { id: 2, name: "Central Mall" },
        { id: 3, name: "City Hospital" },
        { id: 4, name: "Airport Terminal" },
        { id: 5, name: "Railway Station" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (activeField) {
      fetchSuggestions(searchTerm);
    }
  }, [activeField]);
  const handleSelectLocation = (location) => {
    const locationName = location.name || location;
    
    if (activeField === 'pickup') {
      setPickupValue(locationName);
      props.setFrom(locationName);
      // Update search term to show the selected location immediately
      setSearchTerm(locationName);
      // After a brief delay, clear the search term and switch to destination
      setTimeout(() => {
        setSearchTerm('');
        setActiveField('destination');
      }, 100);
    } else if (activeField === 'destination') {
      setDestinationValue(locationName);
      props.setDestination(locationName);
      // Update search term to show the selected location immediately
      setSearchTerm(locationName);
      // After a brief delay, clear the search
      setTimeout(() => {
        setSearchTerm('');
        setActiveField('');
      }, 100);
    }
    
    // Clear suggestions immediately
    setSuggestions([]);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => props.setpanelopen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <i className="ri-arrow-down-s-line text-xl"></i>
          </button>
          <h2 className="text-xl font-semibold">Enter location</h2>
        </div>
      </div>

      {/* Input Fields - Fixed */}
      <div className="p-4">
        <div className="relative flex items-start mb-6">
          {/* Pickup & Destination Points Indicator */}
          <div className="absolute left-4 flex flex-col items-center gap-1 mt-4">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="w-0.5 h-8 bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>

          {/* Input Fields */}
          <div className="flex-1 space-y-4 ml-12">
            <div className="relative">
              <label className={`text-xs text-gray-500 absolute -top-2 left-3 bg-white px-1 transition-opacity ${pickupValue ? 'opacity-100' : 'opacity-0'}`}>
                Pickup Location
              </label>
              <input
                className="w-full p-3 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                type="text"
                placeholder="Enter pickup location"
                value={activeField === 'pickup' ? searchTerm : pickupValue}
                onClick={() => {
                  setActiveField('pickup');
                  setSearchTerm(pickupValue);
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <div className="relative">
              <label className={`text-xs text-gray-500 absolute -top-2 left-3 bg-white px-1 transition-opacity ${destinationValue ? 'opacity-100' : 'opacity-0'}`}>
                Drop Location
              </label>
              <input
                className="w-full p-3 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                type="text"
                placeholder="Where to?"
                value={activeField === 'destination' ? searchTerm : destinationValue}
                onClick={() => {
                  setActiveField('destination');
                  setSearchTerm(destinationValue);
                   
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Suggestions Container */}
      <div className="flex-1 overflow-y-auto pb-24">
        {searchTerm ? (
          <div className="px-4">
            {loading && (
              <div className="flex justify-center items-center p-8">
                <div className="w-8 h-8 border-3 border-t-3 border-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 rounded-lg text-red-600 text-center">
                {error}
              </div>
            )}
            {!loading && suggestions.length > 0 && (
              <div className="space-y-2">
                {suggestions.map((location, index) => (
                  <div
                    key={location.id || index}
                    onClick={() => handleSelectLocation(location)}
                    className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 rounded-lg cursor-pointer transition-all border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-2-line text-2xl text-blue-600"></i>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{location.name || location}</div>
                      <div className="text-sm text-gray-500">Estimated 5 mins away</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && suggestions.length === 0 && (
              <div className="text-center p-8 text-gray-500">
                No locations found matching your search
              </div>
            )}
          </div>
        ) : (
          <div className="px-4">
            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-home-line text-xl text-blue-600"></i>
                  </div>
                  <span className="font-medium">Home</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-briefcase-line text-xl text-blue-600"></i>
                  </div>
                  <span className="font-medium">Work</span>
                </button>
              </div>
            </div>

            {/* Recent Locations */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-4">Recent Places</h3>
              <div className="space-y-3">
                {[
                  "Shree Krishna Bakery And SuperMart",
                  "Central Mall",
                  "City Hospital",
                  "Airport Terminal",
                  "Railway Station"
                ].map((location, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectLocation({ name: location })}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-all"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-history-line text-2xl text-gray-600"></i>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{location}</div>
                      <div className="text-sm text-gray-500">Recent search</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>


      {/* Find Trip Button - Fixed */}
      {pickupValue && destinationValue && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button
            onClick={() => {
              props.setVehiclepanel(true);
              props.setpanelopen(false);
              getfare(pickupValue, destinationValue);
              props.setFrom(pickupValue); 
              props.setDestination(destinationValue);
              props.setPickup(pickupValue);
              props.setDestination(destinationValue);
              props.setPickupValue(pickupValue);

              props.setDestinationValue(destinationValue);
              props.setActiveField(''); // Reset active field
              setSearchTerm(''); // Clear search term
              setPickupValue(''); // Clear pickup value
              setDestinationValue(''); // Clear destination value
              setSuggestions([]); // Clear suggestions
              setActiveField(''); // Reset active field
              setError(null); // Clear any error
              setLoading(false); // Reset loading state 
              
            }}
            className="w-full py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <i className="ri-taxi-line text-xl"></i>
            Find Trip
          </button>
        </div>
      )}
    </div>
  );
}

export default LocationSearchPannel;
