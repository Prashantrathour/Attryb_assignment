import { GET_FAILURE, GET_REQUEST, GET_SUCCESS } from "./actiontype";

const initialState={
    data:[],
    isLoading: false,
    isError:false
}


export const reducer=(state=initialState,{type,payload})=>{
switch (type) {
    case GET_REQUEST:
        
        return {...state, isLoading:true}
    case GET_SUCCESS:
        console.log(payload)
        return {...state, isLoading:false,data:payload}
    case GET_FAILURE:
        
        return {...state, isLoading:false,isError:true}

    default:
        return state;
}
}