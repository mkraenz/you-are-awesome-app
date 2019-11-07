import { setNotificationsState } from "../../../src/redux/action-creators/setNotificationState";
import { ReduxAction } from "../../../src/redux/ReduxAction";

it("returns correct action", () => {
    const result = setNotificationsState(true, new Date("2016-01-01T15:36"));

    expect(result.type).toEqual(ReduxAction.SetNotificationsState);
    expect(result.payload.enabled).toBe(true);
    expect(result.payload.scheduledTime).toBeInstanceOf(Date);
    expect(result.payload.scheduledTime.getHours()).toBe(15);
    expect(result.payload.scheduledTime.getMinutes()).toBe(36);
});
