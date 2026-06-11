import { useState } from "react"

import { useUserData } from "../context/UserContext"
import { Link } from "react-router-dom"


const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const {btnLoading,loginUser}=useUserData()
  const submitHandler=async(e:any)=>{
e.preventDefault()
loginUser(email,password)

  }
  return (
    <div className="flex justify-center items-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full ">
        <h2 className="text-3xl font-semibold text-center mb-8">Login to spotify </h2>
        <form onSubmit={submitHandler} className=" mt-8">
          <div className="mb-4">

            <label className="block text-sm mb-1 " >Email or username</label>
            <input className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 " type="email" placeholder="Email or username" onChange={(e)=>setEmail(e.target.value)} value={email} required />


          </div>
           <div className="mb-4">

            <label className="block text-sm mb-1 " >password</label>
            <input className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 " type="password" placeholder=" Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
</div>
<button  disabled={btnLoading} className="w-full bg-green-500 hover:bg-green-400 text-black p-3 font-semibold rounded-full cursor-pointer"> {btnLoading?"please wait...":"Login"}</button>
        </form>
        <div className="text-center p-6">
          <Link className="text-sm text-gray-400 hover:text-gray-300" to="/register">
          Don't have any account?
          </Link>
        </div>

      </div>
      
    </div>
  )
}

export default Login
