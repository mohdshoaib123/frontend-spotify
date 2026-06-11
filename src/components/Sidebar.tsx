import { Link, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import PlayListCard from "./PlayListCard";
import { useUserData } from "../context/UserContext";




function Sidebar() {
  const navigate=useNavigate()
  const {user}=useUserData()
  
  return (
    <div className="w-[25%] h-full p-2 flex-col  gap-2 text-white hedden lg:flex hidden md:block">
       <div className="bg-[#121212] h-[15%] rounded flex flex-col  justify-around">
        <div onClick={()=>navigate('/')} className="flex items-center gap-6 pl-8  cursor-pointer">
          <i className=" font-medium text-2xl  text-white ri-home-5-line"></i>
          <p className=" font-medium">Home</p>
        </div>
 <div className="flex items-center gap-6 pl-8  cursor-pointer">
          <i className=" font-medium text-2xl  text-white ri-search-line"></i>
          
          <p className=" font-medium">Search</p>
        </div>

       </div>
       <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between gap-3">
          <Link to='/' className="flex gap-3 items-center p-4 ">
            <i className="text-xl font-medium ri-book-shelf-line"></i>
            <p className="font-medium">Your library</p>
          </Link>
          <div className="p-4 flex items-center gap-3">
            <i className=" text-xl font-medium ri-arrow-right-line"></i>
            <i className=" text-xl font-medium ri-add-line"></i>
          </div>
          
        </div>
<div onClick={()=>navigate('/playlist')}>
  <PlayListCard></PlayListCard>
</div>
<div className="mt-2 p-5 rounded-lg ">
  <h3 className="font-semibold mb-1">Let's findsome podcasts to follow </h3>
  <p className="text-medium">we'll keep you update on new episodes</p>
  <button className="bg-white text-black font-semibold mt-3 px-4 py-1 rounded-full">browse podcasts</button>
</div>
{user && user.role==="admin" &&(
 <button onClick={()=>navigate('/admin/dashboard')} className="bg-white text-black font-semibold mt-3 px-4 py-1 cursor-pointer rounded-full">Admin Dashboard</button>)}

       </div>
    </div>
  )
}

export default Sidebar
