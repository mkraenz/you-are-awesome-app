import { ActionType } from "./ActionType";

export interface IAction<T extends ActionType, P = never, E = never> {
    type: T;
    payload?: P;
    error?: E;
}

export interface IActionWithPayload<T extends ActionType, P, E = never>
    extends IAction<T, P, E> {
    payload: P;
}
