import { useNavigate } from "react-router-dom"
import { useUserData } from "../context/UserContext"


function Navbar() {
  const navigate=useNavigate()
  const {isAuth,logout}=useUserData()

  return (
    <>
    <div className=" w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <i onClick={()=>navigate(-1)} className="cursor-pointer text-4xl    ri-arrow-drop-left-line"></i>
        <i onClick={()=>navigate(+1) } className=" text-4xl cursor-pointer ri-arrow-drop-right-line"></i>
      </div>

      <div className="flex items-center gap-4 ">
        <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">Explore Premium</p>
        <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">Install App </p>

       {isAuth? <p onClick={logout} className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full ">Logout</p>: <p onClick={()=>navigate("/login")} className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full ">Login</p>}
        
      </div>
    </div>

    <div className="flex items-center gap-2 mt-4">
      <p onClick={()=>navigate('/')} className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">All</p>
       <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">Music</p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">podcasts</p>
         <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer block md:hidden" onClick={()=>navigate("/playlist")}>Playlist</p>

    </div>
    </>
  )
}

export default Navbar
