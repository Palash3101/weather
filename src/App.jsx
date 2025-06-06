import CurrentWeather from "./components/CurrentWeather"
import Header from "./components/header"
import HourlyForecast from "./components/HourlyForecast"
import WeekForecast from "./components/WeekForecast"
import Map from "./components/Map"


function App() {

  return (
  <div className=''>
      <Header/>
      <hr className=' mx-auto border=[2px] border-(var(--dark_accent)) w-[97%]'/>
      
      <div className="section-1">
        <CurrentWeather/>
        <Map/>
      </div>

      <div className="section-2">
        <WeekForecast/>
        <HourlyForecast/>
      </div>


  </div>
  )
}

export default App
