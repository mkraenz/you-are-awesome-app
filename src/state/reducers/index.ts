import { combineReducers } from "redux";
import type { CombinedState, Reducer } from "redux";
import { IAnyAction } from "../actions/IAction";
import { IState } from "../state/IState";
import { appReducer } from "./appReducer";
import { networkReducer } from "./networkReducer";
import { messageReducer } from "./postReducer";
import { submitMessageReducer } from "./sendPostReducer";

type MyReducer = Reducer<CombinedState<IState>, IAnyAction>;
type assertReducerMatchesState<T extends MyReducer> = T extends Reducer<
    CombinedState<infer S>,
    infer A
>
    ? Reducer<CombinedState<S>, A>
    : false;

const reducers = {
    messages: messageReducer,
    app: appReducer,
    network: networkReducer,
    submitMessage: submitMessageReducer,
};
const combined = combineReducers(reducers);
export const rootReducer: assertReducerMatchesState<typeof combined> = combined;
