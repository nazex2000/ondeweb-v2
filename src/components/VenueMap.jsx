import { useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
  useLoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
import toast from 'react-hot-toast';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const wrapperStyle = {
  width: '100%',
  height: '500px',
  position: 'relative',
  transform: 'translateZ(0)',
};

const searchBoxStyle = {
  position: 'absolute',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 999,
  width: '90%',
  maxWidth: '400px',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  background: '#fff',
};

const center = {
  lat: -25.9655,
  lng: 32.5832,
};

const VenueMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [venues, setVenues] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tempMarker, setTempMarker] = useState(null);
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [editingVenueId, setEditingVenueId] = useState(null);

  const mapRef = useRef();
  const autocompleteRef = useRef();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/venues`);
      setVenues(res.data);
    } catch (err) {
      console.error('❌ Failed to load venues', err);
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const name = place.name || 'Unnamed Location';
    const address = place.formatted_address || place.vicinity || '';

    setTempMarker({ lat, lng });
    setVenueName(name);
    setVenueAddress(address);

    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);
    }

    setSelected(null);
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        const name = results[0].address_components[0]?.long_name || 'Unnamed Location';

        setTempMarker({ lat, lng });
        setVenueName(name);
        setVenueAddress(address);
      }
    });
  };

  const handleSave = async () => {
    if (!venueName || !venueAddress || !tempMarker) {
      toast.error('Fill name, address, and drop a marker');
      return;
    }

    const payload = {
      name: venueName,
      address: venueAddress,
      lat: tempMarker.lat,
      lng: tempMarker.lng,
      category: 'General',
      province_id: 1,
      city_id: 1,
    };

    try {
      if (editingVenueId) {
        await axios.put(`${API_BASE_URL}/api/venues/${editingVenueId}`, payload);
        toast.success('Venue updated!');
      } else {
        await axios.post(`${API_BASE_URL}/api/venues`, payload);
        toast.success('Venue saved!');
      }

      fetchVenues();
      resetForm();
    } catch (err) {
      toast.error('Failed to save venue');
    }
  };

  const handleEdit = (venue) => {
    setVenueName(venue.name);
    setVenueAddress(venue.address);
    setTempMarker({ lat: parseFloat(venue.lat), lng: parseFloat(venue.lng) });
    setEditingVenueId(venue.id);
  };

  const handleDelete = async (venueId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/venues/${venueId}`);
      toast.success('Venue deleted');
      fetchVenues();
    } catch (err) {
      toast.error('Failed to delete venue');
    }
  };

  const resetForm = () => {
    setVenueName('');
    setVenueAddress('');
    setTempMarker(null);
    setEditingVenueId(null);
  };

  if (loadError) return <p>❌ Error loading maps</p>;
  if (!isLoaded) return <p>🔄 Loading Maps...</p>;

  return (
    <>
      <div style={wrapperStyle}>
        <Autocomplete
          onLoad={(auto) => (autocompleteRef.current = auto)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input type="text" placeholder="Search a location" style={searchBoxStyle} />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          onLoad={(map) => (mapRef.current = map)}
          onClick={handleMapClick}
        >
          {venues.map((venue) => (
            <Marker
              key={venue.id}
              position={{ lat: parseFloat(venue.lat), lng: parseFloat(venue.lng) }}
              onClick={() => {
                setSelected(venue);
                setTempMarker(null);
              }}
            />
          ))}

          {tempMarker && <Marker position={tempMarker} />}

          {selected && (
            <InfoWindow
              position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h3>{selected.name}</h3>
                <p>{selected.address}</p>
                <p>{selected.category}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      <div className="p-4 space-y-2">
        {tempMarker && (
          <>
            <input
              type="text"
              className="border px-2 py-1 w-full"
              placeholder="Venue name"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
            <input
              type="text"
              className="border px-2 py-1 w-full"
              placeholder="Address"
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingVenueId ? 'Update Venue' : 'Save Venue'}
            </button>
          </>
        )}

        {venues.map((v) => (
          <div key={v.id} className="border p-2 rounded shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold">{v.name}</p>
              <p className="text-sm">{v.address}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(v)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(v.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VenueMap;