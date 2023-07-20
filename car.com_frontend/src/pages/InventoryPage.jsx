import styles from './allinvantory.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InventoryCard from '../components/InventorycardPage';
import { getInvetory } from '../redux/getInvetory/action';
import { getOEM } from '../redux/OEM_GET/action';
import OEM_card from '../components/OEM_card';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const available_colors = ["Red", "White", "Silver", "Black", "Blue","Green","Orange"];

const AllInventoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useSelector((store) => store.invetoryReducer);
  const { oemdata, Loading, Error } = useSelector((store) => store.oemReducer);
  const loading = isLoading;
  const error = isError;
  console.log(oemdata);

  const [filteredInventory, setFilteredInventory] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [search, setsearch] = useState('');
  const [update, setupdate] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state variable to track data loading

  const applyFilterAndSort = () => {
    let query = '?';
    if (selectedColor) {
      query += `filter=colors&order=${selectedColor}&`;
    }
    if (sortOption) {
      const [filterBy, sortOrder] = sortOption.split('-');
      query += `filter=${filterBy}&order=${sortOrder}&`;
    }

    if (query === '?') {
      query = '';
    }

    dispatch(getInvetory(query));
  };

  const handlesearch = () => {
    if (search) {
      dispatch(getOEM(search));
      setupdate(true);
    }
  };

  useEffect(() => {
    // Fetch the necessary data on component mount
    dispatch(getOEM()).then(() => setIsDataLoaded(true));
    dispatch(getInvetory());
    const userid=localStorage.getItem("userid");
  const token=localStorage.getItem("token");
  if(!userid|| !token){
    navigate("/login")

  }
  }, []);

  useEffect(() => {
    applyFilterAndSort();
  }, [selectedColor, sortOption]);

  useEffect(() => {
    setFilteredInventory(data);
  }, [data]);

  const handleColorFilter = (color) => {
    setSelectedColor(color);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const Addenvaintory = () => {
    navigate("/addinventory");
  };

  if (!isDataLoaded || loading) {
    return <Loader />;
  }

  return (
    <div className={styles.main_Container}>
      <div className={styles['filter-options']}>
        <select value={selectedColor} onChange={(e) => handleColorFilter(e.target.value)}>
          <option value="">Select Color</option>
          {available_colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <select value={sortOption} onChange={handleSortOptionChange}>
          <option value="">Sort by</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="mileage-asc">Mileage (Low to High)</option>
          <option value="mileage-desc">Mileage (High to Low)</option>
        </select>
        <button onClick={Addenvaintory}>Add inventory</button>
        <div style={{ display: "flex" }}>
          <input style={{ width: "200px" }} onChange={(e) => setsearch(e.target.value)} type="text" placeholder='Search by model, color, and year' />
          <button onClick={handlesearch}>Search</button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {update ? <div style={{ display: "inline-block", float: "right", marginRight: "10px" }} ><button onClick={() => setupdate(false)}>close</button></div> : ""}
          {oemdata.length > 0 && update ? <div className={styles.search}>
            {oemdata.map((item) => <OEM_card key={item.id} {...item} />)}
          </div> : ""}
          <div>{oemdata.length < 0?<h1>Data note found..</h1>:""}</div>
          <div className={styles['inventory-container']}>
            {filteredInventory ? (
              filteredInventory.map((item) => (
                <InventoryCard key={item._id + Math.random().toLocaleString()} {...item} />
              ))
            ) : (
              <div>No data to display.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllInventoryPage;
