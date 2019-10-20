export enum ReduxAction {
    PostsFetchFailed = "POSTS_FETCH_FAILED",
    // TODO handle somehow (at least notify the user)
    PostsFetchFailedTimeoutExceeded = "POSTS_FETCH_FAILED_TIMEOUT_EXCEEDED",
    PostsFetchRequested = "POSTS_FETCH_REQUESTED",
    PostsFetchSucceeded = "POSTS_FETCH_SUCCEEDED",
    PostSendFailed = "POST_SEND_FAILED",
    // TODO handle somehow (at least notify the user)
    PostSendFailedTimeoutExceeded = "POST_SEND_FAILED_TIMEOUT_EXCEEDED",
    PostSendRequested = "POST_SEND_REQUESTED",
    PostSendSucceeded = "POST_SEND_SUCCEEDED",
}
