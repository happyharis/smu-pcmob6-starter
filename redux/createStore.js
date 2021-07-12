import { combineReducers, createStore } from "redux";
import blogAuthReducer from "./ducks/blogAuth";
import tokenReducer from "./ducks/token";

const reducer = combineReducers({
  auth: blogAuthReducer,
  token: tokenReducer,
});

const store = createStore(reducer);

export default store;
