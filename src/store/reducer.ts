import initialData from "../initialData";
import * as actionTypes from "./actionTypes";

const allTasksReducer = (state = initialData, action: TaskAction) => {
  switch (action.type) {
    case actionTypes.UPDATE_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default allTasksReducer;
