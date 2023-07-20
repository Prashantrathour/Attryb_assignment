// authReducer.js

const initialState = {
    isLoggedIn: false,
    userId: null,
    token: null,
  };
  
 export  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          userId: action.payload.userId,
          token: action.payload.token,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          userId: null,
          token: null,
        };
      default:
        return state;
    }
  };
  
 
  