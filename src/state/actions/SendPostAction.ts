import { IPostSendFailed, IPostSendSucceeded } from "./IAction";

// TODO move sub-actions here
export type SendPostAction = IPostSendFailed | IPostSendSucceeded;
