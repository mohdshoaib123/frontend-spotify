import { useSongData } from "../context/SongContext"
import { useUserData } from "../context/UserContext"

interface SongCardProps{
  image:string,
  name:string,
  des:string,
  id:string
}

const  SongCard:React.FC<SongCardProps>=({image,name,des,id})=> {
  const{addToPlayList,isAuth}=useUserData()
  const {setSelectedSong,setIsPlaying}=useSongData()
const addSong=()=>{
  addToPlayList(id)

}

  return (
    <div className="min-w-45 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <div className="relative group">
        <img src={image? image:"music.jpg"} alt={name} className="mr-1 w-40 h-35 object-cover rounded" />
        <div className="flex gap-2">
          <button onClick={()=>{setSelectedSong(id)
            setIsPlaying(true)
          }} className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i className="ri-music-2-fill"></i>
          </button>
          {isAuth && (
           <button onClick={addSong}  className="absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i  className="ri-bookmark-line"></i>
          </button>)
}
        </div>

      </div>
      <p className="font-bold mt-2 mb-1">{name}</p> 
      <p className="text-slate-200 text-sm">{des.slice(0,20)}...</p>     
    </div>
  )
}

export default SongCard
