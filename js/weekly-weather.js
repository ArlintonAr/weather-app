import { getWeeklyWeather } from './services/weather.js';
import { getLatLon } from './geolocation.js';
import { formatWeekList } from './utils/format-data.js';
import { createDOM} from './utils/dom.js';

function configWeeklyWeather(weekList) {

}
export default async function weeklyWeather() {
    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log('Ha ocurrido un error ubicandote')

    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon);
    if (weeklyWeatherError) return console.log("Ha ocurrido un error trayendo el pronostico de datos del clima")

    const weekList = formatWeekList(weather.list)

    configWeeklyWeather(weekList)

}