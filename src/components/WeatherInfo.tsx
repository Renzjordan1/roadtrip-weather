import { useState, useEffect } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateTimePicker } from '@mui/x-date-pickers';

import useLatLngStore from '../stores/SelectedLatLng'

import openMeteo from '../services/openMeteo'

import { convertISOToTimezone, roundTimeToXMin } from '../helpers/timeFuncs';
import { roundToDecimal } from '../helpers/mathFuncs';
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
            const infoFound = response.find((item: any) => item.time == datetime?.toISOString())
            if (infoFound){
                console.log("Specific Info:", infoFound)
                setSpecificInfo(infoFound)
            } 
            
        })

    }, [latLngStore, datetime])


    // Input location + time, Output weather data
    return (
        <>
        {/* Inputs */}
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
            <p style={{ fontWeight:'bold' }}>{specificInfo['location']}</p>
            <p>{convertISOToTimezone(datetime?.toISOString(), "America/New_York").toString()}</p>
            <ul>
            {Object.keys(specificInfo).map((key, i) => {
                if (key == "temp") {
                    return <li key={i}>Temperature: {roundToDecimal(specificInfo[key], 100)} &deg;F </li>
                } else if (key == "rain") {
                    return <li key={i}>Rain: {roundToDecimal(specificInfo[key], 100)} mm </li>
                } else if (key == "showers") {
                    return <li key={i}>Showers: {roundToDecimal(specificInfo[key], 100)} mm </li>
                } else if (key == "snowfall") {
                    return <li key={i}> Snowfall: {roundToDecimal(specificInfo[key], 100)} mm </li>
                } else if (key == "weatherCode" && specificInfo[key]) {
                    return <li key={i}>Conditons: {specificInfo[key]['description']} 
                        <img style={{ verticalAlign: 'middle' }} src={specificInfo[key]['image']} /> 
                        </li>
                } else if (key == "windGust") {
                    return <li key={i}>Wind Gust: {roundToDecimal(specificInfo[key], 100)} km/h </li>
                } else if (key == "windSpeed") {
                    return <li key={i}>Wind Speed: {roundToDecimal(specificInfo[key], 100)} km/h </li>
                }
                else if (key == "windSpeed") {
                    return <li key={i}>Wind Speed: {roundToDecimal(specificInfo[key], 100)} km/h </li>
                }else if (key == "visibility") {
                    return <li key={i}>Visibility: {roundToDecimal(specificInfo[key], 100)} m </li>
                }
            })}
            </ul>
        </div>
        </>
    )

}


export default WeatherInfo
