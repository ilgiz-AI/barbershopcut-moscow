import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { LOCATION } from '../constants';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Moscow, Tverskaya 12 coordinates
const POSITION = { lat: 55.760443, lng: 37.610081 };

function MapMarker() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={POSITION}
        onClick={() => setInfoWindowShown(true)}
      >
        <Pin background={'#c5a059'} border={'#0a0a0a'} glyphColor={'#0a0a0a'} />
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow anchor={marker} onCloseClick={() => setInfoWindowShown(false)}>
          <div className="p-2 text-background">
            <h3 className="font-serif font-bold text-lg mb-1 italic">ARISTOCRAT</h3>
            <p className="text-xs uppercase tracking-widest text-zinc-600 mb-2">{LOCATION.address}</p>
            <p className="text-xs border-t border-zinc-100 pt-2">{LOCATION.hours}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function MapSection() {
  if (!hasValidKey) {
    return (
      <section className="h-[600px] w-full relative bg-surface border-y border-white/5">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) sepia(0.5) hue-rotate(15deg)' }}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(LOCATION.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          allowFullScreen
        ></iframe>
      </section>
    );
  }

  return (
    <section className="h-[600px] w-full relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={POSITION}
          defaultZoom={15}
          mapId="ARISTOCRAT_MAP_ID"
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          colorScheme="DARK"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          <MapMarker />
        </Map>
      </APIProvider>
    </section>
  );
}
