import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/citiesSlice";
import { replacePositionMapSelector } from "../redux/positionMapSelectorSlice";
import { setStatoFormCardOpen } from "../redux/statoFormCardOpenSlice";
import { useSnackbar } from 'notistack';


function FormCard() {
    const positionMapSelected = useSelector((state) => state.positionMapSelector.value)
    const dispatch = useDispatch()
    const cities = useSelector((state) => state.cities.value)
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState();
    const [description, setDescription] = useState('');
    const [isVisited, setIsVisited] = useState(false);
    const [lat, setLat] = useState(positionMapSelected.lat);
    const [lng, setLng] = useState(positionMapSelected.lng);
    const [albumUrls, setAlbumUrls] = useState([]);

    const handleSavePlace = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('imgUrl', imgUrl);
        formData.append('description', description);
        formData.append('isVisited', isVisited);
        formData.append('lat', lat);
        formData.append('lng', lng);
        formData.append('albumUrls', []);
        console.log(imgUrl)
        axios.post('https://sito-natasa-back.onrender.com/places', formData)
            .then(res => console.log(res))
            .then(dispatch(setStatoFormCardOpen(false)))
            .catch(err => console.log(err))



        // const data = new FormData();
        // data.append('name', name);
        // data.append('imgUrl', imgUrl);
        // data.append('description', description);
        // data.append('isVisited', isVisited);
        // data.append('lat', lat);
        // data.append('lng', lng);
        // data.append('albumUrls', albumUrls);
        // setLoading(true);
        // axios
        //     .post('http://localhost:5555/places', data)
        //     .then(() => {
        //         setLoading(false);
        //         enqueueSnackbar('Place Created successfully', { variant: 'success' });
        //         dispatch(setStatoFormCardOpen(false));
        //     })
        //     .catch((error) => {
        //         setLoading(false);
        //         // alert('An error happened. Please Chack console');
        //         enqueueSnackbar('Error', { variant: 'error' });
        //         console.log(error);
        //     });
    };

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     const city = {
    //         id: Math.random(),
    //         name: dati.name,
    //         imgUrl: dati.imgUrl,
    //         description: dati.description,
    //         isVisited: dati.isVisited,
    //         lng: positionMapSelected.lng,
    //         lat: positionMapSelected.lat,
    //         albumUrls: dati.album,
    //     }
    //     dispatch(add(city))
    //     dispatch(setStatoFormCardOpen(false))
    //     inviaDati({
    //         name: "",
    //         imgUrl: "",
    //         description: "",
    //         isVisited: false,
    //     })
    // }

    const setFotoAlbum = (event) => {
        let albumArr = [];
        Object.keys(event.target.files).forEach(key => {
            albumArr.push(URL.createObjectURL(event.target.files[key]))
        });
        setAlbumUrls(albumArr);
    }


    return (
        <>
            <div className=' inline-block '>
                <form onSubmit={handleSavePlace} encType="multipart/form-data" className="hover:shadow-cyan-200 shadow-lg flex flex-col gap-3 w-80 mb-5 bg-zinc-900 p-5 rounded-lg">
                    <div className="flex flex-col">
                        <label>NAME</label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label>DESCRIZIONE</label>
                        <textarea name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="flex flex-col">
                        <label>IMMAGINE</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={(e) => setImgUrl(e.target.files[0])}></input>
                    </div>
                    <div className="flex flex-col">
                        <label>ALBUM</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple onChange={(event) => setFotoAlbum(event)}></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Visitata?</label>
                        <input type="checkbox" name="isVisited" checked={isVisited} onChange={(e) => setIsVisited(e.target.checked)} />
                    </div>
                    <button className="bg-zinc-950" type="submit">ADD CARD</button>
                </form>
            </div>
        </>
    );
}

export default FormCard