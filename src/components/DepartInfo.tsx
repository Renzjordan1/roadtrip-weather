import { useState, useEffect } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateTimePicker } from '@mui/x-date-pickers';

import { APIProvider } from '@vis.gl/react-google-maps';

import usePlacesStore from '../stores/SelectedPlaces';
import useDepTimeStore from '../stores/SelectedDepTime';

import PlaceAutocomplete from './PlaceAutocomplete';



// Render Weather Information
const DepartInfo = () => {

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Local states
    const [datetime, setDatetime] = useState<Date | null>(new Date)

    const [selectedOrigin, setSelectedOrigin] = useState<google.maps.places.PlaceResult | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<google.maps.places.PlaceResult | null>(null);

    // Global Stores
    const placesStore = usePlacesStore()
    const depTimeStore = useDepTimeStore()

    const updateDepTime = () => {
        if(datetime) {
            
            const currTime = new Date()

            // Fast forward datetime so that Google Routes API accepts (it denies old times)
            if( ((datetime.getTime() - currTime.getTime()) / 1000) <= 60){
                let forwardTime = currTime
                forwardTime.setSeconds(forwardTime.getSeconds() + 60);
                depTimeStore.setdepTime(forwardTime?.toISOString())
                // console.log("up")


            } else {
                depTimeStore.setdepTime(datetime?.toISOString())
                // console.log("same")

            }

            // console.log(datetime.toLocaleString())

        }
    }


    // Update origin and destination if both have been set
    useEffect(() => {

        updateDepTime()

        if (selectedOrigin && selectedDestination) {
            placesStore.setPlaces(
                {
                    lat: selectedOrigin.geometry?.location?.lat(),
                    lng: selectedOrigin.geometry?.location?.lng()
                },
                {
                    lat: selectedDestination.geometry?.location?.lat(),
                    lng: selectedDestination.geometry?.location?.lng()
                }
            )
        }

    }, [selectedOrigin, selectedDestination])

    // Update departure time
    useEffect(() => {

        updateDepTime()

    }, [datetime])


    // Input origin, destination, and depart time -> sent to global store to share. 
    // Using Google Places API for Autocomplete of valid places
    return (
        <>
        {/* Inputs */}
        <div>
            Origin: 
            <APIProvider
                apiKey={apiKey}
                solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
                    <PlaceAutocomplete onPlaceSelect={setSelectedOrigin} />
            </APIProvider>
        </div>
        <br />

        <div>
            Destination: 
            <APIProvider
                apiKey={apiKey}
                solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
                    <PlaceAutocomplete onPlaceSelect={setSelectedDestination} />
            </APIProvider>
        </div>
        <br />

        <div>
            Depart Time: <br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                value={datetime}
                onChange={(newValue) => {
                    if(newValue){
                        setDatetime(newValue)
                    }
                }}
                />
            </LocalizationProvider>
        </div>
        <br />
        </>
    )

}


export default DepartInfo
