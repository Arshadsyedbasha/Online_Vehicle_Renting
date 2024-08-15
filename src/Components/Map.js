import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios';
import { CircularProgress, Box } from '@mui/material';
import 'leaflet-routing-machine';

// Custom location icon
const locationIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41] // size of the shadow
});

const INITIAL_COORDINATES = [51.505, -0.09]; // Default to London if no address is provided

const MapComponent = ({ startAddress, endAddress }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const markersRef = useRef([]); // To store markers

  useEffect(() => {
    // Initialize the map if not already initialized
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(INITIAL_COORDINATES, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    const geocodeAddress = async (address) => {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: address,
            format: 'json',
            addressdetails: 1
          }
        });
        const { lat, lon } = response.data[0];
        return [parseFloat(lat), parseFloat(lon)];
      } catch (error) {
        console.error('Error geocoding address:', error);
        return null;
      }
    };

    const updateMap = async () => {
      setLoading(true);
      try {
        const startCoordinates = await geocodeAddress(startAddress);
        const endCoordinates = await geocodeAddress(endAddress);

        if (startCoordinates && endCoordinates) {
          // Remove existing routing control safely
          if (routingControlRef.current) {
            routingControlRef.current.getPlan().setWaypoints([]); // Clear existing waypoints
            mapRef.current.removeControl(routingControlRef.current);
          }

          // Remove existing markers
          markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
          markersRef.current = [];

          // Add markers for start and end locations
          const startMarker = L.marker(startCoordinates, { icon: locationIcon }).addTo(mapRef.current);
          const endMarker = L.marker(endCoordinates, { icon: locationIcon }).addTo(mapRef.current);
          markersRef.current.push(startMarker, endMarker);

          // Create new routing control
          routingControlRef.current = L.Routing.control({
            waypoints: [
              L.latLng(startCoordinates),
              L.latLng(endCoordinates)
            ],
            routeWhileDragging: true
          }).addTo(mapRef.current);

          // Fit map bounds to the route
          mapRef.current.fitBounds([
            [startCoordinates[0], startCoordinates[1]],
            [endCoordinates[0], endCoordinates[1]]
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    // Update the map if both addresses are provided
    if (startAddress && endAddress) {
      updateMap();
    } else if (routingControlRef.current) {
      routingControlRef.current.getPlan().setWaypoints([]);
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
      mapRef.current.setView(INITIAL_COORDINATES, 13);
    }

    // Cleanup function to remove map, routing control, and markers
    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.getPlan().setWaypoints([]);
        mapRef.current.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
      if (markersRef.current) {
        markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
        markersRef.current = [];
      }
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [startAddress, endAddress]);

  return (
    <Box
      id="map"
      style={{
        height: '500px',
        width: '100%',
        border: '2px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default MapComponent;
