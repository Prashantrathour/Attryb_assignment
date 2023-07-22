// authActions.js

import axios from "axios"
import Cookies from "js-cookie"

export const idcollection = (id) => {
    return {
        type: 'ID_COLLECT',
        payload:id
        
    
    }
  }
export const idcollection_include = (id) => {
    return {
        type: 'ID_COLLECT_INCLUDES',
        payload:id
        
    
    }
  }
export const selectedDelete = (ids)=>async(dispatch)=> {
  const accessToken = Cookies.get("token");
  const config={
      headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
    'mode': 'no-cors'
        }
  }
try {
  dispatch(select_delete_req())
  return  await axios.delete(`${process.env.REACT_APP_BASEURL}/inventory/${ids}`,config)
  
} catch (error) {
 dispatch(select_delete_fail()) 
}
  }
  
export   const select_delete_req =()=>{
  return {type:"DELETE_REQ"}
}
export  const select_delete_success =()=>{
  return {type:"DELETE_SUCCESS"}
}
 export const select_delete_fail =()=>{
  return {type:"DELETE_FAIL"}
}
  