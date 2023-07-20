// authActions.js

export const loginSuccess = (userId, token) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
          userId,
          token,
        }
    }
    

  }
  
  export const logout = () => {
    return {type: 'LOGOUT'}
  };
  