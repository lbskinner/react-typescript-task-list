import * as actionTypes from "./actionTypes";

export function updateTaskData(newTaskData: InitialData): TaskAction {
  return {
    type: actionTypes.UPDATE_DATA,
    payload: newTaskData,
  };
}
