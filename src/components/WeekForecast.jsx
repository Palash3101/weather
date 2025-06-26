import weatherSprites from '../../utilities/CodeConverterMap.json'
import './ScrollBar.css';

function WeekForecast({dailyData}) {
  const sunny = '../../production/fill/all/clear-day.svg'

  function getDayName(dateString) {
    const date = new Date(dateString);
  
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  
  }

  return (
    <div className='pl-3 pt-2 bg-(--dark_boxes) min-w-0 flex-1 max-w-[4200px] flex-shrink-1 h-[350px] ml-5 mr-3 my-2 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Forecast</div>
      <div className='overflow-y-auto h-[300px] new-scrollbar'>
        {
          dailyData
          ?
          dailyData[0].time.map((day, index) => {
            return (
              <DayForecast 
                key={index} 
                Day={index === 0 ? 'Today' : getDayName(day)} 
                Humidity={dailyData[0].precipitation_probability_max[index] + dailyData[1].precipitation_probability_max}
                MinTemp={dailyData[0].temperature_2m_min[index] + dailyData[1].temperature_2m_min}
                MaxTemp={dailyData[0].temperature_2m_max[index] + dailyData[1].temperature_2m_max}
                sprite={weatherSprites[dailyData[0].weather_code[index]]['day'].svg}
              />
            )})
          :
          <div>Hold</div>
        }
        
      </div>
    </div>
  )
}

function DayForecast({Day,Humidity, MinTemp, MaxTemp, sprite}) {
  const raindrop = '../../production/fill/all/raindrop.svg'

  return (
    <div className='grid grid-cols-[100px_40px_45px_1fr_1fr]  text-[19px] mt-5 gap-2 items-center'>
      <div className=' text-[21px]'>{Day}</div>
      <div className='flex -translate-x-2 items-center'>
        <img alt="raindrop" src={raindrop} className='size-[33px]' />
        <span className='-translate-x-2'>{Humidity}</span>
      </div>
      
      <img src={sprite} alt="Weather Icon" className='size-[40px] mx-auto' />
      <div className=''>{MinTemp}</div>
      <div className=''>{MaxTemp}</div>
    </div>
  )
}

export default WeekForecast