import React from 'react'
import sunny from '../assets/production/fill/all/clear-day.svg'

import raindrop from '../assets/production/fill/all/raindrop.svg'

function WeekForecast() {
  return (
    <div className='pl-3 pt-2 bg-(--dark_boxes) w-[540px] h-[350px] ml-5 mr-3 my-2 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Forecast</div>
      <div>
        <DayForecast Day={'Today'} Humidity={'60%'} MinTemp={25} MaxTemp={30} sprite={sunny}/>
        <DayForecast Day={'Tuesday'} Humidity={'60%'} MinTemp={25} MaxTemp={30} sprite={sunny}/>
        <DayForecast Day={'Wednesday'} Humidity={'60%'} MinTemp={25} MaxTemp={30} sprite={sunny}/>
        <DayForecast Day={'Thusrday'} Humidity={'60%'} MinTemp={25} MaxTemp={30} sprite={sunny}/>
        <DayForecast Day={'Friday'} Humidity={'60%'} MinTemp={25} MaxTemp={30} sprite={sunny}/>
      </div>
    </div>
  )
}

function DayForecast({Day,Humidity, MinTemp, MaxTemp, sprite}) {
  return (
    <div className='grid grid-cols-[110px_1fr_1fr_1fr_1fr] text-[19px] mt-5 gap-2 items-center'>
      <div className=' text-[21px]'>{Day}</div>
      <div className='flex -translate-x-2 items-center'>
        <img src={raindrop} className='size-[33px]' />
        <span className='-translate-x-2'>{Humidity}</span>
      </div>
      
      <img src={sprite} alt="Weather Icon" className='size-[40px] mx-auto' />
      <div className=''>{MinTemp}°C</div>
      <div className=''>{MaxTemp}°C</div>
    </div>
  )
}

export default WeekForecast