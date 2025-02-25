import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { TbCurrentLocation } from "react-icons/tb";

// Create a custom Leaflet icon using TbCurrentLocation
const customLocationIcon = L.divIcon({
  html: ReactDOMServer.renderToString(<TbCurrentLocation size={32} color="red" />),
  className: "custom-location-icon", // you can style this class via CSS if needed
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Fix default marker icon issues in Leaflet (optional, if you're not using default icon anywhere)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// This component re-centers the map when center or zoom changes.
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center.lat !== undefined && center.lng !== undefined) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

// This component handles map clicks and displays a marker.
const LocationMarker = ({ onLocationSelect, currentMarker }) => {
  const [markerPosition, setMarkerPosition] = useState(currentMarker || null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newPosition = { lat, lng };
      setMarkerPosition(newPosition);
      if (onLocationSelect) {
        onLocationSelect({ latitude: lat, longitude: lng });
      }
    },
  });

  // If a currentMarker prop is provided, display that marker
  if (currentMarker) {
    return <Marker position={currentMarker} icon={customLocationIcon} />;
  }
  return markerPosition ? <Marker position={markerPosition} icon={customLocationIcon} /> : null;
};

const LocationPicker = ({ center, onLocationSelect, zoom = 13, currentMarker }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "400px", width: "100%" }}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationSelect={onLocationSelect} currentMarker={currentMarker} />
    </MapContainer>
  );
};

export default LocationPicker;
