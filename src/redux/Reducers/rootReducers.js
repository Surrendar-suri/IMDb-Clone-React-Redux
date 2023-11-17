import { combineReducers } from "redux";
import { movie } from "./movieReducers";

const rootReducer = combineReducers({
    movie,
});

export default rootReducer;