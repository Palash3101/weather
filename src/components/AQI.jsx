import {useState, useEffect} from 'react'

function AQI({variant, aqData, location}) {
  const [airQuality, setAirQuality] = useState(0);
  const [windGusts, setWindGusts] = useState(0);
  const [pressure, setPressure] = useState(0);
  
  // Calculate meter position (0-150 scale, where 0-50 is good, 51-100 is moderate, 101-150 is unhealthy)
  function getMeterPosition(airQuality) {
    if (airQuality >150) return 98;
    return Math.min((airQuality / 150) * 100, 100);
  }
  
  const getText = (aq) => {
    if (aq <= 50) return 'Good';
    if (aq <= 100) return 'Moderate';
    return 'Unhealthy';
  };
  
  const getTextColor = (aq) => {
    if (aq <= 50) return 'text-green-400';
    if (aq <= 100) return 'text-yellow-400';
    return 'text-red-400';
  };

    const getBackgroundColor = (aq) => {
    if (aq <= 50) return 'bg-green-400';
    if (aq <= 100) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  useEffect(() => {
    async function fetchAirQuality() {
      try{
        const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location[0]}&longitude=${location[1]}&current=pm2_5`);
  
        if (response.ok) {
          const data = response.json().then((data) => {
            setAirQuality(data.current.pm2_5);
          })
        }
        } catch (error) {
          console.error('Error fetching air quality data:');
        }
      }

    fetchAirQuality();
      
    if (!aqData) return;
    setPressure(aqData[0]);
    setWindGusts(aqData[1]);

  }, [aqData]);


  return (
    <>
    { 
      variant == 1 ?
    <div className='pl-3 pt-1 bg-(--dark_boxes) h-[115px] min-w-0 mx-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Air Quality & Forecast</div>
      
      {/* Air Quality with Meter */}
      <div className='flex items-center space-x-4 mt-2 pr-3'>
        <div className='flex items-center space-x-2'>
        <div className={`${getBackgroundColor(airQuality)} text-black font-bold text-[22px] px-3 py-1 rounded-lg`}>
          {airQuality}
        </div>
        <span className={`${getTextColor(airQuality)} text-[22px] font-medium`}>
          {getText(airQuality)}
        </span>
        </div>
        
        {/* Air Quality Meter */}
        <div className='flex-1 mx-4'>
          <div className='relative h-3 rounded-full overflow-hidden bg-gray-700'>
            {/* Background gradient sections */}
            <div className='absolute inset-0 flex'>
              <div className='w-1/3 bg-green-500'></div>
              <div className='w-1/3 bg-yellow-400'></div>
              <div className='w-1/3 bg-red-500'></div>
            </div>
            {/* Current position indicator */}
            <div 
              className='absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-500'
              style={{ left: `${getMeterPosition(airQuality)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Wind and Pressure */}
      <div className='flex items-center justify-evenly pr-3 mt-1 mx-4 gap-5'>
        <div className='flex items-center space-x-2'>
          <span className='text-[18px] text-gray-300'>Wind gusts:</span>
          <span className='text-white text-[18px] font-medium'>{windGusts} km/h</span>
        </div>
        
        <div className='flex items-center space-x-2'>
          <span className='text-[18px] text-gray-300'>Pressure:</span>
          <span className='text-white text-[18px] font-medium'>{pressure} hPa</span>
        </div>
      </div>
    </div>
      :
    <div className='px-3 py-3 bg-(--dark_boxes) h-inherit min-w-0 flex-1 ml-5 mr-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Air Quality & Forecast</div>
      
      {/* Main Air Quality Display */}
      <div className='flex items-center space-x-3 mt-3'>
        <div className={`${getBackgroundColor(airQuality)} text-black font-bold text-[24px] px-3 py-1 rounded-lg`}>
          {airQuality}
        </div>
        <span className={`${getTextColor(airQuality)} text-[24px] font-medium`}>
          {getText(airQuality)}
        </span>
      </div>

      {/* Air Quality Meter */}
      <div className='flex-1 m-5'>
        <div className='relative h-3 rounded-full overflow-hidden bg-gray-700'>
          {/* Background gradient sections */}
          <div className='absolute inset-0 flex'>
            <div className='w-1/3 bg-green-500'></div>
            <div className='w-1/3 bg-yellow-400'></div>
            <div className='w-1/3 bg-red-500'></div>
          </div>
          {/* Current position indicator */}
          <div 
            className='absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-500'
            style={{ left: `${getMeterPosition(airQuality)}%` }}
          ></div>
        </div>
      </div>

      {/* Wind and Pressure */}
      <div className='flex justify-between items-center mt-8 pr-3'>
        <div>
          <div className='text-[18px] mb-1'>Wind gusts</div>
          <div className='text-white text-[20px] font-medium'>{windGusts} km/h</div>
        </div>
        
        <div>
          <div className='text-[18px] mb-1'>Pressure</div>
          <div className='text-white text-[20px] font-medium'>{pressure} hPa</div>
        </div>
      </div>
    </div>
  }
  </>
  )
}

export default AQI