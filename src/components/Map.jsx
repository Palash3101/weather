import { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

function Map({loc_cords}) {
  

  return (
    <div className='px-3 pt-2 bg-(--dark_boxes) flex-1 min-w-0 h-[260px] mx-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Map</div>
      <MapComponent loc_cords={loc_cords}/>
    </div>
  )
}

function MapComponent({loc_cords}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const city = loc_cords;
  const zoom = 12;
	
  maptilersdk.config.apiKey = '9AZQO2TOLFXfBUJHbugO';

  useEffect(() => {
  if (map.current) return; // stops map from intializing more than once

  map.current = new maptilersdk.Map({
    container: mapContainer.current,
    style: maptilersdk.MapStyle.STREETS,
    center: [city[1], city[0]],
    zoom: zoom
  });

  
}, [city[0], city[1], zoom]);

  return (
  <div className="relative w-full h-[85%] rounded-[20px] overflow-hidden mt-2">
    <div ref={mapContainer} className="absolute w-full h-full" />
  </div>
  );
}


export default Map