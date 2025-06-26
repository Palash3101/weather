import { useEffect, useState } from 'react'

function CurrentWeather({currentData}) {

  const Humidity = '/production/line/humidity.svg'
  const Wind = '/production/line/wind.svg'
  const UVIndex = '/production/line/uv-index.svg'

  const [weatherData, setWeatherData] = useState({
    temperature: '25°C',
    condition: 'Sunny',
    lastUpdated: '10:00 AM',
    windSpeed: '15 km/h',
    humidity: '60%',
    uvIndex: '5',
    icon:'/production/fill/all/clear-day.svg'
  })

  useEffect(()=>{

    if (!currentData) return;
    let data = {
      temperature: currentData[0].temperature_2m+currentData[1].temperature_2m,
      apparant_temperature:currentData[0].apparent_temperature+currentData[1].apparent_temperature,
      condition: currentData[0].weather_code.description,
      icon:currentData[0].weather_code.svg,
      lastUpdated: currentData[0].time.split("T")[1],
      windSpeed: currentData[0].wind_speed_10m,
      humidity: currentData[0].relative_humidity_2m,
      uvIndex: currentData[0].uv_index,
      isDay:currentData[0].is_day,
    }
    
    setWeatherData(data);
}, [currentData])


  return (
    <div className='pl-3 pt-2 bg-(--dark_boxes) h-[300px] min-w-0 flex-1 ml-5 mr-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Current Weather</div>
      <div className='text-[16px]'>{weatherData.lastUpdated}</div>
      <div className='flex mt-1 p-2'>
        <div>
          <div className='text-[44px] text-white font-bold'>{weatherData.temperature}</div>
          <div className='text-[24px]'>{weatherData.condition}</div>
        </div>
        
        <img src={weatherData.icon} alt="Weather Icon" className='w-[100px] h-[100px] mx-auto' />
      </div>
      <div className='flex justify-between mr-10 ml-5 mt-3'>

        <div className='flex flex-col w-auto items-center'>
          <img src={Humidity} alt="Humidity Icon" className='size-[35px]' />
          <div className='text-[18px]'>{weatherData.humidity}</div>
        </div>

        <div className='flex flex-col w-auto items-center'>
          <img src={UVIndex} alt="UV Icon" className='size-[35px]' />
          <div className='text-[18px]'>{weatherData.uvIndex}</div>
        </div>

        <div className='flex flex-col w-auto items-center'>
          <img src={Wind} alt="Wind Icon" className='size-[35px]' />
          <div className='text-[18px]'>{weatherData.windSpeed}</div>
        </div>
      </div>

      <p className='mt-4 mx-2 text-lg'>
        Feels Like: &nbsp; 
        <span className='text-white'>{weatherData.apparant_temperature}</span>
      </p>
    </div>
  )
}

export default CurrentWeather