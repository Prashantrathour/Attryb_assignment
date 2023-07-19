import axios from "axios"
import { GET_FAILURE, GET_REQUEST, GET_SUCCESS } from "./actiontype"

export const getInvetory=(query)=>async(dispatch)=>{
    console.log('calling')
const accessToken=localStorage.getItem("token")
    const config={
        headers: {
            Authorization: `Bearer ${accessToken}`,
          }
    }
try {
    dispatch(get_inv_req())
    console.log(query,"filter=mileage&order=desc")
    
    const response=await axios.get(`${"https://pleasant-snaps-elk.cyclic.app"}/inventory/${query}`,config)
dispatch(get_inv_success(response.data.deals))
console.log(response.data.deals)
} catch (error) {
   dispatch(get_inv_fail()) 
}
}


const get_inv_req=()=>{
    return {type:GET_REQUEST}
}
const get_inv_success=(payload)=>{
    return {type:GET_SUCCESS,payload}
}
const get_inv_fail=()=>{
    return {type:GET_FAILURE}
}