import { fetchWeatherApi } from 'openmeteo';
import { LatLng } from 'leaflet';

import WMOCodes from '../assets/WMOCodes.json';

import geocodeService from './geocodeService';

import { WeatherObject } from '../types/myTypes';



const getWeatherData = async (lat: number, lon: number) => {

    // Weather data to get
    const params = {
        "latitude": lat,
        "longitude": lon,
        "minutely_15": ["is_day", "temperature_2m", "rain", "showers", "snowfall", "precipitation", "weather_code", "wind_speed_10m", "wind_gusts_10m", "visibility"],
        "hourly": ["showers", "snow_depth"],
        "temperature_unit": "fahrenheit",
        "forecast_days": 7
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
    
    const minutely15 = response.minutely15()!;
    const hourly = response.hourly()!;

    // Get actual location name
    var actualLocation = await geocodeService.getReverseGeocode(latitude, longitude)
    try{
        actualLocation = actualLocation.results[actualLocation.results.length-4].formatted_address
    } catch {
        console.log("Location not found")
        actualLocation = null
    }


    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
    
        minutely15: {
            isDay: minutely15.variables(0)!.valuesArray()!,
            time: range(Number(minutely15.time()), Number(minutely15.timeEnd()), minutely15.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: minutely15.variables(1)!.valuesArray()!,
            rain: minutely15.variables(2)!.valuesArray()!,
            showers: minutely15.variables(3)!.valuesArray()!,
            snowfall: minutely15.variables(4)!.valuesArray()!,
            precip: minutely15.variables(5)!.valuesArray()!,
            weatherCode: minutely15.variables(6)!.valuesArray()!,
            windSpeed10m: minutely15.variables(7)!.valuesArray()!,
            windGusts10m: minutely15.variables(8)!.valuesArray()!,
            visibility: minutely15.variables(9)!.valuesArray()!,
        },
    
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            showers: hourly.variables(0)!.valuesArray()!,
            snowDepth: hourly.variables(1)!.valuesArray()!,
        },
    
    };


    // Transform API data into an array of the data for each specific time
    let m15Data: {}[] = []

    for (let i = 0; i < weatherData.minutely15.time.length; i++) {

        const dayOrNight = weatherData.minutely15.isDay[i] == 1 ? 'day' : 'night'

        let weatherCodeNum:keyof typeof WMOCodes = weatherData.minutely15.weatherCode[i].toString() as keyof typeof WMOCodes

        m15Data.push(
            {
                position: {lat: latitude, lng: longitude} as LatLng,
                location: actualLocation,
                isDay: weatherData.minutely15.isDay[i],
                time: weatherData.minutely15.time[i].toISOString(),
                temp: weatherData.minutely15.temperature2m[i],
                rain: weatherData.minutely15.rain[i],
                showers: weatherData.minutely15.showers[i],
                precip: weatherData.minutely15.precip[i],
                snowfall: weatherData.minutely15.snowfall[i],
                weatherCode: WMOCodes[weatherCodeNum][dayOrNight],
                windSpeed: weatherData.minutely15.windSpeed10m[i],
                windGust: weatherData.minutely15.windGusts10m[i],
                visibility: weatherData.minutely15.visibility[i]
            } as WeatherObject
        );
    }
    
    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    // for (let i = 0; i < weatherData.minutely15.time.length; i++) {
    //     console.log(
    //         weatherData.minutely15.time[i].toISOString(),
    //         weatherData.minutely15.temperature2m[i],
    //         weatherData.minutely15.rain[i],
    //         weatherData.minutely15.snowfall[i],
    //         weatherData.minutely15.weatherCode[i],
    //         weatherData.minutely15.windSpeed10m[i],
    //         weatherData.minutely15.windGusts10m[i],
    //         weatherData.minutely15.visibility[i]
    //     );
    // }
    // for (let i = 0; i < weatherData.hourly.time.length; i++) {
    //     console.log(
    //         weatherData.hourly.time[i].toISOString(),
    //         weatherData.hourly.showers[i],
    //         weatherData.hourly.snowDepth[i]
    //     );
    // }


    return m15Data
    
}

export default { getWeatherData };
