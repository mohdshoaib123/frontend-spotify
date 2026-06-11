
import { useEffect } from "react"
import Layout from "../components/Layout"
import { useSongData } from "../context/SongContext"
import { useParams } from "react-router-dom"
import Loading from "../components/Loading"
import { useUserData } from "../context/UserContext"



const Album = () => {
  const{fetchAlbumSong,albumSong,albumData,setIsPlaying,setSelectedSong,loading}=useSongData()
  const params=useParams<{id:string}>()
  const {isAuth,addToPlayList}=useUserData()
  
 
 useEffect(()=>{
  if(params.id){
    fetchAlbumSong(params.id)
  }
 },[params.id])

  return (
    <div>
      <Layout>
        {
          albumData && (
            <>
            {
              loading? <Loading />:<>
              <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                {albumData.thumbnail &&
               ( <img src={albumData.thumbnail} className="w-48 rounded" alt="" />)}


               <div
               className="flex flex-col">
                <p>PlayList</p>
                <h2 className="text-3xl font-bold mb-4 md:text-5xl">{albumData.title}PlayList</h2>
                <h4>{albumData.description}</h4>
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
               albumSong.map((s,i)=>{
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

export default Album
