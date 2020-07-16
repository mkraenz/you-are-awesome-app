import { setPushNotificationsState } from "../../../src/state/action-creators/setPushNotificationState";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = setPushNotificationsState(
        true,
        new Date("2016-01-01T15:36")
    );

    expect(result.type).toEqual(ActionType.SetPushNotificationsState);
    expect(result.payload.enabled).toBe(true);
    expect(result.payload.scheduledTime).toBeInstanceOf(Date);
    expect(result.payload.scheduledTime.getHours()).toBe(15);
    expect(result.payload.scheduledTime.getMinutes()).toBe(36);
});
