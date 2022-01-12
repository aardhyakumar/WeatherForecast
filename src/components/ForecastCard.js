import React from 'react'
import "./Forecast.css";
function ForecastCard(props) {
    return (
        <div className='main'>
           <div className='main-container'>
           <div className='main-info'>
           <h5>{props.Date}<sup>th</sup></h5>
           <h5>{props.Month}</h5>
           <h5>{props.Day}</h5>
         
           </div>
           <div className='main-time'>
           <h5>Time:{props.Time}:00</h5>
           </div>
           <img src={(props.Time>="18" || props.Time==="00")?"./icons/animated/night.svg":"./icons/animated/day.svg"} alt="forecast-img"/>
           <div className='main-temp'>
               <h5>Temp:{props.temp}&deg;C</h5>
               <h5>Max:{props.temp_max}&deg;C</h5>
               <h5>Min:{props.temp_max}&deg;C</h5>
              </div>
              
              
               


           </div>
        </div>
    )
}

export default ForecastCard
