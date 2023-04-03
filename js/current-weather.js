import weather from "../data/current-weather.js";


function setCurrentCity($el,city){
    $el.textContent=city
}


const config={
    day:"numeric",
    weekday:"long",
    month:"long"
}

function setCurrentDate($el){
    const date=new Date()
    const formattedDate=new Intl.DateTimeFormat('es',config).format(date); 

    $el.textContent=formattedDate;
}


function configCurrentWeather(){
    //loader
    //date
    const $currentWeatherDate=document.querySelector('#current-weather-date');
    setCurrentDate($currentWeatherDate)
    //city
    const $currentWeatherCity=document.querySelector('#current-weather-city');
    const city=weather.name;
    setCurrentCity($currentWeatherCity,city)
    
    //temp
    //backgraund
}
export default function currentWeather(){
    //GEO // API-Weather  //Config 
    configCurrentWeather(weather);
}