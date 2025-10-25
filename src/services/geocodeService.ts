import axios from 'axios'
import { catchAxiosError } from '../helpers/errorFuncs';

const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

const getReverseGeocode = async (lat: number, lng: number) => {

    try {
        // Need API key for Google Maps API
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        const url = baseUrl + `?latlng=${lat},${lng}&key=${apiKey}`


        // Sending request
        const response = await axios.post(url)

        return response.data

    } catch (error) {
        catchAxiosError(error);
    }
}


export default { getReverseGeocode }





