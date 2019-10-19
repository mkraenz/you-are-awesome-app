export enum ReduxAction {
    PostFetchSucceeded = "POST_FETCHED",
    PostSendRequested = "POST_SEND_REQUESTED",
    PostSendSucceeded = "POST_SEND_SUCCEEDED",
    PostSendFailed = "POST_SEND_FAILED",
    // TODO handle somehow (at least notify the user)
    PostSendFailedTimeoutExceeded = "POST_SEND_FAILED_TIMEOUT_EXCEEDED",
}
