import { useState, useEffect } from 'react'

import useEnrouteWPStore from '../stores/EnrouteWP';

import routesService from '../services/routesService';
import openMeteo from '../services/openMeteo'

import { convertISOToTimezone, roundTimeToXMin } from '../helpers/timeFuncs';



// Render Weather Information
const WeatherEnroute = () => {

    // Local states
    const [wpInfo, setWPInfo] = useState<any[]>([])
    const [enrouteTimes, setEnrouteTimes] = useState<any[]>()

    // Global Stores
    const enrouteWPStore = useEnrouteWPStore()


    // Get arrival times at each waypoint
    useEffect(() => {

        
        const wpTimeFunc = async (waypoints, startTime) => {

            // Starting point
            var arrivalArr = [ {wp: waypoints[0], time: startTime} ]

            // Next points
            for (let i = 1; i < waypoints.length; i++) {
                let route = await routesService.getRoute(waypoints[0], waypoints[i])

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
                    let weatherData = await openMeteo.getWeatherData(enrouteTimes[i].wp[0], enrouteTimes[i].wp[1])

                    let roundTime = roundTimeToXMin(15, enrouteTimes[i].time)
                    // console.log(weatherData.find((item: any) => item.time == roundTime.toISOString()))
                    
                    wpInfoClone.push(weatherData.find((item: any) => item.time == roundTime.toISOString()))
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
        {JSON.stringify(wpInfo)}
        </div>
    )

}


export default WeatherEnroute
