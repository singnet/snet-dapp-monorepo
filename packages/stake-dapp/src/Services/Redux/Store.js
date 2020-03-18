import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

let composeEnhancers = compose;
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
};

const store = configureStore();
export default store;
