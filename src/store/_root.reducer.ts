import { combineReducers } from "redux";
import allTasksReducer from "./reducer";

export const rootReducer = combineReducers({ allTasksReducer });

export type RootState = ReturnType<typeof rootReducer>;
