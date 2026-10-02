import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import studentReducer from "./reducers/studentReducer";

const rootReducer = combineReducers({
  students: studentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
