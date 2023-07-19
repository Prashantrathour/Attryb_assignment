import { GET_FAILURE_OEM, GET_REQUEST_OEM, GET_SUCCESS_OEM } from "./actiontype";

const initialState={
    oemdata:[],
    Loading: false,
    Error:false
}


export const reducer=(state=initialState,{type,payload})=>{
switch (type) {
    case GET_REQUEST_OEM:
        
        return {...state, Loading:true}
    case GET_SUCCESS_OEM:
        console.log(payload)
        return {...state, Loading:false,oemdata:payload}
    case GET_FAILURE_OEM:
        
        return {...state, Loading:false,Error:true}

    default:
        return state;
}
}