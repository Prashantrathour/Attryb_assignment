import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { reducer as invetoryReducer } from "./getInvetory/reducer"
import { reducer as postinvetoryReducer } from "./postInvetory/reducer"
import { reducer as oemReducer } from "./OEM_GET/reducer"
import { authReducer } from "./AuthReducer.jsx/reducer"
import { idcollect_Reducer } from "./multipaldeletion/reducer"
import thunk from "redux-thunk"
const rootReducer=combineReducers({invetoryReducer,oemReducer,postinvetoryReducer,authReducer,idcollect_Reducer})
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))