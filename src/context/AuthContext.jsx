import { createContext, useContext, useState, useEffect } from "react";
import {login as apiLogin} from '../api/auth'

const AuthContext = createContext(null);

export function AuthProvider({children}){
   const [user, setUser] = useState(null)
   const [loading,setLoading] = useState(true)

   useEffect(()=>{
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')
    if (storedUser && token) {
        setUser(JSON.parse(storedUser))
    }
    setLoading(false)
   }, [])

   async function login(email, password){
     const data = await apiLogin(email, password);
     localStorage.setItem('access_token', data.access_token);
     localStorage.setItem('user', JSON.stringify(data.user));
     setUser(data.user);
     return data.user;
   }

   function logout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setUser(null)
   }

   const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    loading,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export function useAuth(){
    return useContext(AuthContext);
}