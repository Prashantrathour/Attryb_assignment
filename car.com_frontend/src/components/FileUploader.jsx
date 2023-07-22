import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorAlert, succesAlert } from './Notifications'
import { ToastContainer } from 'react-toastify'
import { saveImageurl } from '../redux/postInvetory/action'

function FileUploader() {
    const dispatch=useDispatch()
    const [image,setimage]=useState("")
    const [loading,setloading]=useState(false)
  

    const submitimage=async()=>{
        const images=new FormData()
        images.append("file",image)
        images.append("upload_preset","prashant_cloud")
        images.append("cloud_name","djpuwf2xv")
        try {
            setloading(true)
            const res=await axios.post(`https://api.cloudinary.com/v1_1/djpuwf2xv/image/upload`,images)
        
            dispatch(saveImageurl(res.data.url))
            succesAlert("image uploaded successfully")
            setloading(false)
            setimage("")
        } catch (error) {
         
            errorAlert("image upload failed")
            setloading(false)
        }
    }
  return (
    <div>
        <input  type="file" name="image" id="image" onChange={(e)=>setimage(e.target.files[0])} />
        <button disabled={loading} onClick={submitimage}>{!loading?"Upload":"Loading..."}</button>
        <ToastContainer/>
    </div>
  )
}

export default FileUploader