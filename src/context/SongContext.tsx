import axios from 'axios'

import {createContext,useContext,useEffect,useCallback,useState, type ReactNode} from 'react'

const server='http://18.61.166.97:9090'

export interface Song{
id:string,
title:string,
description:string,
thumbnail:string,
audio:string,
album:string
}
export interface Album{
id:string,
title:string,
description:string,
thumbnail:string,
album:[]

}
interface SongContextType{
  songs:Song[];
  isPlaying:boolean;
  setIsPlaying:(value:boolean)=>void;
  loading:boolean;
  selectedSong:string | null;
  setSelectedSong:(value:string)=>void;
  albums:Album[],
  fetchSingleSong:()=>Promise<void>,
  song:Song |null,
  nextSong:()=>void,
  preSong:()=>void,
  albumSong:Song[],
  albumData:Album |null,
  fetchAlbumSong:(id:string)=>Promise<void> ,
  fetchSongs:()=>Promise<void>,
  fetchAlbums:()=>Promise<void>
}

const SongContext=createContext<SongContextType |undefined>(undefined)

interface SongProviderProps{
  children:ReactNode
}

export const SongProvider:React.FC<SongProviderProps>=({children})=>{
  const [songs,setSongs]=useState<Song[]>([])
  const [loading,setLoading]=useState<boolean>(true)
  const [selectedSong,setSelectedSong]=useState<string | null>(null)
  const [isPlaying,setIsPlaying]=useState<boolean>(false)
  const [albums,setAlbums]=useState<Album[]>([])
  const [song,setSong]=useState<Song |null>(null)
  const [index,setIndex]=useState<number>(0)
  const [albumSong,setAlbumSong]=useState<Song[]>([])
  const[albumData,setAlbumData]=useState<Album|null>(null)

const fetchAlbumSong=useCallback(async(id:string)=>{
  setLoading(true)
  try{
    const{data}=await axios.get<{songs:Song[];album:Album}>(`${server}/api/v1/song/album/${id}`)
    
    
    setAlbumData(data.album)
    setAlbumSong(data.songs)
    }

    catch(err:any){
      console.log(err)
    }
    finally{
      setLoading(false)
      
    }

},[])

  const fetchSongs= useCallback(async ()=>{
    setLoading(true)

    try {
    const {data}=await axios.get<Song[]>(`${server}/api/v1/song/getsong/all`)
    setSongs(data);
    if(data.length>0) setSelectedSong(data[0].id.toString())
    setIsPlaying(false)
}
catch(err){
  console.log(err)

}
finally{
  setLoading(false)
}
  
  },[])

const fetchAlbums=useCallback(async ()=>{
  setLoading(true)
  try {
    const {data}=await axios.get<Album[]>(`${server}/api/v1/song/getalbum/all`);
    setAlbums(data)
    
    
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false)
  }
},[])



const nextSong=useCallback(()=>{
  if(index===songs.length-1){
    setIndex(0);
    setSelectedSong(songs[index]?.id.toString());} 

    else{
      setIndex((preIndex)=>preIndex+1);
      setSelectedSong(songs[index+1]?.id.toString())
    }
},[index,songs])

const preSong=useCallback(()=>{
  if(index>0){
    setIndex((pre)=>pre-1)
    setSelectedSong(songs[index-1]?.id.toString())


  }
},[index,songs])


const fetchSingleSong=useCallback(async ()=>{
  if(!selectedSong) return;

  try{
    const {data}=await axios.get<Song>(`${server}/api/v1/song/getsingle/song/${selectedSong}`)
    setSong(data)
  }
  catch(err){
    console.log(err)

  }
},[selectedSong])


  useEffect(()=>{
    fetchSongs()
    fetchAlbums()
  },[])

  return (
    <SongContext.Provider value={{songs,selectedSong,setSelectedSong,isPlaying,setIsPlaying,loading,albums,song,fetchSingleSong,nextSong,preSong,albumData,albumSong,fetchAlbumSong,fetchAlbums,fetchSongs}}>
      {children}
    
    </SongContext.Provider>
  )}

  export const useSongData=():SongContextType=>{
    const context=useContext(SongContext)
    if(!context){
      throw new Error ("useSongData must be used within a songprovider")
    }
    return context 

  }
