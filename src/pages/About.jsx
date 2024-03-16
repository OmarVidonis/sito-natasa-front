import NavBar from "../components/Navbar"
import useCounterTimer from "../hooks/useCounterTimer"

function About(){
    useCounterTimer()

    return(
        <>
        <NavBar></NavBar>
        <h1 className="text-3xl font-bold">BENVENUTO IN ABOUT 📘</h1>
        </>
    )
}

export default About