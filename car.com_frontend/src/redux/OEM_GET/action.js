import axios from "axios"
import { GET_FAILURE_OEM, GET_REQUEST_OEM, GET_SUCCESS_OEM } from "./actiontype"

export const getOEM=(query)=>async(dispatch)=>{
    console.log('calling')
const accessToken=localStorage.getItem("token")
    const config={
        headers: {
            Authorization: `Bearer ${accessToken}`,
          }
    }
try {
    dispatch(get_oem_req())
   
    
    const response=await axios.get(`${"https://pleasant-snaps-elk.cyclic.app"}/OEM_spaces/getspecs?search=${query}`)
dispatch(get_oem_success(response.data))
console.log(response)
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