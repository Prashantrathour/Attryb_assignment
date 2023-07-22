import axios from "axios"
import { GET_FAILURE_OEM, GET_REQUEST_OEM, GET_SUCCESS_OEM } from "./actiontype"
import { Hearts } from "react-loader-spinner"

export const getOEM=(query)=>async(dispatch)=>{


try {
    dispatch(get_oem_req())
    const headers={
        'Content-Type': 'application/json',
      'mode': 'no-cors'
      }
    
    const response=await axios.get(`${process.env.REACT_APP_BASEURL}/OEM_spaces/getspecs${query?`?search=${query}`:""}`,headers)
dispatch(get_oem_success(response.data))

} catch (error) {
   dispatch(get_oem_fail()) 
}
}


const get_oem_req=()=>{
    return {type:GET_REQUEST_OEM}
}
const get_oem_success=(payload)=>{
    return {type:GET_SUCCESS_OEM,payload}
}
const get_oem_fail=()=>{
    return {type:GET_FAILURE_OEM}
}