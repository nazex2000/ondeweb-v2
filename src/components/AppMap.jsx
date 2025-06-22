import React, { useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import toast from 'react-hot-toast';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '400px' };
const mapCenter = { lat: -25.9655, lng: 32.5832 };

const AppMap = () => {
  const [mapRef, setMapRef] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [marker, setMarker] = useState(null);
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [directions, setDirections] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const position = { lat, lng };
    setMarker(position);
    reverseGeocode(position);
  };

  const reverseGeocode = async ({ lat, lng }) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const res = await geocoder.geocode({ location: { lat, lng } });
      if (res.results[0]) {
        const result = res.results[0];
        setVenueName(result.address_components[0]?.long_name || 'Unnamed Venue');
        setVenueAddress(result.formatted_address || '');
      }
    } catch (err) {
      toast.error('Reverse geocoding failed');
      console.error(err);
    }
  };

  const handleGoTo = () => {
    if (!marker) return toast.error('Please select a venue location');

    if (!navigator.geolocation) {
      return toast.error('Geolocation not supported');
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const destination = marker;

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              toast.error('Failed to get directions');
              console.error('Directions request failed due to ' + status);
            }
          }
        );
      },
      () => toast.error('Failed to get your location')
    );
  };

  if (loadError) return <div>Map loading error</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="p-4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={13}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        {marker && <Marker position={marker} />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          placeholder="Venue Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={venueAddress}
          onChange={(e) => setVenueAddress(e.target.value)}
          placeholder="Venue Address"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleGoTo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go To
        </button>
      </div>
    </div>
  );
};

export default AppMap;