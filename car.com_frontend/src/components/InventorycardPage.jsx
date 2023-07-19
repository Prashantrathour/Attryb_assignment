
// InventoryCard.js
import React, { useState } from 'react';
import styles from './InventoryCard.module.css';

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

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={styles.inventoryCard}>
      <img src={"https://th.bing.com/th/id/R.c45f94c7c843c2c74399a477ddd4dae8?rik=8fLT01U8oM6qtQ&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f04%2fcar-hot.jpg&ehk=qpN8oq%2bcoeGLlOWezUDCrdDwaNey6Je9G0tPNnFVyWQ%3d&risl=&pid=ImgRaw&r=0"} alt={title} />
      <h3>{title}</h3>
      
      
      <p><strong>Price:</strong> ${price} miles</p>
      
      
      <p>
        <strong>Manufecturar:</strong> {oemId.make}
      </p>
      <p>
        <strong>Model:</strong> {oemId.model}
      </p>
      <div>
        <button className={styles.detailsButton} onClick={handleToggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      <div className={styles.button_crud}>
        <button className={styles.edit}>Edit</button>
        <button className={styles.delete}>Delete</button>
      </div>
      </div>
      <div className={`${styles.details} ${showDetails ? styles.active : ''}`}>
        <p>
          <strong>Year:</strong> {oemId.year}
        </p>
        <p>KM: {km} km</p>
      
      <p>Original Paint: {orginalPaint}</p>
        <p>Accidents: {accidents}</p>
      <p>Previous Buyers: {prevBuyers}</p>
      <p><strong>Mileage:</strong> {oemId.mileage_miles} miles</p>
      <p>Registration Place: {registrationPlace}</p>
        <p>
          <strong>List Price:</strong> ${oemId.list_price_usd}
        </p>
        <p>
        <strong>Major Scratches: </strong>{majorScratches}
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
            <div key={color} className={styles.colorCircle} style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
