import axios from 'axios'
const baseUrl = 'https://routes.googleapis.com'

const getRoute = async () => {

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const url = baseUrl + "/directions/v2:computeRoutes"

    const request = {
        "origin":{
          "location":{
            "latLng":{
              "latitude": 37.419734,
              "longitude": -122.0827784
            }
          }
        },
        "destination":{
          "location":{
            "latLng":{
              "latitude": 37.417670,
              "longitude": -122.079595
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
      

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
        }
    };
    const response = await axios.post(url, request, config)
    return response.data
}


export default { getRoute }


