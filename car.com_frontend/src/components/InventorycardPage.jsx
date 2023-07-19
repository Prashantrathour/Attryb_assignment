import React, { useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";

import axios from "axios";


import { useDispatch } from "react-redux";
import EditCarDetailsForm from "./InventoryFormControl";
import { errorAlert, succesAlert } from "./Notifications";
import { getInvetory } from "../redux/getInvetory/action";

const InventoryCardContainer = styled.div`
  width: 300px;
 
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-4px);
  }
`;

const InventoryImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const InventoryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const PriceText = styled.p`
  margin: 6px 0;
`;

const ManufacturerText = styled.p`
  margin: 6px 0;
`;

const DetailsButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  position: relative;
  z-index: 1;

  &:hover {
    background-color: #0056b3;
  }
`;

const Details = styled.div`
  max-height: max-content;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.2s ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 2px;
  z-index: 2;
 
  height: 200px;
  overflow: scroll;

  &.active {
    max-height: 500px;
    opacity: 1;
  }
`;

const AvailableColors = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 6px;
`;

const CrudButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: #fff;
`;

const EditButton = styled.button`
  background-color: rgb(0, 255, 42);
  color: #fff;
`;

const InventoryCard = ({
  _id,
  km,
  majorScratches,
  price,
  orginalPaint,
  accidents,
  prevBuyers,
  registrationPlace,
  oemId,
  userID,
  img,
  title,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const dispatch = useDispatch();
  const carDetails = {
    _id,
    km,
    majorScratches,
    price,
    orginalPaint,
    accidents,
    prevBuyers,
    registrationPlace,
    oemId,
    userID,
    img,
    title,
  };
  const userid=localStorage.getItem("userid");
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleToggleEditPopup = () => {
    setShowEditPopup(!showEditPopup);
  };

  const handleSaveEditedDetails = async (editedDetails) => {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASEURL}/inventory/${carDetails._id}`,
        editedDetails,
        config
      );
      console.log(res.data.msg);
      succesAlert(res.data.msg);
      
    } catch (error) {
      console.log(error);
      errorAlert("Something went wrong");
    }
    handleToggleEditPopup();
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASEURL}/inventory/${id}`,
        config
      );
      console.log(res.data.msg);
     
      dispatch(getInvetory(""));
    } catch (error) {
      console.log(error);
      errorAlert("Something went wrong");
    }
  };

  return (
    <InventoryCardContainer>
      <InventoryImage
        src={
          img ||
          "https://th.bing.com/th/id/R.c45f94c7c843c2c74399a477ddd4dae8?rik=8fLT01U8oM6qtQ&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f04%2fcar-hot.jpg&ehk=qpN8oq%2bcoeGLlOWezUDCrdDwaNey6Je9G0tPNnFVyWQ%3d&risl=&pid=ImgRaw&r=0"
        }
        alt={title}
      />
      <InventoryTitle>{title}</InventoryTitle>
      <PriceText>
        <strong>Price:</strong> ${price} miles
      </PriceText>
      <ManufacturerText>
        <strong>Manufacturer:</strong> {oemId.make}
      </ManufacturerText>

      <div>
        <DetailsButton onClick={handleToggleDetails}>
          {showDetails ? "Hide Details" : "Show Details"}
        </DetailsButton>
       {userid==userID? <CrudButtonContainer>
          <EditButton onClick={handleToggleEditPopup}>Edit</EditButton>
          <DeleteButton onClick={() => handleDelete(_id)}>Delete</DeleteButton>
        </CrudButtonContainer>:""}
      </div>

      {showDetails && (
        <Details onClick={handleToggleDetails} className={showDetails ? "active" : ""}>
          <p>
            <strong>Year:</strong> {oemId.year}
          </p>
          <p>KM: {km} km</p>
          <p>Original Paint: {orginalPaint}</p>
          <p>Accidents: {accidents}</p>
          <p>Previous Buyers: {prevBuyers}</p>
          <p>
            <strong>Mileage:</strong> {oemId.mileage_miles} miles
          </p>
          <p>Registration Place: {registrationPlace}</p>
          <p>
            <strong>List Price:</strong> ${oemId.list_price_usd}
          </p>
          <p>
            <strong>Major Scratches:</strong> {majorScratches}
          </p>
          <p>
            <strong>Power:</strong> {oemId.power_bhp} bhp
          </p>
          <p>
            <strong>Max Speed:</strong> {oemId.max_speed_mph} mph
          </p>
          <AvailableColors>
            <strong>Available Colors:</strong>
            {oemId.available_colors.map((color, index) => (
              <ColorCircle key={index} color={color} />
            ))}
          </AvailableColors>
        </Details>
      )}

      <Popup
        open={showEditPopup}
        onClose={handleToggleEditPopup}
        modal
        closeOnDocumentClick
      >
        {(close) => (
          <div>
            <span onClick={close}>&times;</span>
            <h3>Edit Car Details</h3>
            <EditCarDetailsForm
              carDetails={carDetails}
              onSave={handleSaveEditedDetails}
            />
          </div>
        )}
      </Popup>
    </InventoryCardContainer>
  );
};

export default InventoryCard;

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 1px;
  margin-top: 10px;
`;
