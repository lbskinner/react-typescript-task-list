import initialData from "./initialData";

export const loadState = () => {
  try {
    const localAllTasksState: string | null = localStorage.getItem(
      "reduxState"
    );

    if (!localAllTasksState) return { allTasksReducer: initialData };
    return { allTasksReducer: JSON.parse(localAllTasksState) };
  } catch (error) {
    // if error, return undefined to let reducer initialize app
    return undefined;
  }
};

export const saveState = (reduxState: InitialData | {}) => {
  try {
    const localAllTasksState = JSON.stringify(reduxState);
    localStorage.setItem("reduxState", localAllTasksState);
  } catch (error) {
    console.log("Save to local storage error", error);
  }
};
