import React from 'react'
import sprite from '../assets/production/fill/all/clear-day.svg'

import Humidity from '../assets/production/line/all/humidity.svg'
import Wind from '../assets/production/line/all/wind.svg'
import UVIndex from '../assets/production/line/all/uv-index.svg'

function CurrentWeather() {
  const weatherData = {
    temperature: '25°C',
    condition: 'Sunny',
    lastUpdated: '10:00 AM',
    windSpeed: '15 km/h',
    humidity: '60%',
    uvIndex: '5',
  }

  return (
    <div className='pl-3 pt-2 bg-(--dark_boxes) size-[310px] ml-5 mr-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Current Weather</div>
      <div className='text-[16px] text-gray-500'>{weatherData.lastUpdated}</div>
      <div className='flex mt-1 p-2'>
        <div>
          <div className='text-[44px] font-bold'>{weatherData.temperature}</div>
          <div className='text-[24px] text-gray-500'>{weatherData.condition}</div>
        </div>
        
        <img src={sprite} alt="Weather Icon" className='w-[100px] h-[100px] mx-auto' />
      </div>
      <div className='flex justify-between mr-10 ml-5 mt-3'>

        <div className='flex flex-col w-auto items-center'>
          <img src={Humidity} className='size-[35px]' />
          <div className='text-[18px]'>{weatherData.humidity}</div>
        </div>

        <div className='flex flex-col w-auto items-center'>
          <img src={UVIndex} className='size-[35px]' />
          <div className='text-[18px]'>{weatherData.uvIndex}</div>
        </div>

        <div className='flex flex-col w-auto items-center'>
          <img src={Wind} className='size-[35px]' />
          <div className='text-[18px]'>{weatherData.windSpeed}</div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather