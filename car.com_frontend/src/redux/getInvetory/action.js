import axios from "axios";
import { GET_FAILURE, GET_REQUEST, GET_SUCCESS, GET_SUCCESS_PREVENT_REFFRESH } from "./actiontype";
import Cookies from "js-cookie";

export const getInvetory = (query) => async (dispatch) => {
  const accessToken = Cookies.get("token");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      mode: "no-cors",
    },
  };
  try {
    dispatch(get_inv_req());

    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL}/inventory/${query ? `${query}` : ""}`,
      config
    );

    dispatch(get_inv_success(response.data.deals));
  } catch (error) {
    console.log(error)
    dispatch(get_inv_fail());
  }
};

const get_inv_req = () => {
  return { type: GET_REQUEST };
};
const get_inv_success = (payload) => {
  return { type: GET_SUCCESS, payload };
};
export const get_inv_success_prevent_reffresh = (payload) => {
  return { type: GET_SUCCESS_PREVENT_REFFRESH, payload };
};
const get_inv_fail = () => {
  return { type: GET_FAILURE };
};
