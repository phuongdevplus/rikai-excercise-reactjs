import { createContext, useState } from "react";

export const AppContext = createContext({});
export const AppProvider = ({children}) =>{
  const [isLogin, setIsLogin] = useState(false)
  return <AppContext.Provider value={{isLogin, setIsLogin}}>
    {children} 
  </AppContext.Provider>
}