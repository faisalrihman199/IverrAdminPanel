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


  const [theme, setTheme] = useState(localStorage.getItem('themeColor') || getCurrentTheme());

  console.log("Server is :", server);
  useEffect(() => {
    console.log("Theme Chnaged :", theme);

  }, [theme])

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
  const Login = async (data) => {
    const response = await axios.post(`${server}/auth/login`, data);
    return response.data;
  }
  const updateInfo=async (data) => {
    const response = await axios.post(`${server}/auth/update`, data, getConfig());
    return response.data;
  }
  const saveData = async (data, endpoint, id) => {

    let url = `${server}/${endpoint}/save`;
    if (id) {
      url += `?id=${id}`;
    }
    console.log("URL is :", url);

    const response = await axios.post(url, data, getConfig());
    return response.data;
  }
  const getData = async (endpoint, id) => {
    let url = `${server}/${endpoint}`;
    if (id) {
      url += `?id=${id}`;
    }
    const response = await axios.get(url, getConfig());
    return response.data;
  }
  const dashboardData = async () => {
    const response = await axios.get(`${server}/admin/dashboard`, getConfig());
    return response.data;
  }




  const provider = {
    //Theme 
    theme, setTheme,
    //Auth
    Login, user, setUser,updateInfo,

    //Data
    saveData,getData,

    //Dashboard
    dashboardData,
  };

  return (
    <APPContext.Provider value={provider}>
      {children}
    </APPContext.Provider>
  );
};

const useAPP = () => useContext(APPContext);

export { APP_Provider, useAPP };
