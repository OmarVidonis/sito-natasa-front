import Card from '../components/Card'
import { useSelector } from 'react-redux'
import NavBar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function CitiesChildren() {
  const cities = useSelector((state) => state.cities.value)


  return (
    <>
    <NavBar></NavBar>
    <h1>CHILDREN CITY PAGE</h1>
    <div className='grid grid-cols-4 gap-5 mt-5 mb-5'>
      {
      cities.map((city) =>(
        <Link to={`/cities-children/${city.id}`} key={city.id}>
            <Card 
                key = {city.id}
                title={city.name} 
                description={city.description} 
                imgUrl={city.imgUrl}
                // isOnline={city.isOnline}
                isVisited={city.isVisited}>
            </Card>
        </Link>
      ))}
    </div>
        <Outlet></Outlet>
    </>
  )
}

export default CitiesChildren
