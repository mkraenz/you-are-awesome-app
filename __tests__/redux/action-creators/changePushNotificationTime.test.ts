import { changePushNotificationTime } from "../../../src/redux/action-creators/changePushNotificationTime";
import { ReduxAction } from "../../../src/redux/ReduxAction";

it("returns correct action", () => {
    const result = changePushNotificationTime(new Date("2016-01-01T15:36"));

    expect(result.type).toEqual(ReduxAction.ChangePushNotificationTime);
    expect(result.payload.scheduledTime).toBeInstanceOf(Date);
    expect(result.payload.scheduledTime.getHours()).toBe(15);
    expect(result.payload.scheduledTime.getMinutes()).toBe(36);
});
