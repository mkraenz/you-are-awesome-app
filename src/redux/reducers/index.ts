import { combineReducers } from "redux";
import { internetConnectedReducer } from "./internetConnectedReducer";
import { postReducer } from "./postReducer";
import { sendPostReducer } from "./sendPostReducer";
import { settingsReducer } from "./settingsReducer";

const rootReducer = combineReducers({
    app: postReducer,
    networking: sendPostReducer,
    netInfo: internetConnectedReducer,
    settings: settingsReducer,
});

export default rootReducer;
