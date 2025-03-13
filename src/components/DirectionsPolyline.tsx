import { useState, useEffect, useRef } from 'react';
import { decode } from "@googlemaps/polyline-codec";

import { useMap, Polyline } from 'react-leaflet'

import useEnrouteWPStore from '../stores/EnrouteWP';

import routesService from '../services/routesService';

import { evenlySpacedPoints } from '../helpers/pointFuncs';



// Draws Directions on Map
const DirectionsPolyline = () => {

    // Refs
    const map = useMap()
    const polylinePathRef = useRef<L.Polyline>(null)
    
    // Local States
    const [polylinePath, setPolylinePath] = useState<any[]>([])

    // Global Stores
    const enrouteWPStore = useEnrouteWPStore()


    // Get Directions from API
    useEffect(() => {      
        const orig = [42.5248, -83.5363] 
        const dest =  [38.2542, -85.7594]
        routesService.getRoute(orig, dest)
        .then(response => {

            // console.log("Directions:", response)

            const decodedPolyline = decode(response.routes[0].polyline.encodedPolyline, 5)

            // console.log("Polyline:", decodedPolyline)

            setPolylinePath(decodedPolyline.map(arr => {
                return {
                    lat: arr[0],
                    lng: arr[1]
                }
            }))   
            

            // Set X Waypoints (use to see weather throughout the route)
            const waypoints = evenlySpacedPoints(decodedPolyline, 7)
            // console.log("Waypoints:", waypoints)
            enrouteWPStore.setWaypoints(waypoints, new Date())


        })
    }, [])

    // Set Bounds top fit the directions polyline
    useEffect(() => {        
        if(polylinePathRef.current?.getBounds() ){
            const pathBounds = polylinePathRef.current.getBounds()
            // console.log("Bounds:", polylinePathRef.current.getBounds())

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
