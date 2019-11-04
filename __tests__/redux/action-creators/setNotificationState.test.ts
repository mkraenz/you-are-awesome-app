import { NOTIFICATION_MIN } from "../../../src/config";
import { ReduxAction } from "../../../src/redux/ReduxAction";
import { setNotificationsState } from "../../../src/redux/action-creators/setNotificationState";

it("returns correct action", () => {
    const result = setNotificationsState(true);

    expect(result.type).toEqual(ReduxAction.SetNotificationsState);
    expect(result.payload.enabled).toBe(true);
    expect(result.payload.scheduledTime).toBeInstanceOf(Date);
    expect(result.payload.scheduledTime.getMinutes()).toBe(NOTIFICATION_MIN);
});
