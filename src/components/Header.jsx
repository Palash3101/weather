import { useState, useEffect } from 'react'
import '../index.css'

function Header({setLocation}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState(null);

  const [locations, setLocations] = useState([
    { cordinates: [28.679079, 77.069710], value: 'Delhi', address:'India' },
    { cordinates: [20.6099639, 72.9306552], value: 'Valsad', address:'India' },
    { cordinates: [1.290270, 103.851959], value: 'Singapore', address:'Singapore' },
    { cordinates: [19.07611, 72.8775], value: 'Mumbai', address:'India' },
    { cordinates: [35.652832, 139.839478], value: 'Tokyo', address:'Japan' }
  ]);

  function handleLocationSelect (location){
    setSelectedLocation(location.value);
    setLocation(location.cordinates);
    setIsOpen(false);
    setSearchTerm('');
  };

  
  //Timer Setup
  const [isTyping, setIsTyping] = useState(false)
  useEffect(()=>{
    
    setIsTyping(true)

    const timer = setTimeout(()=>{
      setIsTyping(false)
    }, 500)

    return ()=>{
      clearTimeout(timer)
    }
  }, [searchTerm]);

  //API call
  useEffect(()=>{
    async function fetchLocationData(encodedString){
      const key = import.meta.env.VITE_LOCATIONIQ_API_KEY;
      
      const query = `https://api.locationiq.com/v1/autocomplete?key=${key}&q=${encodedString}&limit=5&dedupe=1&`

      try{
        const response = await fetch(query)

        if(!response.ok) {
          console.error("Response not good"); 
          return;
        }

        const data = response.json().then((data)=>{
          const output=[]
          data.map((value, i)=>{
            output.push({cordinates:[value.lat, value.lon], value:value.display_place, address:value.display_address})
          })

          setLocations(output)
        })

      }
      catch{
        console.error("error in getting locaions")
      }
    }


    if (!isTyping) {
      if (searchTerm){
      fetchLocationData(encodeURIComponent(searchTerm))
    }
    }

  }, [isTyping])

  return (
    <div className='flex justify-between items-center mr-5 bg-(--dark_background) text-(--dark_text)'>
      <div className="relative w-80 header">
        <div 
          className={`bg-(--dark_boxes) rounded-[15px] ml-5 my-2 py-2 px-4 flex items-center cursor-pointer transition-all duration-300 hover:shadow-lg`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-5 h-5 text-blue-500 transition-transform duration-300 hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>

          <span className='flex-1 font-medium'>
            {selectedLocation || 'Select your location'}
          </span>
          
          {/* Chevron Icon */}
          <svg className={`w-4 h-4 text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>

      {
        isOpen &&
        <HeaderDropdown 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          locations={locations}
          handleLocationSelect={handleLocationSelect}
        />
      }
      </div>
      <div>
        Dark Mode
      </div>
    </div>
  );
}

function HeaderDropdown({searchTerm, setSearchTerm, locations, handleLocationSelect}) {
  return (
  <div className='ml-5 absolute top-full left-0 right-0 mt-2 bg-(--dark_boxes) border-2 border-(--dark_accent) rounded-2xl z-50 h-auto overflow-hidden transition-all duration-300'>
    {/* Search Input */}
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      <input 
        type="text" 
        placeholder="Search locations..." 
        className="text-lg w-full pl-10 pr-4 py-2 text-base focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Location List */}
    <div className="overflow-x-hidden">
      {locations.length > 0 ? (
        locations.map((location, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 cursor-pointer border-b first:border-t border-(--dark_accent) last:border-b-0 hover:translate-x-1 hover:-translate-y-1 hover:bg-(--dark_accent) transition-all duration-300"
            onClick={() => handleLocationSelect(location)}
          >
            <svg className="w-4 h-4  flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div className='flex flex-col'>
              <div className="text-lg font-bold  text-(--dark_text)">{location.value}</div>
              <div className="text-sm text-gray-500">{location.address}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <p className="text-sm">No locations found</p>
        </div>
      )}
    </div>
  </div>
  )
}


export default Header