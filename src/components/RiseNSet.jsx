import { useState, useEffect } from 'react'
import sunriseIcon from '../assets/production/fill/all/sunrise.svg'
import sunsetIcon from '../assets/production/fill/all/sunset.svg'

function RiseNSet({RiseNSetTime, isDay}) {
  const [currentTime, setCurrentTime] = useState(new Date())

  const [sunupTime, setSunupTime] = useState(null)
  const [sundownTime , setSundownTime] = useState(null)

  useEffect(()=>{
      if (!RiseNSetTime) return;
    
      setSunupTime(RiseNSetTime.sunrise[0].split("T")[1]);
      setSundownTime(RiseNSetTime.sunset[0].split("T")[1]);

  }, [RiseNSetTime])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    
    return () => clearInterval(timer)
  }, [])

  useEffect(()=>{
    if (sunupTime){
      getSunPosition();
    }
  }, [sunupTime, sundownTime])
    

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

    if (!isDay){
      return [40, 90]
    }


    try{
    let rise_min = sunupTime.split(":")
    rise_min = parseInt(rise_min[0])*60 + parseInt(rise_min[1]);
    
    let set_min = sundownTime.split(":")
    set_min = parseInt(set_min[0])*60 + parseInt(set_min[1])

    // const set_min = sunsetTime.getHours()*60 + sunsetTime.getMinutes();
    const cur_min = currentTime.getHours()*60 + currentTime.getMinutes();

    return getSunArcPath((cur_min-rise_min)/(set_min-rise_min))
  }

  catch {
    return [40,90]
  }
    
  }
  
  const [sunX, sunY] = getSunPosition();
  
  return (
    <div className='px-3 pt-2 bg-(--dark_boxes) min-w-[330px] flex-1 mx-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Sunrise&Sunset</div>
        
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
        
        <div className='grid grid-cols-2 gap-4'>
          <div className=' rounded-2xl p-3'>
            <div className='flex items-center mb-1'>
              <img src={sunriseIcon} alt="Sunrise Icon" className='size-10' />
              <span className='text-base font-medium'>Sunrise</span>
            </div>
            <div className='text-2xl font-bold text-white pl-3'>
              {sunupTime}
            </div>
          </div>
          

          <div className=' rounded-2xl p-3'>
            <div className='flex items-center mb-1'>
              <img src={sunsetIcon} alt="Sunset Icon" className='size-10' />
              <span className='text-base font-medium'>Sunset</span>
            </div>
            <div className='text-2xl font-bold text-white pl-3'>
              {sundownTime}
            </div>
          </div>
        </div>
    </div>
  )
}

export default RiseNSet