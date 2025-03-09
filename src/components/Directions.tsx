import { useState, useEffect } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { decode } from "@googlemaps/polyline-codec";

import routesService from '../services/routesService';


// Draws Directions on Map
const Directions = () => {
    const map = useMap();
    const maps = useMapsLibrary("maps");

    const [polylinePath, setPolylinePath] = useState<any[]>([])


    // Get Directions from API
    useEffect(() => {        
        routesService.getRoute()
        .then(response => {

            console.log("Directions:", response)

            const decodedPolyline = decode(response.routes[0].polyline.encodedPolyline, 5)

            setPolylinePath(decodedPolyline.map(arr => {
                return {
                    lat: arr[0],
                    lng: arr[1]
                }
            }))     

        })
    }, [])


    // Set Bounding Box to fit directions
    const fitMapToRoute = (map, route) => {
        const bounds = new google.maps.LatLngBounds();
      
        // Extend the bounds with each coordinate in the route path
        for (const coordinate of route) {
          bounds.extend(new google.maps.LatLng(coordinate.lat, coordinate.lng));
        }

        if (!map) {
            return null
        }

        console.log("Bounds:", bounds)
    
        setTimeout(() => { map.fitBounds(bounds) }, 1000);
        // map.fitBounds(bounds);
    }
      
    // Draw Polyline of directions onto map
    if (!maps) {
        return null;
    }

    const directionsPolyline = new maps.Polyline({
        path: polylinePath,
        geodesic: true,
        strokeColor: "#0f57ff",
        strokeWeight: 6,
        strokeOpacity: 0.6
      });


    directionsPolyline.setMap(map);
    fitMapToRoute(map, polylinePath)

    return null


}


export default Directions
