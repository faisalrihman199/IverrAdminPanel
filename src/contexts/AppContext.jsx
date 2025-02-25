import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const APPContext = createContext();

const APP_Provider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const server = import.meta.env.VITE_APP_API_URL;
  const getCurrentTheme = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';


  const [theme,setTheme]=useState(localStorage.getItem('themeColor') || getCurrentTheme());
 
  console.log("Server is :", server);
  useEffect(()=>{
    console.log("Theme Chnaged :", theme);
    
  },[theme])


  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const getConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,

      }
    };
  };
  const Login=async(data)=>{
      const response = await axios.post(`${server}/auth/login`, data);
      return response.data;

  }
  
  

  const provider = {
    //Theme 
    theme,setTheme, 
    //Auth
    Login,user,setUser,
  };

  return (
    <APPContext.Provider value={provider}>
      {children}
    </APPContext.Provider>
  );
};

const useAPP = () => useContext(APPContext);

export { APP_Provider, useAPP };
