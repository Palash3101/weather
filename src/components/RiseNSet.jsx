import { useState, useEffect } from 'react'
import sunriseIcon from '../assets/production/fill/all/sunrise.svg'
import sunsetIcon from '../assets/production/fill/all/sunset.svg'

function RiseNSet() {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Mock data - in real app, this would come from weather API
  const sunriseTime = new Date()
  sunriseTime.setHours(6, 24, 0)
  
  const sunsetTime = new Date()
  sunsetTime.setHours(19, 42, 0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    
    return () => clearInterval(timer)
  }, [])
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }
  
  const getTimeUntil = (targetTime) => {
    const now = new Date()
    const target = new Date(targetTime)
    
    // If target time has passed today, set it for tomorrow
    if (target < now) {
      target.setDate(target.getDate() + 1)
    }
    
    const diff = target - now
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `in ${hours}h ${minutes}m`
    } else {
      return `in ${minutes}m`
    }
  }
  
  const isDay = true;

  function getSunArcPath(position) {
    const rx = 145;
    const ry = 72.495;

    const cx = 185;
    const cy = 90;

    //p=0-1 ke beech ki koi value
    const p = position;

    const angleP = (1-p) * Math.PI; // 0 to π

    const x = cx+(rx*Math.cos(angleP));
    const y = cy-(ry*Math.sin(angleP));

    return [x,y]
    
  }

  function getSunPosition(){
    const rise_min = sunriseTime.getHours()*60 + sunriseTime.getMinutes();
    const cur_min = currentTime.getHours()*60 + currentTime.getMinutes();
    const set_min = sunsetTime.getHours()*60 + sunsetTime.getMinutes();

    return getSunArcPath((cur_min-rise_min)/(set_min-rise_min))
  }
  
  const [sunX, sunY] = getSunPosition();
  
  return (
    <div className='px-3 pt-2 bg-(--dark_boxes) w-[400px] h-[310px] mx-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Sunrise&Sunset</div>
        
        {/* Sun Arc Visualization */}
        <div className='h-26 w-full my-4'>
          <svg
            className='svg-container'
            viewBox="0 0 400 150"
            preserveAspectRatio="xMinYMin meet" 
          >
            <path
              id='sunPath'
              d="M 40 90 A 30 15 0 0 1 330 90"
              stroke="rgb(195,195,195)"
              fill="none"
              strokeWidth="2"
              className="svg-path"
            />

            <circle cx={sunX} cy={sunY} r="10" fill='yellow' stroke="orange" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Time Information */}
        <div className='grid grid-cols-2 gap-4'>
          {/* Sunrise */}
          <div className=' rounded-2xl p-3'>
            <div className='flex items-center mb-1'>
              <img src={sunriseIcon} alt="Sunrise Icon" className='size-10' />
              <span className='text-base font-medium'>Sunrise</span>
            </div>
            <div className='text-2xl font-bold text-white mb-1'>
              {formatTime(sunriseTime)}
            </div>
            <div className='text-s'>
              {currentTime < sunriseTime ? getTimeUntil(sunriseTime) : 'Passed'}
            </div>
          </div>
          
          {/* Sunset */}
          <div className=' rounded-2xl p-3'>
            <div className='flex items-center mb-1'>
              <img src={sunsetIcon} alt="Sunset Icon" className='size-10' />
              <span className='text-base font-medium'>Sunset</span>
            </div>
            <div className='text-2xl font-bold text-white mb-1'>
              {formatTime(sunsetTime)}
            </div>
            <div className='text-s'>
              {currentTime < sunsetTime ? getTimeUntil(sunsetTime) : 'Passed'}
            </div>
          </div>
        </div>
    </div>
  )
}

export default RiseNSet