import * as actionTypes from "./actionTypes";

// export function typedAction(type: string, payload?: any) {
//   return {type, payload};
// }

export function updateTaskData(newTaskData: InitialData): TaskAction {
  return {
    type: actionTypes.UPDATE_DATA,
    payload: newTaskData,
  };
}
