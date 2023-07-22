import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

const MultipleDeletePopup = ({ items, selectedItems, handleCheckboxChange, handleDeleteSelected }) => {
  return (
    <Popup
      trigger={<button>Open Multiple Delete</button>}
      modal
      closeOnDocumentClick
    >
      <PopupContent>
        <h2>Select Items to Delete</h2>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <input
                type="checkbox"
                id={item._id}
                value={item._id}
                checked={selectedItems.includes(item._id)}
                onChange={() => handleCheckboxChange(item._id)}
              />
              <label htmlFor={item._id}>{item.oemId.make}</label>
            </li>
          ))}
        </ul>
        <button onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>
          Delete Selected
        </button>
      </PopupContent>
    </Popup>
  );
};

export default MultipleDeletePopup;
