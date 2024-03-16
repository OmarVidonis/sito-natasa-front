import FormCard from "../components/FormCard"
import NavBar from "../components/Navbar"
import { useEffect } from "react"

function Home() {


    return (
        <>
            <NavBar></NavBar>
            <div className="flex items-center justify-center w-screen" >
                <FormCard></FormCard>
            </div>
        </>
    )
}

export default Home