import { useState, useEffect, useRef } from 'react';
import { decode } from "@googlemaps/polyline-codec";

import { useMap, Polyline } from 'react-leaflet'

import routesService from '../services/routesService';



// Draws Directions on Map
const DirectionsPolyline = () => {

    // Refs
    const map = useMap()
    const polylinePathRef = useRef<L.Polyline>(null)
    
    // Local States
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

    // Set Bounds top fit the directions polyline
    useEffect(() => {        
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


    // Render Polyline
    return <Polyline ref={polylinePathRef} pathOptions={{ color: 'blue' }} positions={polylinePath} />


}


export default DirectionsPolyline
