import { GET_FAILURE, GET_REQUEST, GET_SUCCESS, GET_SUCCESS_PREVENT_REFFRESH } from "./actiontype";

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
        
        return {...state, isLoading:false,data:payload}
    case GET_SUCCESS_PREVENT_REFFRESH:
        const filterdata=state.data.filter((i)=>!payload.includes(i._id))
        return {...state, isLoading:false,data:filterdata}
    case GET_FAILURE:
        
        return {...state, isLoading:false,isError:true}

    default:
        return state;
}
}