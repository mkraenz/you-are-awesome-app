import { IState } from "./IState";

export type MapStateToProps<P> = (state: IState) => P;
