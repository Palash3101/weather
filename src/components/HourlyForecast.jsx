import { useState,useEffect } from 'react';
import sunny from '../assets/production/fill/all/clear-day.svg'
import Humidity from '../assets/production/fill/all/humidity.svg'
import './ScrollBar.css';


function HourlyForecast({hourlyData}) {
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [range, setRange] = useState(140/(31-25));

  useEffect(() => {
    if (!hourlyData) return;

    setMaxTemp(Math.ceil(Math.max(...hourlyData[0].temperature_2m)))
    setMinTemp(Math.floor(Math.min(...hourlyData[0].temperature_2m)))

  }, [hourlyData])

  useEffect(() => {
    if (maxTemp === null || minTemp === null) return;

    setRange(140/(maxTemp - minTemp));
  },[maxTemp, minTemp])


  return (
    <div className='px-3 pt-2 bg-(--dark_boxes) w-[1020px] h-[350px] mx-3 my-2 rounded-[25px]'>
      <div className='text-[20px] font-bold px-2'>Hourly Forecast</div>
      <div className='flex gap-1 px-3 overflow-x-auto w-full new-scrollbar'>

        {
          hourlyData ?          
          Array(24).fill().map((_, i) => {
            return(
              <HourlyForecastItem
                key={i}
                time={hourlyData[0].time[i].split("T")[1].slice(0,5)}
                temperature={hourlyData[0].temperature_2m[i]}  
                icon={sunny}
                humidity={hourlyData[0].precipitation_probability[i]}
                offset={[
                  
                  i===0 ? 250 : (maxTemp-hourlyData[0].temperature_2m[i-1]) * range,
                  (maxTemp-hourlyData[0].temperature_2m[i])*range,
                  i===23 ? 250 : (maxTemp-hourlyData[0].temperature_2m[i+1]) * range
                ]}
              />
            )
          })
          :
          <div>
            hold
          </div>
        }
      </div>
    </div>
  )
}


function HourlyForecastItem({ time, temperature, icon, offset, humidity }) {  
  
  return (
    <div className='flex flex-col items-center w-[110px]'>
      <svg className='w-[140px] h-[200px]'>
        <path d={`M 70 ${30+offset[1]} L -45 ${30+offset[0]}`} stroke="rgb(195,195,195)" strokeWidth="2" fill="black" />
        <path d={`M 70 ${30+offset[1]} L 185 ${30+offset[2]}`} stroke="rgb(195,195,195)" strokeWidth="2" fill="black" />
        <circle cx="50%" cy={30+offset[1]} r="5" stroke="white" strokeWidth="2" fill="black" />
      </svg>
      <div className='text-[18px]'>{time}</div>
      <div className='flex items-center'>
        <img src={icon} alt="Weather Icon" className='size-[40px]' />
        <img src={Humidity} alt="Humidity Icon" className='size-[40px]' />
      </div>
      <div className='flex items-center gap-2'>
        <div className='text-[18px]'>{temperature}°C</div>
        <div className='text-[18px]'>| {humidity}%</div>
      </div>
    </div>
  )
}

export default HourlyForecast