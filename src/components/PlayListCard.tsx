
import { useUserData } from "../context/UserContext"


function PlayListCard() {
  const {user,isAuth}=useUserData()
  return (
    <div className="flex items-center p-4 pl-8 rounded-lg shadow-md cursor-pointer hover:bg-[#ffffff26]">
      <div className="w-10 h-10 bg-gray-600 flex items-center justify-center rounded-md">
        <i className=" text-white ri-music-2-fill"></i>
</div>
<div className="flex flex-col ml-4"><h4>MyPlayList</h4>
<p className="text-sm text-gray-400">PlayList .{isAuth? <span>{user?.name}</span>:<span>"User</span>} </p></div>



      
    </div>
  )
}

export default PlayListCard
