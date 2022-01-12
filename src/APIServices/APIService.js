import axios from "axios";

function getWeather(City){
    const WeatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=0eda323703fe333a76e2f05312904766&units=metric`;
    return axios.get(WeatherUrl);
}
function getForecast(City){
    const ForecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=0eda323703fe333a76e2f05312904766&units=metric`;
    return axios.get(ForecastUrl);
}
export {getWeather,getForecast}