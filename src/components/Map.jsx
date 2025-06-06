import { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

function Map() {
  

  return (
    <div className='px-3 pt-2 bg-(--dark_boxes) w-[700px] h-[310px] mx-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Map</div>
      <MapComponent />
    </div>
  )
}

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 42.50692, lat: 1 };
  const zoom = 14;

  maptilersdk.config.apiKey = '9AZQO2TOLFXfBUJHbugO';

  useEffect(() => {
  if (map.current) return; // stops map from intializing more than once

  map.current = new maptilersdk.Map({
    container: mapContainer.current,
    style: maptilersdk.MapStyle.STREETS,
    center: [tokyo.lng, tokyo.lat],
    zoom: zoom
  });

  
}, [tokyo.lng, tokyo.lat, zoom]);

  return (
  <div className="relative w-full h-[85%] rounded-[20px] overflow-hidden mt-2">
    <div ref={mapContainer} className="absolute w-full h-full" />
  </div>
  );
}


export default Map