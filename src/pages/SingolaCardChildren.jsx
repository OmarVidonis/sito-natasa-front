import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Card from "../components/Card"
import NavBar from "../components/Navbar"
import { Link } from "react-router-dom"

function SingolaCardChildren(){
    const { cardId} = useParams()
    const city = useSelector((state) => 
    state.cities.value.filter((city) => city.id == cardId.toString())[0])


  return (
    <>
    <div className="flex justify-center">
        <div className="rounded-md bg-zinc-950 relative w-96 " >
            <img className=" w-96" src= {city.imgUrl} alt="" />
            <div className="flex flex-col p-4">
            <h2 className="text-2x1 text-white font-bold">{city.name}</h2>
            <p className="text-gray-500 w-80">"{city.description}"</p>
            {/* {isOnline ? <div className=" rounded-full bg-green-400 w-4 h-4 top-2 right-2 absolute"></div> : null} */}
            <span>{city.isVisited ? "✔ visitato" : "❌ non visitato"}</span>
            </div>
        </div>
    </div>
    </>
  )
}

export default SingolaCardChildren