import axios from "axios";


import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const server = "http://18.61.166.97:9090";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  playlist: string[];
}
interface UserProviderProps {
  children: ReactNode;
}
interface usercontextType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  btnLoading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser:(name:string,email:string,password:string)=>Promise<void>;
  logout:()=>Promise<void>;
  addToPlayList:(id:string)=>Promise<void>
}

const userContext = createContext<usercontextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  async function loginUser(email: string, password: string) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occured");
    } finally {
      setBtnLoading(false);
    }
  }


  async function addToPlayList(id:string) {

   try{ const {data}= await axios.get<{message:string}>(`${server}/api/v1/user/song/${id}`,{headers:{token:localStorage.getItem("token")}})
   toast.success(data.message)
  }
  catch(err:any){
    toast.error(err.response?.data?.message || "An error Occured")
  }
    
  }

  async function logout() {
    localStorage.clear()
    setUser(null)
    setIsAuth(false)
    toast.success("User Logged out")
  }
  async function registerUser(name:string,email: string, password: string) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occured");
    } finally {
      setBtnLoading(false);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login")
        }

        const { data } = await axios.get(`${server}/api/v1/user/user/getprofile`, {
          headers: { token: token },
        });
        setUser(data.user);
        setIsAuth(true);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <userContext.Provider
      value={{ user, isAuth, loading, btnLoading, loginUser,logout,registerUser,addToPlayList  }}
    >
      {" "}
      {children} <Toaster />{" "}
    </userContext.Provider>
  );
};
export const useUserData = (): usercontextType => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
