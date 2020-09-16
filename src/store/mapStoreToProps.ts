import { RootState } from "./_root.reducer";

const mapStoreToProps = (reduxState: RootState) => {
  return {
    store: reduxState,
    // reduxState properties bound directly to "props"
    // ---------
    // Instead of taking everything from state, we just want the user info.
    // if you wanted you could write this code like this:
    allTasks: reduxState.allTasksReducer,
  };
};

export default mapStoreToProps;
