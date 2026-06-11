import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { useSongData, type Song } from "../context/SongContext"
import { useUserData } from "../context/UserContext"
import Loading from "../components/Loading"


const Playlist = () => {
   const{songs,albumData,setIsPlaying,setSelectedSong,loading}=useSongData()
   const[myPlayList,setMyPlayList]=useState<Song[]>([])
   const{user,addToPlayList,isAuth}=useUserData()
   useEffect(()=>{
    if(songs && user?.playlist){
      const filteredSongs=songs.filter((song)=>(
      user.playlist.includes(song.id.toString())
      ))
      setMyPlayList(filteredSongs)
    }
   },[songs,user?.playlist])
   
  return (
    <div>
      <Layout>
        {
          myPlayList && (
            <>
            {
              loading? <Loading />:<>
              <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                
                <img src="/music.jpg" className="w-48 rounded" alt="" />


               <div
               className="flex flex-col">
                <p>PlayList</p>
                <h2 className="text-3xl font-bold mb-4 md:text-5xl">{user?.name} PlayList</h2>
                <h4>Your Favourate songs </h4>
                <p className="mt-1">
                  <i className="  text-3xl ri-spotify-fill"></i>
                </p>
               </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p><b className="mr-4">#</b></p>
                <p className="hidden sm:block">Description</p>
                <p className="text-center">Actions</p>
              </div>
              <hr />

              {
               myPlayList.map((s,i)=>{
                  return(
                     <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer" key={i}>
                      
                      <p className="text-white">
                        <b className="mr-4 text-[#a7a7a7] ">{i+1}</b>
                      
                       <img src={s.thumbnail || "/music.jpg"} className="inline w-10 mr-5" />
                        {s.title}
                      </p>
                      <p className="text-[15px] hidden sm:block">{s.description.slice(0,30)}...</p>
                      <p className="flex justify-center items-center gap-5">
                       {isAuth && <button onClick={()=>addToPlayList(s.id)} className="text-[15px] text-center"><i  className="text-2xl ri-bookmark-line"></i></button>}
                         <button onClick={()=>{
                          setSelectedSong(s.id)
                          setIsPlaying(true)
                         }} className="text-[15px] text-center"> <i className=" text-2xl ri-music-2-fill"></i></button>
                      </p>
                     </div>
                  )
                })
              }
              </>
            }
            </>
          )
        }
      </Layout>
    </div>
  )
}

export default Playlist
