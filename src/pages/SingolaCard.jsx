import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Card from "../components/Card"
import NavBar from "../components/Navbar"
import { Link } from "react-router-dom"
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow,} from "@vis.gl/react-google-maps";
import { modify } from "../redux/citiesSlice"

function SingolaCard(){
    const dispatch = useDispatch()
    const { cardName} = useParams()
    const city = useSelector((state) => 
    state.cities.value.filter((city) => city.name == cardName.toString())[0])

    const position = {  lat: 21.1486391, lng: 19.0956943, };
    const mapOptions = {
      mapTypeControl:false,
      zoomControl:false,
      fullscreenControl:false,
      maxzoom:3,
    };

    const setFotoAlbum = (event) => {
      Object.keys(event.target.files).forEach(key => {
        dispatch(modify({url: URL.createObjectURL(event.target.files[key]), id: city.id}))
      });

  }

  return (
    <>
    <Link to={"/cities"}>
        <span >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </span>
    </Link>


    <div className="rounded-md bg-zinc-950 w-96" >
        <img className=" w-96" src= {city.imgUrl} alt="" />
        <div className="flex flex-col p-4">
        <h2 className="text-2x1 text-white font-bold">{city.name}</h2>
        <p className="text-gray-500 w-80">"{city.description}"</p>
        <span>{city.isVisited ? "✔ visitato" : "❌ non visitato"}</span>
        </div>
    </div>

    <div className=" absolute top-4 right-4 ">
    <APIProvider apiKey={"AIzaSyDUGbxcDFOSzUZ4pKhKk_oY6heB5UBcZXA"}>
      <div className='w-[600px] h-[50vh]  sm:h-[40vh] rounded-md border-sky-200 border-4'>
        <Map 
        defaultCenter={{  lat: city.lat, lng: city.lng, }} 
        mapId={"c826440b43fbf018"} 
        defaultZoom={9}
        options={mapOptions}
        mapTypeId={'hybrid'}
        minZoom={3}
        ></Map>
      </div>
    </APIProvider>
    </div>

    <div className=" bg-zinc-700 w-screen  mt-5 flex gap-2 scroll-m-0 overflow-scroll overflow-y-hidden">
    {city.albumUrls.map(albumUrl => (
      <img className=" h-96" src= {albumUrl} alt="" />
    ))}
      <div className="flex items-center justify-center w-[25vw]">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" multiple onChange={(event) => setFotoAlbum(event)} />
      </label>
      </div> 
    </div>

    

    </>
    //aggiungere mappa zoomata sul posto in questione
  )
}

export default SingolaCard