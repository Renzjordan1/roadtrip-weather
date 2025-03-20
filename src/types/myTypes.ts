import { LatLng } from "leaflet"

export type WeatherObject = {
    position?: LatLng,
    location?: string
    isDay?: number,
    time?: string,
    temp?: number,
    rain?: number,
    showers?: number,
    snowfall?: number,
    precipitation?: number,
    weatherCode?: Object,
    windSpeed?: number,
    windGust?: number,
    visibility?: number
}