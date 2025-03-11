import { useState, useEffect, useRef } from 'react';
import { useMap, MapContainer, TileLayer } from 'react-leaflet'


import DirectionsPolyline from './DirectionsPolyline';
import MapEvents from './MapEvents';



// Render Map
const MapCanvas = () => {

    // Refs
    const mapRef = useRef<L.Map>(null)


    // Example locations
    // const wixomCenter = {lat: 42.5248, lng: -83.5363}
    // const googleCenter = {lat: 37.419734, lng: -122.0827784}

    
    // Render Map
    return (
    <>
        <MapContainer ref={mapRef} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DirectionsPolyline />
            <MapEvents />
        </MapContainer>
    </>
    )

}


export default MapCanvas
