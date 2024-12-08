import { createContext, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const 
    const [token, setToken] = useState('')



    const value = {
        doctors,
        currencySymbol
    }

    return(
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider