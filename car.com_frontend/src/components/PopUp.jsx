import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditCarDetailsForm from './InventoryFormControl';

export const PopupTriger= () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div><EditCarDetailsForm/></div>
  </Popup>
);