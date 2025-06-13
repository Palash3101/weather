import { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

function Map({loc_cords, setCoords}) {

  return (
    <div className='px-3 pt-2 bg-(--dark_boxes) flex-1 min-w-0 h-[260px] mx-3 my-3 rounded-[25px]'>
      <div className='text-[20px] font-bold'>Map</div>
      <MapComponent loc_cords={loc_cords} setCoords={setCoords}/>
    </div>
  )
}

function MapComponent({loc_cords, setCoords}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 13;
	
  maptilersdk.config.apiKey = '9AZQO2TOLFXfBUJHbugO';

  useEffect(() => {

  
  function DragCoords(){
    var lngLat = marker.getLngLat();
    setCoords([lngLat.lat, lngLat.lng]);
  } 

  map.current = new maptilersdk.Map({
    container: mapContainer.current,
    style: maptilersdk.MapStyle.STREETS,
    center: [loc_cords[1], loc_cords[0]],
    zoom: zoom
  });


  const marker = new maptilersdk.Marker({
    draggable : true
  })
  .setLngLat([loc_cords[1], loc_cords[0]])
  .addTo(map.current);


  marker.on('dragend', DragCoords);


  }, [loc_cords, zoom]);



  return (
  <div className="relative w-full h-[85%] rounded-[20px] overflow-hidden mt-2">
    <div ref={mapContainer} className="absolute w-full h-full" />
  </div>
  );
}


export default Map