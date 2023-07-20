import axios from "axios"
import { POST_FAILURE, POST_REQUEST, POST_SUCCESS } from "./actiontype"

export const postInvetory=(data)=>async(dispatch)=>{
    console.log('calling')
const accessToken=localStorage.getItem("token")
    const config={
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
      'mode': 'no-cors'
          }
    }
try {
    dispatch(post_inv_req())
    return await axios.post(`${process.env.REACT_APP_BASEURL}/inventory`,data,config)
    
} catch (error) {
   dispatch(post_inv_fail()) 
}
}


export const post_inv_req=()=>{
    return {type:POST_REQUEST}
}
export const post_inv_success=()=>{
    return {type:POST_SUCCESS}
}
export const post_inv_fail=()=>{
    return {type:POST_FAILURE}
}