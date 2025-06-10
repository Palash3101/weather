import { useState,useEffect } from 'react';
import './ScrollBar.css';
import weatherSprites from '../../utilities/CodeConverterMap.json'


function HourlyForecast({hourlyData, RiseNSetTime}) {
  const sunny = '../../production/fill/all/clear-day.svg'

  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [range, setRange] = useState(110/(31-25));

  useEffect(() => {
    if (!hourlyData) return;

    setMaxTemp(Math.ceil(Math.max(...hourlyData[0].temperature_2m)))
    setMinTemp(Math.floor(Math.min(...hourlyData[0].temperature_2m)))

  }, [hourlyData])

  useEffect(() => {
    if (maxTemp === null || minTemp === null) return;

    setRange(110/(maxTemp - minTemp));
  },[maxTemp, minTemp])

  function getIcon(weather_code, time){
    const cur_time = time.split("T")[1]
    const sunup_time = RiseNSetTime.sunrise[0].split("T")[1]
    const sundown_time = RiseNSetTime.sunset[0].split("T")[1]

    if (cur_time>=sunup_time && cur_time<sundown_time){
      return weatherSprites[weather_code]['day'].svg
    }
    else{
      return weatherSprites[weather_code]['night'].svg
    }

  }


  return (
    <div className='px-3 pt-2 bg-(--dark_boxes) flex-1 min-w-0 h-inherit mx-3 my-2 rounded-[25px]'>
      <div className='text-[20px] font-bold px-2'>Hourly Forecast</div>
      <div className='flex gap-1 px-3 overflow-x-auto w-full new-scrollbar'>

        {
          hourlyData && RiseNSetTime ?          
          Array(24).fill().map((_, i) => {
            return(
              <HourlyForecastItem
                key={i}
                time={hourlyData[0].time[i].split("T")[1].slice(0,5)}
                temperature={hourlyData[0].temperature_2m[i]}  
                icon={getIcon(hourlyData[0].weather_code[i], hourlyData[0].time[i])}
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
  const Humidity = '../../production/fill/all/humidity.svg'
  
  return (
    <div className='flex flex-col items-center w-[110px]'>
      <svg className='w-[140px] h-[140px]'>
        <path d={`M 70 ${25+offset[1]} L -35 ${25+offset[0]}`} stroke="rgb(195,195,195)" strokeWidth="2" fill="black" />
        <path d={`M 70 ${25+offset[1]} L 185 ${25+offset[2]}`} stroke="rgb(195,195,195)" strokeWidth="2" fill="black" />
        <circle cx="50%" cy={25+offset[1]} r="5" stroke="white" strokeWidth="2" fill="black" />
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