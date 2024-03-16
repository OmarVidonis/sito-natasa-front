import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import NavBar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { setCities } from '../redux/citiesSlice'

function Cities() {
  const cities = useSelector((state) => state.cities.value)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://sito-natasa-back.onrender.com/places')
      .then((response) => {
        dispatch(setCities(response.data.data));
        console.log(cities)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return (
    <>
      <NavBar></NavBar>
      <h1 className=" text-center">CITY PAGE</h1>
      <div className='grid grid-cols-4 gap-5 mt-5 mb-5'>
        {
          cities.map((city) => (
            <Link to={`/cities/${city.name}`} key={city.id}>
              <Card
                key={city.id}
                title={city.name}
                description={city.description}
                imgUrl={`https://sito-natasa-back.onrender.com/images/` + city.imgUrl}
                // isOnline={city.isOnline}
                isVisited={city.isVisited}>
              </Card>
            </Link>
          ))}
      </div>

    </>
  )
}

export default Cities

