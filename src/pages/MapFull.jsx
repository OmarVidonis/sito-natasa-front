"use client";
import NavBar from '../components/Navbar';
import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow,} from "@vis.gl/react-google-maps";
import FormCard from '../components/FormCard';
import { useDispatch, useSelector } from 'react-redux';
import { replacePositionMapSelector } from '../redux/positionMapSelectorSlice';
import { setStatoFormCardOpen } from '../redux/statoFormCardOpenSlice';
import CardInfoMap from '../components/CardInfoMap';

const position = {  lat: 21.1486391, lng: 19.0956943, };
const mapOptions = {
  mapTypeControl:false,
  zoomControl:false,
  fullscreenControl:false,
  maxzoom:3,
};

let details = navigator.userAgent; 
let regexp = /android|iphone|kindle|ipad/i; 
let isMobileDevice = regexp.test(details); 
let zoomNumber = isMobileDevice ? 4 : 3;



export default function MapFull() {
  const cities = useSelector((state) => state.cities.value)
  const [cityMarkerWindow, setCityMarkerWindow] = useState({})
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const statoFormCardOpen = useSelector((state) => state.statoFormCardOpen.value)
  

  const openWindow = (event) => {
    if(open){
      setOpen(false)
      return;
    }
    if(statoFormCardOpen){
      dispatch(setStatoFormCardOpen(false));
    }else{
      dispatch(setStatoFormCardOpen(true));
      dispatch(replacePositionMapSelector({
        lng:event.detail.latLng.lng,
        lat:event.detail.latLng.lat,
      }))
    }
    
  }

  const openMarkerWindow = (event) => {
    const city = cities.filter((city) => city.lat == event.latLng.lat() && city.lng == event.latLng.lng() )[0];
    setCityMarkerWindow(city)
    setOpen(true)
  }

  return (
    <>
    {statoFormCardOpen &&  <div className='absolute max-w-min form  left-0 right-0 m-auto top-1/3 z-10 opacity-95 '>
    <FormCard></FormCard>
    </div>}
    
    <NavBar></NavBar>
    <APIProvider apiKey={"AIzaSyDUGbxcDFOSzUZ4pKhKk_oY6heB5UBcZXA"}>
      <div className='w-screen h-[50vh]  sm:h-[90vh] rounded-md border-amber-300 border-4 mt-20'>
        <Map 
        defaultCenter={position} 
        mapId={"c826440b43fbf018"} 
        defaultZoom={zoomNumber}
        options={mapOptions}
        mapTypeId={'hybrid'}
        minZoom={3}
        onClick={(event) =>openWindow(event)}>
          { cities.map((city) =>(
            <AdvancedMarker onClick={(event) => openMarkerWindow(event)} key={city.id} position={{lat: city.lat, lng: city.lng}}>
              {city.isVisited ? 
              <Pin
              background={"green"}
              borderColor={"darkgreen"}
              glyphColor={"white"} 
              />: 
              <Pin
              background={"red"}
              borderColor={"darkred"}
              glyphColor={"white"}
              />  }
            </AdvancedMarker>
          ))}

          {open && (

            <InfoWindow position={{lat:cityMarkerWindow.lat, lng:cityMarkerWindow.lng}} onCloseClick={() => setOpen(false)}>
              <CardInfoMap 
                key = {-1}
                title={cityMarkerWindow.name} 
                description={cityMarkerWindow.description} 
                imgUrl={cityMarkerWindow.imgUrl}
                isVisited={cityMarkerWindow.isVisited}>
            </CardInfoMap>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
    </>
  );

}





