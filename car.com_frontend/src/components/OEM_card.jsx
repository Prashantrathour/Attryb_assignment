// InventoryCard.js
import React, { useState } from "react";

import styles from './style.module.css';
 export const OEM_card = (
 
  oemId

) => {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className={styles.inventoryCard}>
      <img
        src={
          "https://th.bing.com/th/id/R.c45f94c7c843c2c74399a477ddd4dae8?rik=8fLT01U8oM6qtQ&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f04%2fcar-hot.jpg&ehk=qpN8oq%2bcoeGLlOWezUDCrdDwaNey6Je9G0tPNnFVyWQ%3d&risl=&pid=ImgRaw&r=0"
        }
        alt={"title"}
      />
   

   

      <p>
        <strong>Manufecturar:</strong> {oemId.make}
      </p>
      <p>
        <strong>Model:</strong> {oemId.model}
      </p>
      <p>
          <strong>Year:</strong> {oemId.year}
        </p>
       

       
      
  
        <p>
          <strong>Mileage:</strong> {oemId.mileage_miles} miles
        </p>
        
        <p>
          <strong>List Price:</strong> ${oemId.list_price_usd}
        </p>
       
        <p>
          <strong>Power:</strong> {oemId.power_bhp} bhp
        </p>
        <p>
          <strong>Max Speed:</strong> {oemId.max_speed_mph} mph
        </p>
        <div className={styles.availableColors}>
          <strong>Available Colors:</strong>
          {oemId.available_colors.map((color) => (
            <div
              key={color}
              className={styles.colorCircle}
              style={{ backgroundColor: color }}
            />
          ))}
      </div>
    </div>
  );
};

export default OEM_card;
