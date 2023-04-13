import { getWeeklyWeather } from './services/weather.js';
import { getLatLon } from './geolocation.js';



function configWeeklyWeather(weather) {

}
export default async function weeklyWeather() {
    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log('Ha ocurrido un error ubicandote')

    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon);
    if (weeklyWeatherError) return console.log("Ha ocurrido un error trayendo el pronostico de datos del clima")
    debugger
    configWeeklyWeather(weather)

}