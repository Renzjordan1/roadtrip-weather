import {APIProvider, Map} from '@vis.gl/react-google-maps';

import Directions from './Directions';


// Render Map
const MapDirections = () => {


    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


    return (
    <>
        <APIProvider apiKey={apiKey}>
            <Map
            style={{width: '100%', height: '100vh'}}
            // defaultCenter={{lat: 42.5248, lng: -83.5363}}
            defaultCenter={{lat: 37.419734, lng: -122.0827784}}
            defaultZoom={2}
            />
            <Directions />
        </APIProvider>
    </>
    )

}


export default MapDirections
