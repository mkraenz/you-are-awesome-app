import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { sendPostReducer } from "./sendPostReducer";

const combinedReducers = combineReducers({
    app: postReducer,
    networking: sendPostReducer,
});

export default combinedReducers;
