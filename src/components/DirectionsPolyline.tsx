import { useState, useEffect, useRef } from 'react';
import { decode } from "@googlemaps/polyline-codec";

import { Polyline, useMap } from 'react-leaflet'


import routesService from '../services/routesService';


// Draws Directions on Map
const DirectionsPolyline = () => {

    const map = useMap()
    const polylinePathRef = useRef<L.Polyline>(null)
    
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

    // Get Directions from API
    useEffect(() => {        
        // // Get Directions from API    
        if(polylinePathRef.current?.getBounds() ){
            const pathBounds = polylinePathRef.current.getBounds()
            console.log("Bounds:", polylinePathRef.current.getBounds())

            try{
                map.fitBounds(pathBounds)
            } catch { 
                console.log("Polyline Bounds has not loaded")
            }
        }

    }, [polylinePath])
    

    return <Polyline ref={polylinePathRef} pathOptions={{ color: 'blue' }} positions={polylinePath} />


}


export default DirectionsPolyline
