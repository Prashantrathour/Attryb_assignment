import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { reducer as invetoryReducer } from "./getInvetory/reducer"
import { reducer as oemReducer } from "./OEM_GET/reducer"
import thunk from "redux-thunk"
const rootReducer=combineReducers({invetoryReducer,oemReducer})
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))