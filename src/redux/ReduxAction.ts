export enum ReduxAction {
    PostFetchFailed = "POST_FETCH_FAILED",
    PostFetchRequested = "POST_FETCH_REQUESTED",
    PostFetchSucceeded = "POST_FETCH_SUCCEEDED",
    PostSendFailed = "POST_SEND_FAILED",
    // TODO handle somehow (at least notify the user)
    PostSendFailedTimeoutExceeded = "POST_SEND_FAILED_TIMEOUT_EXCEEDED",
    PostSendRequested = "POST_SEND_REQUESTED",
    PostSendSucceeded = "POST_SEND_SUCCEEDED",
}
