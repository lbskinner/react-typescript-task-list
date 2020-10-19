import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { rootReducer } from "./store/_root.reducer";
import { loadState, saveState } from "./localStorage";

import "./index.css";
import App from "./App";

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(logger));

store.subscribe(() => {
  const reduxState = store.getState().allTasksReducer;
  saveState(reduxState);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
