import sunny from '../assets/production/fill/all/clear-day.svg'

function HourlyForecast() {
  const minTemp = 25;
  const maxTemp = 31;
  const range = 140/(maxTemp - minTemp);


  return (
    <div className='px-3 pt-2 bg-(--dark_boxes) w-full h-[350px] mx-3 my-2 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Hourly Forecast</div>
      <div className='flex'>
        <HourlyForecastItem time="10:00" temperature="25" icon={sunny} offset={[170, (maxTemp-25)*range, (maxTemp-28)*range]} />
        <HourlyForecastItem time="12:00" temperature="28" icon={sunny} offset={[(maxTemp-25)*range, (maxTemp-28)*range, (maxTemp-26)*range]}/>
        <HourlyForecastItem time="13:00" temperature="26" icon={sunny} offset={[(maxTemp-28)*range, (maxTemp-26)*range, (maxTemp-29)*range]}/>
        <HourlyForecastItem time="14:00" temperature="29" icon={sunny} offset={[(maxTemp-26)*range, (maxTemp-29)*range, (maxTemp-27)*range]}/>
        <HourlyForecastItem time="15:00" temperature="27" icon={sunny} offset={[(maxTemp-29)*range, (maxTemp-27)*range, (maxTemp-30)*range]}/>
        <HourlyForecastItem time="16:00" temperature="30" icon={sunny} offset={[(maxTemp-27)*range, (maxTemp-30)*range, (maxTemp-27)*range]}/>
        <HourlyForecastItem time="15:00" temperature="27" icon={sunny} offset={[(maxTemp-30)*range, (maxTemp-27)*range, (maxTemp-30)*range]}/>
        <HourlyForecastItem time="16:00" temperature="30" icon={sunny} offset={[(maxTemp-27)*range, (maxTemp-30)*range, (maxTemp-26)*range]}/>
        <HourlyForecastItem time="17:00" temperature="26" icon={sunny} offset={[(maxTemp-30)*range, (maxTemp-26)*range, 170]}/>
      </div>
    </div>
  )
}

function HourlyForecastItem({ time, temperature, icon, offset }) {  
  
  return (
    <div className='flex flex-col items-center w-[110px]'>
      <svg className='w-[110px] h-[200px]'>
        <path d={`M 58 ${30+offset[1]} L -55 ${30+offset[0]}`} stroke="rgb(195,195,195)" strokeWidth="2" fill="black" />
        <path d={`M 53 ${30+offset[1]} L 170 ${30+offset[2]}`} stroke="rgb(195,195,195)" strokeWidth="2" fill="black" />
        <circle cx="50%" cy={30+offset[1]} r="5" stroke="white" strokeWidth="2" fill="black" />
      </svg>
      <div className='text-[16px]'>{time}</div>
      <img src={icon} alt="Weather Icon" className='size-[40px]' />
      <div className='text-[18px]'>{temperature}°C</div>
    </div>
  )
}

export default HourlyForecast