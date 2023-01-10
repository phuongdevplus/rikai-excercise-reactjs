import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [getStorage, setGetStorage] = useState(false)
  const [callApiContent, setCallApiContent] = useState(false)
  const [user, setUser] = useState()
  const [allUser, setAllUser] = useState()

  const REACT_APP_URL_KEY = process.env.REACT_APP_URL_KEY
  async function getAllUser() {
    const urlGetAllUser = process.env.REACT_APP_URL_WEBSITE + '/authors'
    await axios.get(urlGetAllUser)
      .then((data) => {
        setAllUser(data?.data?.data)
      })
  }

  useEffect(()=>{
    getAllUser()
  },[])
  
  useEffect(() => {
    const userInfoFromStorage = JSON.parse(localStorage.getItem(REACT_APP_URL_KEY))
    setUser(userInfoFromStorage?.user)
  }, [getStorage])

  return <AppContext.Provider value={{ isLogin, setIsLogin,allUser, callApiContent, setCallApiContent, user, setUser, getStorage, setGetStorage }}>
    {children}
  </AppContext.Provider>
}