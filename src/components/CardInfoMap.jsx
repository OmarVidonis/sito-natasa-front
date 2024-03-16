function CardInfoMap({imgUrl, title, description, isVisited, isOnline, isAdmin}){
    return (
    <div className="rounded-md bg-zinc-950 " >
        <img className=" w-96" src= {imgUrl} alt="" />
        <div className="flex flex-col p-4 w-96">
        <h2 className="text-2x1 text-white font-bold">{title}</h2>
        <p className="text-gray-500">{description}</p>
        {/* {isOnline ? <div className=" rounded-full bg-green-400 w-4 h-4 top-2 right-2 absolute"></div> : null} */}
        {isVisited ? <span className=" text-green-400">✔ visitato</span> : <span className=" text-red-600">da visitare</span>}
        </div>
    </div>

    );
}

export default CardInfoMap