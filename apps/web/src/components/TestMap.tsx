"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    console.log('Mapbox token exists:', !!mapboxToken);
    console.log('Mapbox token preview:', mapboxToken ? `${mapboxToken.substring(0, 10)}...` : 'none');
    
    if (!mapboxToken) {
      setError('No Mapbox token found in environment variables');
      return;
    }

    const initializeMap = async () => {
      try {
        console.log('Starting map initialization...');
        const mapboxgl = await import('mapbox-gl');
        console.log('Mapbox GL imported successfully');
        
        mapboxgl.default.accessToken = mapboxToken;
        console.log('Access token set');

        map.current = new mapboxgl.default.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-0.1276, 51.5074],
          zoom: 10,
          projection: 'mercator'
        });

        console.log('Map instance created');

        map.current.on('load', () => {
          console.log('Map loaded successfully');
          console.log('Map style loaded:', map.current.isStyleLoaded());
          setIsLoaded(true);
          
          // Always wait for styledata event to ensure style is fully loaded
          map.current.once('styledata', () => {
            console.log('Style data loaded, adding elements...');
            console.log('Map style loaded after styledata:', map.current.isStyleLoaded());
            addMapElements();
          });
        });

        const addMapElements = () => {
          console.log('Adding map elements...');
          
          // Add markers first to verify coordinates
          const londonMarker = new mapboxgl.default.Marker({ color: 'red' })
            .setLngLat([-0.1276, 51.5074])
            .addTo(map.current);
            
          const manchesterMarker = new mapboxgl.default.Marker({ color: 'blue' })
            .setLngLat([-2.2426, 53.4808])
            .addTo(map.current);
            
          console.log('Markers added at London (red) and Manchester (blue)');
          
          // Clear existing source and layer first
          if (map.current.getLayer('test-route')) {
            console.log('Removing existing test-route layer');
            map.current.removeLayer('test-route');
          }
          if (map.current.getSource('test-route')) {
            console.log('Removing existing test-route source');
            map.current.removeSource('test-route');
          }
          
          // Add route line
          const routeData = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [-0.1276, 51.5074], // London
                [-2.2426, 53.4808]  // Manchester
              ]
            }
          };
          
          console.log('Adding route source with data:', routeData);
          
          map.current.addSource('test-route', {
            type: 'geojson',
            data: routeData
          });

          console.log('Adding route layer...');
          
          map.current.addLayer({
            id: 'test-route',
            type: 'line',
            source: 'test-route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#ff0000',
              'line-width': 8,
              'line-opacity': 1
            }
          });

          console.log('Route layer added successfully');
          
          // Verify the layer was added
          setTimeout(() => {
            const layerExists = map.current.getLayer('test-route');
            const sourceExists = map.current.getSource('test-route');
            console.log('Verification - Layer exists:', !!layerExists);
            console.log('Verification - Source exists:', !!sourceExists);
            if (sourceExists) {
              console.log('Source data:', sourceExists._data);
            }
          }, 500);
          
          // Fit bounds to show both points
          const bounds = new mapboxgl.default.LngLatBounds();
          bounds.extend([-0.1276, 51.5074]); // London
          bounds.extend([-2.2426, 53.4808]); // Manchester
          map.current.fitBounds(bounds, { padding: 50 });
          
          console.log('Bounds set to show London to Manchester');
        };

        map.current.on('error', (e: any) => {
          console.error('Map error:', e);
          setError(`Map error: ${e.error?.message || 'Unknown error'}`);
        });

      } catch (error) {
        console.error('Error initializing map:', error);
        setError(`Initialization error: ${error}`);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-96 border border-red-500 bg-red-50 p-4">
        <h3 className="text-red-800 font-bold">Map Error</h3>
        <p className="text-red-600">{error}</p>
        <p className="text-sm text-red-500 mt-2">
          Check your NEXT_PUBLIC_MAPBOX_TOKEN environment variable
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 border relative overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm">Loading test map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
