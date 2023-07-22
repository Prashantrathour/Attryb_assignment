import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "./addinvetory.css";
import styles from "./addinvetory.css";
import TableInvetories from "./TableInvetories";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postInvetory, post_inv_req, post_inv_success, saveImageurl } from "../redux/postInvetory/action";
import { errorAlert, succesAlert } from "../components/Notifications";

import { ToastContainer } from "react-toastify";
import FileUploader from "../components/FileUploader";

const AddInventoryPage = () => {

    const navigate=useNavigate()
    useEffect(()=>{
        let token=localStorage.getItem("token")
        if(!token){
           navigate('/login') 
        }
    })
  return (
    <Container>
      <Left>
        <h2>All OEM Specs</h2>
        <TableInvetories />
      </Left>
      <Right>
        <h2>Add Inventory</h2>
        <AddInventoryForm />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 97%;
  row-gap: 10px;
 margin: 10px;
  box-sizing: border-box;
  flex-wrap: wrap;
justify-content: center;
`;

const Left = styled.div`
  flex: 1;
  
  width: 100%;
`;

const Right = styled.div`
  flex: 1;

  width: 100%;
`;

export default AddInventoryPage;

const AddInventoryForm = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  const { oemdata, Loading, Error } = useSelector((store) => store.oemReducer);
  const {url}=useSelector((store)=>store.postinvetoryReducer)

  const { isLoading, isError } = useSelector((store) => store.postinvetoryReducer);
  const [formData, setFormData] = useState({});
  const [id, setid] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(url){
      formData.img=url
    
   try {
    dispatch(post_inv_req())

    const res=await dispatch(postInvetory(formData))

    dispatch(post_inv_success())
    succesAlert(res.data.msg)
  dispatch(saveImageurl(""))
   } catch (error) {

    errorAlert(error.response.data.msg)
   }
  }else{
    errorAlert("image upload failed")
    
  }
  };
useEffect(()=>{
  const userid=localStorage.getItem("userid");
  const token=localStorage.getItem("token");
  if(!userid|| !token){
    navigate("/login")

  }
},[])
  return (
    <FormContainer>
     <FormGroup>
          <Label>Image URL:</Label>
          <FileUploader/>
        </FormGroup>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>KM:</Label>
          <Input
            type="number"
            name="km"
            value={formData.km}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Major Scratches:</Label>
          <Select
            name="majorScratches"
            value={formData.majorScratches}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Price:</Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Original Paint:</Label>
          <Select
            name="originalPaint"
            value={formData.originalPaint}
            onChange={handleChange}
            required
          >
             <option value="">--Select--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Accidents:</Label>
          <Input
            type="number"
            name="accidents"
            value={formData.accidents}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Previous Buyers:</Label>
          <Input
            type="number"
            name="prevBuyers"
            value={formData.prevBuyers}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Registration Place:</Label>
          <Input
            type="text"
            name="registrationPlace"
            value={formData.registrationPlace}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Select car </Label>
          <select required name="oemId" onChange={handleChange} value={formData.oemId}>
          <option value="">--Select--</option>
           {oemdata?.map((i) => (
              <option value={i._id}>{i.make}</option>
            ))} 
          </select>
        </FormGroup>

        

        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
<ToastContainer/>
        <Button disabled={isLoading} type="submit">{!isLoading?"Add Inventory":"Loading..."}</Button>
      </Form>
      
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding:10px ;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
