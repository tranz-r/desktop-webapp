"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

interface MapboxMapProps {
  originAddress?: string;
  destinationAddress?: string;
  className?: string;
  onDistanceUpdate?: (distanceMiles: number) => void;
}

interface MapRouteData {
  coordinates: Array<{ longitude: number; latitude: number }>;
  distanceMiles: number;
  durationMinutes: number;
  origin: { longitude: number; latitude: number; address: string };
  destination: { longitude: number; latitude: number; address: string };
}

export default function MapboxMap({ originAddress, destinationAddress, className, onDistanceUpdate }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routeData, setRouteData] = useState<MapRouteData | null>(null);

  // Get Mapbox token from environment variables
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Initialize map
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    const initializeMap = async () => {
      try {
        const mapboxgl = await import('mapbox-gl');
        mapboxgl.default.accessToken = mapboxToken;

        map.current = new mapboxgl.default.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-0.1276, 51.5074],
          zoom: 10,
          projection: 'mercator'
        });

        map.current.on('load', () => {
          console.log('Map loaded successfully');
          console.log('Map style loaded:', map.current.isStyleLoaded());
          setIsLoaded(true);
          
          // Always wait for styledata event to ensure style is fully loaded
          map.current.once('styledata', () => {
            console.log('Style data loaded, map ready for elements');
          });
        });

        map.current.on('error', (e: any) => {
          console.error('Map error:', e);
          setError('Failed to load map');
        });

      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
      }
    };

    initializeMap();
  }, [mapboxToken]);

  // Fetch route data
  useEffect(() => {
    if (!isLoaded || !originAddress || !destinationAddress) return;

    const fetchRoute = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5247';
        const url = new URL(`${apiBaseUrl}/api/v1/map/route`);
        url.searchParams.set('originAddress', originAddress);
        url.searchParams.set('destinationAddress', destinationAddress);

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data: MapRouteData = await response.json();
        console.log('Route data received:', data);
        setRouteData(data);
        setError(null);
        
        // Pass distance back to parent component
        if (onDistanceUpdate && data.distanceMiles) {
          onDistanceUpdate(data.distanceMiles);
        }
      } catch (err) {
        console.error('Route fetch error:', err);
        setError('Failed to load route');
      }
    };

    fetchRoute();
  }, [isLoaded, originAddress, destinationAddress]);

  // Draw route
  useEffect(() => {
    if (!map.current || !isLoaded || !routeData) return;

    const drawRoute = async () => {
      try {
        // Ensure style is loaded before adding elements
        if (!map.current.isStyleLoaded()) {
          console.log('Waiting for style to load before drawing route...');
          map.current.once('styledata', () => {
            console.log('Style loaded, now drawing route');
            drawRouteElements();
          });
          return;
        }

        drawRouteElements();
      } catch (err) {
        console.error('Error drawing route:', err);
      }
    };

    const drawRouteElements = async () => {
      try {
        // Clear existing layers
        if (map.current.getLayer('route')) {
          console.log('Removing existing route layer');
          map.current.removeLayer('route');
        }
        if (map.current.getSource('route')) {
          console.log('Removing existing route source');
          map.current.removeSource('route');
        }

        // Create GeoJSON
        const coordinates = routeData.coordinates.map(coord => [coord.longitude, coord.latitude]);
        
        const routeGeoJSON = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        };

        console.log('Adding route with coordinates:', coordinates.length);

        // Add source
        map.current.addSource('route', {
          type: 'geojson',
          data: routeGeoJSON
        });

        // Add layer
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
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

        // Add markers for pickup and delivery locations
        const mapboxgl = await import('mapbox-gl');
        
        // Clear existing markers
        const existingMarkers = document.querySelectorAll('.mapbox-marker');
        existingMarkers.forEach(marker => marker.remove());
        
        // Add pickup marker (origin) - Blue
        const pickupMarker = new mapboxgl.default.Marker({ 
          color: '#3b82f6', // Blue color
          scale: 1.2
        })
          .setLngLat([routeData.origin.longitude, routeData.origin.latitude])
          .addTo(map.current);
        
        // Add delivery marker (destination) - Red  
        const deliveryMarker = new mapboxgl.default.Marker({ 
          color: '#ef4444', // Red color
          scale: 1.2
        })
          .setLngLat([routeData.destination.longitude, routeData.destination.latitude])
          .addTo(map.current);

        console.log('Markers added - Blue (pickup), Red (delivery)');

        // Fit bounds to show both points
        const bounds = new mapboxgl.default.LngLatBounds();
        bounds.extend([routeData.origin.longitude, routeData.origin.latitude]);
        bounds.extend([routeData.destination.longitude, routeData.destination.latitude]);
        map.current.fitBounds(bounds, { padding: 50 });

        console.log('Bounds set to show route with markers');

      } catch (err) {
        console.error('Error in drawRouteElements:', err);
      }
    };

    drawRoute();
  }, [isLoaded, routeData]);

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Route Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <div className="text-center text-gray-600">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Route Map
          {routeData && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({Math.round(routeData.distanceMiles)} miles, {Math.round(routeData.durationMinutes)} min)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64 rounded-lg overflow-hidden border">
          <div 
            ref={mapContainer} 
            className="w-full h-full"
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
              <div className="text-center text-gray-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm">Loading map...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}