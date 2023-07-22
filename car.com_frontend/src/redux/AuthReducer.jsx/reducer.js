// authReducer.js

import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  username: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      Cookies.set("isLoggedIn", "true");
      Cookies.set("token", payload.token);
      Cookies.set("userId", payload.userId);
      Cookies.set("username", payload.username);
      return {
        ...state,
        isLoggedIn:Cookies.get("isLoggedIn"),
        userId: Cookies.get("userId"),
        token: Cookies.get("token"),
        username: Cookies.get("username")
      };
    case "LOGOUT":
      Cookies.remove("userId");
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("isLoggedIn");
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        token: null,
        username: null,
      };
    default:
      return state;
  }
};
