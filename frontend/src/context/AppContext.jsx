import { createContext, useState } from "react";
import axios from "axios";
import { doctors } from "../assets/assets";
import { toast } from "react-toastify";
import { set } from "mongoose";

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [token, setToken] = useState('')

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    

    const value = {
        doctors,
        currencySymbol,
        token,setToken,
    }
    return(
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider