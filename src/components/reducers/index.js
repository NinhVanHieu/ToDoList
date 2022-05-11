import { combineReducers } from "redux";
import { reducerList } from "./Reducers";
const Reducers = combineReducers({
  list: reducerList,
});
export default Reducers;
