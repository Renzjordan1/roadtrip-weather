import moment from 'moment-timezone';
import { roundToDecimal } from '../helpers/mathFuncs';



// Render Weather Information
const WeatherInfoText = ({ wpWeather}) => {


    // Input location + time, Output weather data
    return (
        <>  
            {/* Place and Time as heading */}
            <p>
                <span style={{ fontWeight:'bold' }}> {wpWeather['location']} </span> <br />
                <span style={{fontStyle: 'italic'}}>{moment(wpWeather['time']).tz("America/New_York").format("MMM DD, YYYY h:mma z")}</span>
            </p>

            {/* Create list of weather attributes */}
            <ul>
            {Object.keys(wpWeather).map((key, j) => {
                if (key == "temp") {
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
                }else if (key == "visibility") {
                    return <li key={j}>Visibility: {roundToDecimal(wpWeather[key], 100)} m </li>
                }
            })}
            </ul>
        </>
    )

}


export default WeatherInfoText
                        
                            
                            
                            
                            
                            