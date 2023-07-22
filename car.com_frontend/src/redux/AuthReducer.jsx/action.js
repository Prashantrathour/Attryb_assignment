// authActions.js

export const loginSuccess = (userId, token,username) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
          userId,
          token,username
        }
    }
    

  }
  
  export const logout = () => {
    return {type: 'LOGOUT'}
  };
  