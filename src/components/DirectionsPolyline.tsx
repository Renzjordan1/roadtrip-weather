import { useState, useEffect, useRef } from 'react';
import { decode } from "@googlemaps/polyline-codec";

import { useMap, Polyline } from 'react-leaflet'

import useEnrouteWPStore from '../stores/EnrouteWP';
import usePlacesStore from '../stores/SelectedPlaces';
import useDepTimeStore from '../stores/SelectedDepTime';

import routesService from '../services/routesService';

import { evenlySpacedPoints } from '../helpers/pointFuncs';



// Draws Directions on Map
const DirectionsPolyline = () => {

    // Refs
    const map = useMap()
    const polylinePathRef = useRef<L.Polyline>(null)
    
    // Local States
    const [polylinePath, setPolylinePath] = useState<{ lat: number, lng: number }[]>([])

    // Global Stores
    const enrouteWPStore = useEnrouteWPStore()
    const placesStore = usePlacesStore()
    const depTimeStore = useDepTimeStore()




    // Get Directions from API
    useEffect(() => {    
        // Using inputs from other components for Route API request
        if(Object.keys(placesStore.orig).length !== 0 && Object.keys(placesStore.dest).length !== 0 && depTimeStore.depTime){
            const orig = [placesStore.orig.lat, placesStore.orig.lng] 
            const dest =  [placesStore.dest.lat, placesStore.dest.lng]

            routesService.getRoute(orig, dest, depTimeStore.depTime)
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
                const waypoints = evenlySpacedPoints(decodedPolyline, 5)
                // console.log("Waypoints:", waypoints)
                enrouteWPStore.setWaypoints(waypoints, depTimeStore.depTime)

            })
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placesStore, depTimeStore]) 


    // Set Bounds top fit the directions polyline
    useEffect(() => {        
        if(polylinePathRef.current?.getBounds() ){
            const pathBounds = polylinePathRef.current.getBounds()
            // console.log("Bounds:", polylinePathRef.current.getBounds())

            try{
                map.fitBounds(pathBounds)
            } catch { 
                // console.log("Polyline Bounds has not loaded")
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [polylinePath]) 




    // Render Polyline
    return <Polyline ref={polylinePathRef} pathOptions={{ color: 'blue' }} positions={polylinePath} />


}


export default DirectionsPolyline
