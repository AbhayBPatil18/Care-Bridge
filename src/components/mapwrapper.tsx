import { useEffect, useRef } from 'react';

// Tell TypeScript that Leaflet exists globally on window
declare global { interface Window { L: any; } }

export function MapWrapper() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !window.L || mapInstance.current) return;

    // Initialize the map (Center: Bengaluru)
    mapInstance.current = window.L.map(mapRef.current).setView([12.9716, 77.5946], 12);
    
    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);
    
    // Add a hospital marker
    window.L.marker([12.9214, 77.5929]).addTo(mapInstance.current)
      .bindPopup("Apollo Hospitals, Jayanagar");

    return () => { if (mapInstance.current) mapInstance.current.remove(); };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}