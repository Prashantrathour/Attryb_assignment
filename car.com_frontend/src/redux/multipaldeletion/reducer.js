// authReducer.js

const initialState = {
    ids: [],
    isError:false,
    isloading:false

  };
  
 export  const idcollect_Reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ID_COLLECT':
        return {
          ...state,ids:[...state.ids,action.payload]
      
        };
      case 'ID_COLLECT_INCLUDES':
        return {
          ...state,ids:state.ids.filter((i)=>i!=action.payload)
      
        };
      case 'DELETE_REQ':
        return {
          ...state,isloading:true
      
        };
      case 'DELETE_SUCCESS':
        return {
          ...state,ids:[],isloading:false
      
        };
      case 'DELETE_FAIL':
        return {
          ...state,isloading:false,isError:true
      
        };
  
      default:
        return state;
    }
  };
  
 
  