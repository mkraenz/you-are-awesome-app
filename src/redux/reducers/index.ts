import { combineReducers } from "redux";
import { internetConnectedReducer } from "./internetConnectedReducer";
import { postReducer } from "./postReducer";
import { sendPostReducer } from "./sendPostReducer";

const combinedReducers = combineReducers({
    app: postReducer,
    networking: sendPostReducer,
    netInfo: internetConnectedReducer,
});

export default combinedReducers;
