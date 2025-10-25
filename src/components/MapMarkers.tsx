import { Marker, Popup } from 'react-leaflet'
import * as L from "leaflet";

import moment from 'moment-timezone';

import useEnrouteInfoStore from '../stores/EnrouteInfo';

import { roundToDecimal } from '../helpers/mathFuncs';
import { WeatherObject } from '../types/myTypes';





// Render Map
const MapMarkers = () => {

    // Global Stores
    const enrouteInfoStore = useEnrouteInfoStore()

    
    // Render custom Map Marker
    return (
    <>
        {/* Create marker at each enroute point */}
        {enrouteInfoStore.wpInfo.map((wp: WeatherObject, i: any) => {

            if(wp.position && wp.weatherCode){
                
                // Short Format Time
                const momentTime = moment(wp['time'])
                const formattedTime = momentTime.tz('America/New_York').format("h:mma")
                // console.log("Time:", formattedTime)


                // Customized marker to show weather summary
                const myIcon = L.divIcon({
                    className: 'myIcon',
                    html: `<span style="font-size: max(1vh, 12px)">${roundToDecimal(wp['temp']!, 1)} &deg;F</span>
                            <br /> <img style="vertical-align: middle; max-width: 2.5vh !important; max-height: 2.5vh !important" src=${wp['weatherCode']['image']} />
                            <br /> <span style="font-size: max(0.8vh, 9.6px)"> ${formattedTime} </span>
                        `
                })


                return (
                    <Marker position={wp.position} key={i} icon={myIcon}>

                        {/* Popup shows in-detail weather */}
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                            <span style={{ fontWeight: 'bold' }}> {wp['location']} </span> <br />
                            Time: {formattedTime} <br />
                            Temperature: {roundToDecimal(wp['temp']!, 1)} &deg;F <br /> 
                            Precipitation: {roundToDecimal(wp['precip'], 100)} mm <br />
                            Conditions: {wp['weatherCode']['description']} <img style={{ verticalAlign: 'middle', maxWidth:'35px', maxHeight: '35px'}} src={wp['weatherCode']['image']} /> <br />
                            Wind Speed: {roundToDecimal(wp['windSpeed']!, 100)} km/h <br />
                            Wind Gust: {roundToDecimal(wp['windGust']!, 100)} km/h <br />
                            Visibility: {roundToDecimal(wp['visibility']!, 100)} m <br />

                            {/* Driving warnings based on weather data */}
                            {wp['visibility'] && wp['visibility'] < 2000 && <span style={{color: 'red'}}>*Poor Visibility<br /></span>  } 
                            {wp['visibility'] && wp['precip'] > 1.25 && <span style={{color: 'red'}}>*Hazardous Roads<br /></span> } 


                            </div>
                        </Popup>
                    </Marker>
                )

            }
        }
        )}
    </>
    )

}


export default MapMarkers
