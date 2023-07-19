import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { errorAlert, succesAlert } from './Notifications';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getInvetory } from '../redux/getInvetory/action';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const DIV = styled.div`
  max-height: 100%;
  border: 1px solid red;
  width:500px;
  background-color:white;
  padding:10px;
  border-radius: 10px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  padding: 4px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 4px;
  margin-bottom: 3px;
`;
const Flex = styled.label`
  display: flex;
  width: 250px;
  text-overflow: ellipsis;
  justify-content: space-between;

 
`;

const Option = styled.option``;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditCarDetailsForm = ({ carDetails, onSave }) => {
    const dispatch=useDispatch()
  const [editedCarDetails, setEditedCarDetails] = useState(carDetails);
  const [loading, setloading] = useState(false);

  const handleChange =async( e) => {
    const { name, value } = e.target;
    setEditedCarDetails({
      ...editedCarDetails,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
 

    onSave(editedCarDetails);
  };


  return (
    <DIV>
      <Form onSubmit={handleSubmit}>
      <ToastContainer/>
        <Label>
          Kilometers:
          <Input type="number" name="km" value={editedCarDetails.km} onChange={handleChange} />
        </Label>
        <Flex>
        <Label>
          Major Scratches:
          <Select name="majorScratches" value={editedCarDetails.majorScratches} onChange={handleChange}>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Label>
        <Label>
          Original Paint:
          <Select name="orginalPaint" value={editedCarDetails?.orginalPaint} onChange={handleChange}>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Label></Flex>
        <Label>
          Price:
          <Input type="number" name="price" value={editedCarDetails.price} onChange={handleChange} />
        </Label>
        <Flex>
        <Label>
          Accidents:
          <Input type="number" name="accidents" value={editedCarDetails.accidents} onChange={handleChange} />
        </Label>
        <Label>
          Previous Buyers:
          <Input type="number" name="prevBuyers" value={editedCarDetails.prevBuyers} onChange={handleChange} />
        </Label></Flex>
        <Label>
          Registration Place:
          <Input type="text" name="registrationPlace" value={editedCarDetails.registrationPlace} onChange={handleChange} />
        </Label>
        <Label>
          Image URL:
          <Input type="text" name="img" value={editedCarDetails.img} onChange={handleChange} />
        </Label>
        <Label>
          Title:
          <Input type="text" name="title" value={editedCarDetails.title} onChange={handleChange} />
        </Label>
        <Button disabled={loading} type="submit">{!loading?"Save":"Loading....."}</Button>
      </Form>
    </DIV>
  );
};

export default EditCarDetailsForm;
