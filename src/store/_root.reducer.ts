import { combineReducers } from "redux";
import allTasksReducer from "./reducer";

const rootReducer = combineReducers({ allTasksReducer });

export default rootReducer;
