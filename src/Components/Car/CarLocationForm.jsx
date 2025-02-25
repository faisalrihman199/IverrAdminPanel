import React, { useState } from "react";
import LocationPicker from "./LocationPicker";
import { TbCurrentLocation, TbMapPinSearch } from "react-icons/tb";

const CarLocationForm = ({setLoc,theme}) => {
    // Default map center (for example, London)
    const initialCenter = { lat: 51.505, lng: -0.09 };
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [mapCenter, setMapCenter] = useState(initialCenter);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentMarker, setCurrentMarker] = useState(null);

    const inputBG = theme === 'dark' ? "main-dark" : "bg-white";
    const handleLocationSelect = (loc) => {
        setLocation(loc);
        setCurrentMarker({ lat: loc.latitude, lng: loc.longitude });
        setLoc(loc)
        console.log("Selected Location:", loc);
    };

    // Geocode the address entered in the search field using the Nominatim API.
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchTerm
                )}`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                const firstResult = data[0];
                const newCenter = { lat: parseFloat(firstResult.lat), lng: parseFloat(firstResult.lon) };
                setMapCenter(newCenter);
            } else {
                console.log("No results found");
            }
        } catch (error) {
            console.error("Error fetching geocoding data:", error);
        }
    };

    // Get the user's current location using the browser's geolocation API.
    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setMapCenter(currentLocation);
                    handleLocationSelect({ latitude: currentLocation.lat, longitude: currentLocation.lng });
                },
                (error) => {
                    console.error("Error getting current location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
           
            {/* Search Field */}
            <div className="flex grow justify-between items-center my-2">

                <div>
                    <div className="relative inline-block">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for a location..."
                            className={` ${inputBG} w-72 pl-4 pr-10 py-2 border border-gray-300 rounded-md  `}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                            <TbMapPinSearch onClick={handleSearch} />
                        </div>
                    </div>

                </div>
                {/* Button to use current location */}
                    <TbCurrentLocation className="cursor-pointer" size={24} onClick={handleGetCurrentLocation} />
            </div>


            {/* Map Component */}
            <LocationPicker
                center={mapCenter}
                onLocationSelect={handleLocationSelect}
                currentMarker={currentMarker}
            />

            
        </div>
    );
};

export default CarLocationForm;
