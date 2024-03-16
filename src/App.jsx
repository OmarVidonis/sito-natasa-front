import './App.css'
import Card from './components/Card'
import { useSelector } from 'react-redux'

function App() {
  const cities = useSelector((state) => state.cities.value)


  return (
    <>

    

    <div className='grid grid-cols-4 gap-5'>
      {
      cities.map((city) =>(
        <Card 
        key = {city.id}
        title={city.name} 
        description={city.description} 
        imgUrl={city.imgUrl}
        // isOnline={city.isOnline}
        isVisited={city.isVisited}>
      </Card>
      ))}
    </div>

    </>
  )
}

export default App
