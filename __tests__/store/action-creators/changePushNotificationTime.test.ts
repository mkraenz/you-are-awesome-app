import { changePushNotificationTime } from "../../../src/state/action-creators/changePushNotificationTime";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = changePushNotificationTime(new Date("2016-01-01T15:36"));

    expect(result.type).toEqual(ActionType.ChangePushNotificationTime);
    expect(result.payload.scheduledTime).toBeInstanceOf(Date);
    expect(result.payload.scheduledTime.getHours()).toBe(15);
    expect(result.payload.scheduledTime.getMinutes()).toBe(36);
});
