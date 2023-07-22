import styles from "./allinvantory.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InventoryCard from "../components/InventorycardPage";
import {
  getInvetory,
  get_inv_success_prevent_reffresh,
} from "../redux/getInvetory/action";
import { getOEM } from "../redux/OEM_GET/action";
import OEM_card from "../components/OEM_card";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import {
  select_delete_fail,
  select_delete_req,
  select_delete_success,
  selectedDelete,
} from "../redux/multipaldeletion/action";

import { errorAlert, succesAlert } from "../components/Notifications";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const available_colors = [
  "Red",
  "White",
  "Silver",
  "Black",
  "Blue",
  "Green",
  "Orange",
];

const AllInventoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useSelector(
    (store) => store.invetoryReducer
  );
  const { oemdata, Loading, Error } = useSelector((store) => store.oemReducer);
  const loading = isLoading;
  const error = isError;

  const idarray = useSelector((store) => store.idcollect_Reducer);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [search, setsearch] = useState("");
  const [update, setupdate] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state
 

  const applyFilterAndSort = () => {
    let query = "?";
    if (selectedColor) {
      query = "?"
      query += `filter=colors&order=${selectedColor}&`;
      setSortOption("")
    }
    if (sortOption) {
      setSelectedColor("")
      query = "?"
      const [filterBy, sortOrder] = sortOption.split("-");
      query += `filter=${filterBy}&order=${sortOrder}&`;
    }

    if (query === "?") {
      query = "";
    }
console.log({query})
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
    const userid = Cookies.get("userId");
    const token = Cookies.get("token");
    if (!userid || !token) {
      navigate("/login");
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
  const selectdeletehandle = async () => {
    try {
      dispatch(select_delete_req());

      const res = await dispatch(selectedDelete(idarray.ids));
      succesAlert(`${res.data.count}  ${res.data.msg}fully`);
      dispatch(select_delete_success());
      // dispatch(getInvetory());
      dispatch(get_inv_success_prevent_reffresh(idarray.ids));
    } catch (error) {
      console.log(error);
      dispatch(select_delete_fail());
      errorAlert(
        error?.response?.data?.msg || "something went wrong while deleting"
      );
    }
  };
  const Addenvaintory = () => {
    navigate("/addinventory");
  };

  if (!isDataLoaded || loading) {
    return <Loader />;
  }

  return (
    <div className={styles.main_Container}>
      <ToastContainer />
      <div className={styles["filter-options"]}>
        <select
          value={selectedColor}
          onChange={(e) => handleColorFilter(e.target.value)}
        >
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
        
        <div className={styles.buttons}>
          <button onClick={Addenvaintory}>Add inventory</button>
          {idarray.ids.length > 0 ? (
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={selectdeletehandle}
            >
              delete selected
            </button>
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            float: "left",
          }}
        >
          <input
            style={{ maxWidth: "100px", textOverflow: "ellipsis" }}
            onChange={(e) => setsearch(e.target.value)}
            type="text"
            placeholder="Search by model, color, and year"
          />
          <button style={{ width: "100px" }} onClick={handlesearch}>
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {update ? (
            <div
              style={{
                display: "inline-block",
                float: "right",
                marginRight: "10px",
              }}
            >
              <button onClick={() => setupdate(false)}>close</button>
            </div>
          ) : (
            ""
          )}
          {oemdata.length > 0 && update ? (
            <div className={styles.search}>
              {oemdata.map((item) => (
                <OEM_card key={item.id} {...item} />
              ))}
            </div>
          ) : (
            ""
          )}
          <div>{oemdata.length < 0 ? <h1>Data note found..</h1> : ""}</div>
          <div className={styles["inventory-container"]}>
            {filteredInventory ? (
              filteredInventory.map((item) => (
                <InventoryCard
                  key={item._id + Math.random().toLocaleString()}
                  {...item}
                />
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
