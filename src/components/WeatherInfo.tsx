import { useState, useEffect } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateTimePicker } from '@mui/x-date-pickers';


import openMeteo from '../services/openMeteo'



// Render Weather Information
const WeatherInfo = () => {

    // Look-up parameters 
    const [latitude, setLatitude] = useState(42.5248)
    const [longitude, setLongitude] = useState(-83.5363)
    const [datetime, setDatetime] = useState<Date | null>(null)

    // Specified Info to show
    const [specInfo, setSpecInfo] = useState<{}>()


    // Update weather data when params change
    useEffect(() => {
        openMeteo.getWeatherData(latitude, longitude)
        .then(response => { 
            console.log(response)
            setSpecInfo(response.find((item: any) => item.time == datetime?.toISOString()))
            console.log(response.find((item: any) => item.time == datetime?.toISOString()))
        })
    }, [latitude, longitude, datetime])


    // Inputs and Outputs data to user
    return (
        <>
        <div>
            Latitude: 
            <input
            type="number"
            value={latitude}
            name="Latitude"
            onChange={({ target }) => setLatitude(target.valueAsNumber)}
            />
        </div>
        <br />

        <div>
            Latitude: 
            <input
            type="number"
            value={longitude}
            name="Longitude"
            onChange={({ target }) => setLongitude(target.valueAsNumber)}
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
                        var coeff = 1000 * 60 * 15;
                        setDatetime(new Date(Math.round(newValue.getTime() / coeff) * coeff))
                    }
                }}
                />
            </LocalizationProvider>
        </div>
        <br />
        


        <div>
            <p>{datetime?.toISOString()}</p>
            <p>{JSON.stringify(specInfo)}</p>
        </div>
        </>
    )

}


export default WeatherInfo
