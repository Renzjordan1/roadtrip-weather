import { MapContainer, TileLayer } from 'react-leaflet'

import DirectionsPolyline from './DirectionsPolyline';



// Render Map
const MapDirections = () => {


    const wixomCenter = {lat: 42.5248, lng: -83.5363}
    const googleCenter = {lat: 37.419734, lng: -122.0827784}

    
    return (
    <>
        <MapContainer center={googleCenter} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DirectionsPolyline />
        </MapContainer>
    </>
    )

}


export default MapDirections
