import { POST_FAILURE, POST_REQUEST, POST_SUCCESS } from "./actiontype";

const initialState={
  url:"",
    isLoading: false,
    isError:false
}


export const reducer=(state=initialState,{type,payload})=>{
switch (type) {
    case POST_REQUEST:
        
        return {...state, isLoading:true}
    case POST_SUCCESS:
        
        return {...state, isLoading:false}
    case POST_FAILURE:
        
        return {...state, isLoading:false,isError:true}
        case "UPLOAD":
       
            return {...state,url:payload}

    default:
        return state;
}
}