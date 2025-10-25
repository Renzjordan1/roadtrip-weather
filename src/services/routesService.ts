import axios from 'axios'
import { catchAxiosError } from '../helpers/errorFuncs';

const baseUrl = 'https://routes.googleapis.com'

const getRoute = async (orig, dest, depTime) => {
    try {
      // Need API key for Google Maps API
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      // API route for 'Google Routes API'
      const url = baseUrl + "/directions/v2:computeRoutes"

      // Request with origin and destination
      const request = {
          "origin":{
            "location":{
              "latLng":{
                "latitude": orig[0],
                "longitude": orig[1]
              }
            }
          },
          "destination":{
            "location":{
              "latLng":{
                "latitude": dest[0],
                "longitude": dest[1]
              }
            }
          },
          "travelMode": "DRIVE",
          "routingPreference": "TRAFFIC_AWARE",
          "departureTime": depTime,
          "computeAlternativeRoutes": false,
          "routeModifiers": {
            "avoidTolls": false,
            "avoidHighways": false,
            "avoidFerries": false
          },
          "languageCode": "en-US",
          "units": "IMPERIAL"
        }
        

      // Valid config for API to work
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
          }
      };


      // Sending request
      const response = await axios.post(url, request, config)
      
      return response.data

    } catch (error) {
        catchAxiosError(error)
    }
}


export default { getRoute }


