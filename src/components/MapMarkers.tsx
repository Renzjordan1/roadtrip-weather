import { Marker, Popup } from 'react-leaflet'

import moment from 'moment-timezone';

import useEnrouteInfoStore from '../stores/EnrouteInfo';

import { roundToDecimal } from '../helpers/mathFuncs';





// Render Map
const MapMarkers = () => {

    // Global Stores
    const enrouteInfoStore = useEnrouteInfoStore()

    
    // Render custom Map Marker
    return (
    <>
        {/* Create marker at each enroute point */}
        {enrouteInfoStore.wpInfo.map((wp, i) => {

            if(wp.position && wp.weatherCode){
                
                // Short Format Time
                var momentTime = moment(wp['time'])
                var formattedTime = momentTime.tz('America/New_York').format("h:mma")
                // console.log("Time:", formattedTime)


                // Customized marker to show weather summary
                var myIcon = L.divIcon({
                    className: 'myIcon',
                    html: `<span style="font-size: 1vmin">${roundToDecimal(wp['temp'], 1)} &deg;F</span>
                            <br /> <img style="vertical-align: middle; max-width:35px !important; max-height: 35px !important" src=${wp['weatherCode']['image']} />
                            <br /> <span style="font-size: 0.8vmin"> ${formattedTime} </span>
                        `
                })


                return (
                    <Marker position={wp.position} key={i} icon={myIcon}>

                        {/* Popup shows in-detail weather */}
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                            <span style={{ fontWeight: 'bold' }}> {wp['location']} </span> <br />
                            Time: {formattedTime} <br />
                            Temperature: {roundToDecimal(wp['temp'], 1)} &deg;F <br /> 
                            Precipitation: {roundToDecimal(wp['precip'], 100)} mm <br />
                            Conditions: {wp['weatherCode']['description']} <img style={{ verticalAlign: 'middle', maxWidth:'35px', maxHeight: '35px'}} src={wp['weatherCode']['image']} /> <br />
                            Wind Speed: {roundToDecimal(wp['windSpeed'], 100)} km/h <br />
                            Wind Gust: {roundToDecimal(wp['windGust'], 100)} km/h <br />
                            Visibility: {roundToDecimal(wp['visibility'], 100)} m <br />

                            {/* Driving warnings based on weather data */}
                            {wp['visibility'] && wp['visibility'] < 1500 && <span style={{color: 'red'}}>*Poor Visibility<br /></span>  } 
                            {wp['visibility'] && wp['precip'] > 1.88 && <span style={{color: 'red'}}>*Hazardous Roads<br /></span> } 


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
