import axios from 'axios'
const baseUrl = 'https://routes.googleapis.com'

const getRoute = async () => {

    // Need API key for Google Maps API
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // API route for 'Google Routes API'
    const url = baseUrl + "/directions/v2:computeRoutes"

    // Sample hard-coded request data
    const request = {
        "origin":{
          "location":{
            "latLng":{
              "latitude": 42.5248,
              "longitude": -83.5363
            }
          }
        },
        "destination":{
          "location":{
            "latLng":{
              "latitude": 38.2542,
              "longitude": -85.7594
            }
          }
        },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
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
}


export default { getRoute }


