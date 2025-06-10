import React, {use, useEffect, useState} from 'react'
import CurrentWeather from "./components/CurrentWeather"
import Header from "./components/header"
import HourlyForecast from "./components/HourlyForecast"
import WeekForecast from "./components/WeekForecast"
import Map from "./components/Map"
import RiseNSet from "./components/RiseNSet"
import AQI from './components/AQI'


function App() {

  const [location, setLocation] = useState([20.61, 72.926]);
  const [isDay, setIsDay] = useState(true);
  const [currentData, setCurrentData] = useState(null);
  const [riseNSetTime,setRiseNSetTime] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [aqData, setAQData] = useState(null);


  useEffect(() => {

    const currentDayDataCall = `https://api.open-meteo.com/v1/forecast?latitude=${location[0]}&longitude=${location[1]}&hourly=temperature_2m,weather_code,precipitation_probability&current=surface_pressure,wind_gusts_10m,uv_index,wind_speed_10m,temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,is_day&daily=sunset,sunrise&timezone=auto&forecast_days=1`

    async function fetchCurrentDayData(){
      try {
        const response = await fetch(currentDayDataCall);
        if (!response.ok){
          console.error('try block, sresponsenot OK');
        } 
        const data = await response.json().then((data)=>{
          setIsDay(data.current.is_day)
          setCurrentData([data.current, data.current_units])
          setRiseNSetTime(data.daily)
          setHourlyData([data.hourly, data.hourly_units])
          setAQData([data.current.surface_pressure, data.current.wind_gusts_10m])
        })
        
      }
      catch{
        console.error('catch block error');
      }
    }

    const weeklyDataCall = `https://api.open-meteo.com/v1/forecast?latitude=20.3717&longitude=72.9049&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
    async function fetchWeeklyData() {
      try{
        const response = await fetch(weeklyDataCall);

        if (!response.ok){
          console.error("response incorrect")
        }

        const data = await response.json().then((data)=>{
          setDailyData([data.daily, data.daily_units])
          // console.log(data)
        })

      }
      catch{
        console.error("catch block err 2")
      }
    }


fetchCurrentDayData();
fetchWeeklyData();

  }, [location[0], location[1]])


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);



  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return ()=>{
      window.removeEventListener('resize', handleResize);
    }

  }, [])


  const laptop_width = 1250;
  const tab=970;
  const mobile = 720;
  

  return (
  <div className=''>
      <Header/>
      <hr className=' mx-auto border=[2px] border-(var(--dark_accent)) w-[97%]'/>
      
      {
        windowWidth>=laptop_width?
        <div className='flex '>
          <div className='flex flex-col'>
            <CurrentWeather currentData = {currentData}/>
            <WeekForecast dailyData={dailyData}/>
          </div>
          <div className='flex flex-1 flex-col min-w-0'>
            <div className='flex'>
              <Map loc_cords={location}/>
              <RiseNSet RiseNSetTime={riseNSetTime} isDay={isDay}/>
            </div>
            <AQI variant={1} aqData={aqData}/>
            <HourlyForecast hourlyData={hourlyData}/>
          </div>
          {/* <div className="section-1">
            
            
          </div>

          <div className="section-2">
            
            
          </div> */}
        </div>
      :
      
      windowWidth>=tab?

        <div>
          <div className='section-1'>
            <CurrentWeather currentData={currentData}/>
            <RiseNSet RiseNSetTime={riseNSetTime} isDay={isDay} />
            <AQI variant={2} aqData={aqData}/>
          </div>
          <Map loc_cords={location}/>
          <div className='section-2'>
            <WeekForecast dailyData={dailyData}/>
            <HourlyForecast hourlyData={hourlyData}/>
          </div>  
        </div>

      :
        windowWidth>=mobile?
        <div>
          <div className='flex'> 
            <CurrentWeather currentData={currentData}/>
            <AQI variant={2} aqData={aqData}/>
          </div>
          <div className='flex'>
            <WeekForecast dailyData={dailyData}/>
            <RiseNSet RiseNSetTime={riseNSetTime} isDay={isDay} />
          </div>
          <Map loc_cords={location}/>
          <HourlyForecast hourlyData={hourlyData}/>
        </div>
        :
        <div>
          <CurrentWeather currentData={currentData}/>
          <AQI variant={1} aqData={aqData}/>
          <WeekForecast dailyData={dailyData}/>
          <RiseNSet RiseNSetTime={riseNSetTime} isDay={isDay} />
          <Map loc_cords={location}/>
          <HourlyForecast hourlyData={hourlyData}/>
        </div>
      }


  </div>
  )
}

export default App
