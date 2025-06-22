"use client";
import { useState } from 'react';
import VenueMap from './VenueMap';

import VenueList from './VenueList';

export default function AppMap() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <div style={{ padding: '10px', textAlign: 'right' }}>
        <button onClick={() => setIsAdmin(!isAdmin)}>
          🔄 Switch to {isAdmin ? 'Public View' : 'Admin View'}
        </button>
      </div>

      {isAdmin ? (
        <>
          
          <VenueList />
        </>
      ) : (
        <VenueMap />
      )}
    </div>
  );
}
