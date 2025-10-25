import { useState, useEffect } from 'react'

import useEnrouteWPStore from '../stores/EnrouteWP';
import useEnrouteInfoStore from '../stores/EnrouteInfo';

import routesService from '../services/routesService';
import openMeteo from '../services/openMeteo'

import { roundTimeToXMin } from '../helpers/timeFuncs';
import WeatherInfoText from './WeatherInfoText';
import { WeatherObject } from '../types/myTypes';



// Render Weather Information
const WeatherEnroute = () => {

    // Local states
    const [enrouteTimes, setEnrouteTimes] = useState<{ wp: [number, number], time: Date }[]>()


    // Global Stores
    const enrouteWPStore = useEnrouteWPStore()
    const enrouteInfoStore = useEnrouteInfoStore()



    // Get arrival times at each waypoint
    useEffect(() => {

        
        const wpTimeFunc = async (waypoints: [number, number][], startTime: string) => {
            
            // Starting point
            const arrivalArr = [ {wp: waypoints[0], time: new Date(startTime)} ]

            // Next points
            for (let i = 1; i < waypoints.length; i++) {
                const route = await routesService.getRoute(waypoints[0], waypoints[i], startTime)

                const duration = Number(route.routes[0].duration.slice(0, -1))
                const arriveTime = new Date(startTime)
                arriveTime.setSeconds(arriveTime.getSeconds() + duration);

                const arrive = {wp: waypoints[i], time: arriveTime}

                arrivalArr.push(arrive)
            }

            // Set the state at once inside this async so state updates correctly
            // console.log("WP TIMES:", arrivalArr)
            setEnrouteTimes(arrivalArr)
        }

        wpTimeFunc(enrouteWPStore.waypoints, enrouteWPStore.startTime)
            
    }, [enrouteWPStore])


    // Get weather data at each waypoint and time
    useEffect(() => {
        if (enrouteTimes){

            const wpWeatherFunc = async () => {

                // Empty array to build on
                const wpInfoClone: WeatherObject[]  = []

                // Weather at each point/time
                for (let i = 0; i < enrouteTimes.length; i++) {
                    try{
                        const weatherData = await openMeteo.getWeatherData(enrouteTimes[i].wp[0], enrouteTimes[i].wp[1])
                        const roundTime = roundTimeToXMin(15, enrouteTimes[i].time)

                        // console.log(weatherData.find((item: any) => item.time == roundTime.toISOString()))
                        const weatherInfoItem = weatherData!.find((item: WeatherObject) => item.time == roundTime.toISOString())!
                        
                        // Error if enrouteTime is out of bounds of forecast data
                        if (weatherInfoItem === undefined) {
                            throw new Error(`Can't find the weather forecast`);
                        }

                        wpInfoClone.push(weatherInfoItem)

                    } catch {
                        console.log("Missed Weather Datapoint!")
                    }
                }

                // Set the state at once inside this async so state updates correctly
                // console.log("WP WEATHER:", wpInfoClone)
                enrouteInfoStore.setInfo(wpInfoClone)
            }
            
            wpWeatherFunc()
                
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enrouteTimes])



    // Display Enroute Weather Info
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Weather on the Way</h3>
            {enrouteInfoStore.wpInfo.map((wpWeather, i) => {
                return (
                        <div style={{borderTop: 'dotted', borderBottom: 'dotted'}} key={i}>
                            <WeatherInfoText wpWeather={wpWeather} />
                        </div>
                    )
                })
            }
        </div>
    )

}


export default WeatherEnroute
