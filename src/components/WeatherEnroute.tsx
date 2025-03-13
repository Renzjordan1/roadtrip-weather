import { useState, useEffect } from 'react'

import useEnrouteWPStore from '../stores/EnrouteWP';

import routesService from '../services/routesService';
import openMeteo from '../services/openMeteo'

import { convertISOToTimezone, roundTimeToXMin } from '../helpers/timeFuncs';
import { roundToDecimal } from '../helpers/mathFuncs';
import { WeatherObject } from '../types/myTypes';



// Render Weather Information
const WeatherEnroute = () => {

    // Local states
    const [wpInfo, setWPInfo] = useState<WeatherObject[]>([])
    const [enrouteTimes, setEnrouteTimes] = useState<any[]>()

    // Global Stores
    const enrouteWPStore = useEnrouteWPStore()


    // Get arrival times at each waypoint
    useEffect(() => {

        
        const wpTimeFunc = async (waypoints, startTime) => {

            // Starting point
            var arrivalArr = [ {wp: waypoints[0], time: new Date(startTime)} ]

            // Next points
            for (let i = 1; i < waypoints.length; i++) {
                let route = await routesService.getRoute(waypoints[0], waypoints[i], startTime)

                let duration = Number(route.routes[0].duration.slice(0, -1))
                let arriveTime = new Date(startTime)
                arriveTime.setSeconds(arriveTime.getSeconds() + duration);

                let arrive = {wp: waypoints[i], time: arriveTime}

                arrivalArr.push(arrive)
            }

            // Set the state at once inside this async so state updates correctly
            console.log("WP TIMES:", arrivalArr)
            setEnrouteTimes(arrivalArr)
        }

        wpTimeFunc(enrouteWPStore.waypoints, enrouteWPStore.startTime)
            
    }, [enrouteWPStore])


    // Get weather data at each waypoint and time
    useEffect(() => {
        if (enrouteTimes){

            const wpWeatherFunc = async () => {

                // Empty array to build on
                var wpInfoClone: any[] = []

                // Weather at each point/time
                for (let i = 0; i < enrouteTimes.length; i++) {
                    try{
                        let weatherData = await openMeteo.getWeatherData(enrouteTimes[i].wp[0], enrouteTimes[i].wp[1])
                        let roundTime = roundTimeToXMin(15, enrouteTimes[i].time)
                        // console.log(weatherData.find((item: any) => item.time == roundTime.toISOString()))
                        
                        wpInfoClone.push(weatherData.find((item: any) => item.time == roundTime.toISOString()))
                    } catch {

                    }
                }

                // Set the state at once inside this async so state updates correctly
                console.log("WP WEATHER:", wpInfoClone)
                setWPInfo(wpInfoClone)
            }
            
            wpWeatherFunc()
                
        }


    }, [enrouteTimes])


    // Dispplay Enroute Weather Info
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Weather on the Way</h3>
            {wpInfo.map((wpWeather, i) => {
                return (
                        <div style={{borderTop: 'dotted', borderBottom: 'dotted'}} key={i}>
                            <p style={{ fontWeight:'bold' }}>{wpWeather['location']}</p>
                            <ul>
                            {Object.keys(wpWeather).map((key, j) => {
                                if (key == "time") {
                                    return <li key={j}>Time: {convertISOToTimezone(wpWeather[key], "America/New_York").toString()}</li>
                                }
                                else if (key == "temp") {
                                    return <li key={j}>Temperature: {roundToDecimal(wpWeather[key], 100)} &deg;F </li>
                                } else if (key == "rain") {
                                    return <li key={j}>Rain: {roundToDecimal(wpWeather[key], 100)} mm </li>
                                } else if (key == "showers") {
                                    return <li key={j}>Showers: {roundToDecimal(wpWeather[key], 100)} mm </li>
                                } else if (key == "snowfall") {
                                    return <li key={j}> Snowfall: {roundToDecimal(wpWeather[key], 100)} mm </li>
                                } else if (key == "weatherCode" && wpWeather[key]) {
                                    return <li key={j}>Conditons: {wpWeather[key]['description']} 
                                        <img style={{ verticalAlign: 'middle' }} src={wpWeather[key]['image']} /> </li>
                                } else if (key == "windGust") {
                                    return <li key={j}>Wind Gust: {roundToDecimal(wpWeather[key], 100)} km/h </li>
                                } else if (key == "windSpeed") {
                                    return <li key={j}>Wind Speed: {roundToDecimal(wpWeather[key], 100)} km/h </li>
                                }
                                else if (key == "windSpeed") {
                                    return <li key={j}>Wind Speed: {roundToDecimal(wpWeather[key], 100)} km/h </li>
                                }else if (key == "visibility") {
                                    return <li key={j}>Visibility: {roundToDecimal(wpWeather[key], 100)} m </li>
                                }
                            })}
                            </ul>
                            < br/>
                        </div>
                    )
                })
            }
        </div>
    )

}


export default WeatherEnroute
