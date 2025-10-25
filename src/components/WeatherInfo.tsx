import { useState, useEffect } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateTimePicker } from '@mui/x-date-pickers';

import useLatLngStore from '../stores/SelectedLatLng'

import openMeteo from '../services/openMeteo'

import WeatherInfoText from './WeatherInfoText';

import { roundTimeToXMin } from '../helpers/timeFuncs';
import { WeatherObject } from '../types/myTypes';



// Render Weather Information
const WeatherInfo = () => {

    // Local states
    const [datetime, setDatetime] = useState<Date | null>(roundTimeToXMin(15, new Date))
    const [specificInfo, setSpecificInfo] = useState<WeatherObject>({})
    
    // Global Stores
    const latLngStore = useLatLngStore()


    // Update weather data when params change
    useEffect(() => {
        openMeteo.getWeatherData(latLngStore.lat, latLngStore.lng)
        .then(response => { 
            const infoFound = response.find((item: WeatherObject) => item.time == datetime?.toISOString())
            if (infoFound){
                // console.log("Specific Info:", infoFound)
                setSpecificInfo(infoFound)
            } 
            
        })

    }, [latLngStore, datetime])


    // Input location + time, Output weather data
    return (
        <>
        {/* Inputs */}
        <p>Current Weather at Selected Location</p>
        <div>
            Latitude: 
            <input
            type="number"
            value={latLngStore.lat}
            name="Latitude"
            onChange={({ target }) => latLngStore.setLat(target.valueAsNumber)}
            />
        </div>
        <br />

        <div>
            Latitude: 
            <input
            type="number"
            value={latLngStore.lng}
            name="Longitude"
            onChange={({ target }) => latLngStore.setLng(target.valueAsNumber)}
            />
        </div>
        <br />

        <div>
            Time:
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                label="Controlled picker"
                value={datetime}
                onChange={(newValue) => {
                    if(newValue){
                        setDatetime(roundTimeToXMin(15, newValue))
                    }
                }}
                />
            </LocalizationProvider>
        </div>
        <br />

        {/* Outputs */}
        <div>
            <WeatherInfoText wpWeather={specificInfo} />
        </div>
        </>
    )

}


export default WeatherInfo
