export enum ReduxAction {
    PostSendRequested = "POST_SEND_REQUESTED",
    PostFetched = "POST_FETCHED",
    PostSendSucceeded = "POST_SEND_SUCCEEDED",
    PostSendFailed = "POST_SEND_FAILED",
    // TODO handle somehow (at least notify the user)
    PostSendFailedTimeoutExceeded = "POST_SEND_FAILED_TIMEOUT_EXCEEDED",
}
