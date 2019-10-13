export enum ReduxAction {
    PostAdded = "POST_ADDED",
    PostFetched = "POST_FETCHED",
    PostSendSucceeded = "POST_SEND_SUCCEEDED",
    PostSendFailed = "POST_SEND_FAILED",
    // TODO handle somehow (at least notify the user)
    PostSendFailedTimeoutExceeded = "POST_SEND_FAILED_TIMEOUT_EXCEEDED",
}
