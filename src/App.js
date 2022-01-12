/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import { ArrowBackIosOutlined, LocationOn } from '@material-ui/icons';
import ForecastCard from './components/ForecastCard';
import {getForecast,getWeather} from './APIServices/APIService';

function App() {
  
const Cities = [
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Lucknow', value: 'Lucknow' },
  { label: 'Delhi', value: 'Delhi' },
  { label: 'Kolkata', value: 'Kolkata' },
  { label: 'Varanasi', value: 'Varanasi' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Bhopal', value: 'Bhopal' },
  { label: 'Kanpur', value: 'Kanpur' },
  { label: 'Jaipur', value: 'Jaipur' },
];
useEffect(() => {
displayWeather("Mumbai");
displayForecast("Mumbai");
}, []) 
const [data, setData] = useState();
const [City, setCity] = useState();
const [description, setDescription] = useState();
const [weather, setWeather] = useState(true);
const [arrow,setArrow] = useState({start:0,end:5});
const [forecast,setForecast] = useState();
async function displayWeather(City){
  const response=await getWeather(City);
  if(response.data.weather[0].description==="mist")
  setDescription("mist");
  else if(response.data.weather[0].description==="fog" || response.data.weather[0].description==="smoke")
  setDescription("fog");
  else if(response.data.weather[0].description==="haze")
  setDescription("haze");
  else if(response.data.weather[0].description==="clear sky")
setDescription("clear");
else if(response.data.weather[0].description==="scattered clouds" || response.data.weather[0].description==="clear clouds" || response.data.weather[0].description==="few clouds")
setDescription("clouds");
else if(response.data.weather[0].description==="overcast clouds")
setDescription("overcast");
else setDescription("default");

  setData(response);
}
async function displayForecast(City){
  const response=await getForecast(City);
  console.log(response.data);
  setForecast(response.data.list);
}
const nextArrow = ()=>{
  setArrow({start:arrow.start+1,end:arrow.end+1})
}

const prevArrow = ()=>{
  setArrow({start:arrow.start-1,end:arrow.end-1})
}
const getDay=(day)=>{
const array=day.split(" ");
let myDate=new Date(array[0]).toDateString();
let mytime=array[1].split(":")[0];
myDate=myDate.split(" ");
myDate.push(mytime);
return myDate;

}


const mapCard= (ele)=>{
  const arr=getDay(ele.dt_txt);
  return (
    <ForecastCard temp={ele.main.temp} Day={arr[0]} Month={arr[1]} Date={arr[2]} Time={arr[4]} temp_max={ele.main.temp_max} temp_min={ele.main.temp_min}  />
  )
}
const displayForecastCard = ()=>{
  let arr=[];
  console.log(forecast)
  for(var i=arrow.start;i<arrow.end;i++)  arr.push(forecast[i])
  console.log(arr)
return(
  <div className='weather-cards'>
  {arr.map(ele=> mapCard(ele))}
  </div>
)
}


  return (
    <div className={description==="mist"?"box-mist":description==="fog"?"box-fog":description==="haze"?"box-hazesky":description==="clear"?"box-clearsky":description==="clouds"?"box-scattered":description==="overcast"?"box-overcast":"box"}>
    <Select 
    defaultValue={{ label:Cities[0].label, value:Cities[0].value }}
    className="react-dropdown"
    options={Cities}
      onChange={(value)=>{
        setCity(value.value);
        displayWeather(value.value)
        displayForecast(value.value)
        
     }}
      
    /> 
            <div class="btn_group">
                <a onClick={()=>{setWeather(false)}} class="btn_two">
                    <span>FORECAST</span>
                    <div class="btn_bg"></div>
                </a>
                <a onClick={()=>{setWeather(true)}} class="btn_one">WEATHER</a>
            </div>
            <div className='location'>
            <LocationOn fontSize='inherit'/>
            <h5>{City?City:"Mumbai"}</h5>
            </div>
    {data&& <div className='weather-info'>
    {weather? <div>
      <h2 className='weather-current'>{data.data.main.feels_like+" "}&deg;C</h2>
      <div className='weather-feelslike'>
      <img src="./icons/animated/weather.svg" alt="weather-description"/>
      <h1>{data.data.weather[0].description}</h1>
      </div>
      <div className='weather-temp'>
      <h1>Max Temp:{data.data.main.temp_max+" "}&deg;C</h1>
      <h1>Min Temp:{data.data.main.temp_min+" "}&deg;C</h1>
      </div>
      </div>:(
      <div > 
        {forecast&&displayForecastCard()}
        <div className="arrow-div">
        {arrow.start>0?<button onClick={prevArrow}><ArrowBackIosOutlined  className="left-arrow" fontSize='large' style={{color:"white"} }/></button>:<div></div>}
        {arrow.end<forecast.length&&<button className='next-button' onClick={nextArrow}><ArrowBackIosOutlined  fontSize='large' className="right-arrow" style={{color:"white"} }/></button>}
        </div>
      </div>
      )}
    </div> }
  

    </div>
  );
}

export default App;
