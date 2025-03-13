import axios from 'axios'
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

const getReverseGeocode = async (lat, lng) => {

    // Need API key for Google Maps API
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const url = baseUrl + `?latlng=${lat},${lng}&key=${apiKey}`


    // Sending request
    const response = await axios.post(url)
  
    return response.data
}


export default { getReverseGeocode }





