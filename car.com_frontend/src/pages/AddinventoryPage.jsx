import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "./addinvetory.css";
import styles from "./addinvetory.css";
import TableInvetories from "./TableInvetories";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        <h2>All Inventories</h2>
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
  width: 90%;
  margin: auto;
  box-sizing: border-box;
`;

const Left = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const Right = styled.div`
  flex: 1;
  padding-left: 20px;
`;

export default AddInventoryPage;

const AddInventoryForm = () => {
  const { oemdata, Loading, Error } = useSelector((store) => store.oemReducer);
  const [formData, setFormData] = useState({});
  const [id, setid] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can submit the formData to your backend or perform other actions.
   
  };

  return (
    <FormContainer>
      <h2>Add Inventory</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>KM:</Label>
          <Input
            type="number"
            name="km"
            value={formData.km}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Major Scratches:</Label>
          <Select
            name="majorScratches"
            value={formData.majorScratches}
            onChange={handleChange}
          >
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
          />
        </FormGroup>

        <FormGroup>
          <Label>Original Paint:</Label>
          <Select
            name="originalPaint"
            value={formData.originalPaint}
            onChange={handleChange}
          >
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
          />
        </FormGroup>

        <FormGroup>
          <Label>Previous Buyers:</Label>
          <Input
            type="number"
            name="prevBuyers"
            value={formData.prevBuyers}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Registration Place:</Label>
          <Input
            type="text"
            name="registrationPlace"
            value={formData.registrationPlace}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Select car </Label>
          <select name="oemId" onChange={handleChange} value={formData.oemId}>
            {oemdata.map((i) => (
              <option value={i._id}>{i.make}</option>
            ))}
          </select>
        </FormGroup>

        <FormGroup>
          <Label>Image URL:</Label>
          <Input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit">Add Inventory</Button>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
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
