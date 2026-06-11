import {Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { useUserData } from '../context/UserContext'
import Loading from '../components/Loading'
import Register from '../pages/Register'
import Album from '../pages/Album'
import Playlist from '../pages/Playlist'
import Admin from '../pages/Admin'






function AppRoute() {
  const{isAuth,loading}=useUserData()
  return (
    <div>
      
      
      {loading?(<Loading/>):(
  <Routes>
    
    <Route path='/' element={isAuth?<Home></Home>:<Login></Login>}>  </Route>
    <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}>  </Route>
        <Route path='/album/:id' element={<Album></Album>}>  </Route>
         <Route path='/playlist' element={isAuth ?<Playlist></Playlist>:<Login></Login>}>  </Route>
         <Route path='/admin/dashboard' element={isAuth?<Admin></Admin>:<Login></Login>}>  </Route>



   
  </Routes>
)}

    </div>
  )
}

export default AppRoute

