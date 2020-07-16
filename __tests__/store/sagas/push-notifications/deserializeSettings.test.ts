import { StorageSchema } from "../../../../src/config";
import { deserialize } from "../../../../src/state/sagas/push-notifications/deserializeSettings";

it("deserializes correctly", () => {
    const serialized = {
        [StorageSchema.PushNotificationsEnabled]: "true",
        [StorageSchema.PushNotificationsScheduledTime]:
            "'August 19, 1975 23:15:30 GMT+01:00'",
    };

    const result = deserialize(serialized);

    expect(result.enabled).toBe(true);
    // JS Date automatically subtracts the +01:00 from the locale string
    expect(result.scheduledTime.toISOString()).toMatch(/^1975-08-19T22:15:30/);
});

it("returns epoch if loaded date is null", () => {
    const serialized = {
        [StorageSchema.PushNotificationsEnabled]: "true",
        [StorageSchema.PushNotificationsScheduledTime]: null,
    };

    const result = deserialize(serialized);

    expect(result.enabled).toBe(true);
    expect(result.scheduledTime.getTime()).toBe(0);
});

it("returns epoch if loaded date is null", () => {
    const serialized = {
        [StorageSchema.PushNotificationsEnabled]: null,
        [StorageSchema.PushNotificationsScheduledTime]: undefined,
    };

    const result = deserialize(serialized);

    expect(result.enabled).toBe(false);
    expect(result.scheduledTime.getTime()).toBe(0);
});

it("returns false if loaded enabled flag is null", () => {
    const serialized = {
        [StorageSchema.PushNotificationsEnabled]: null,
        [StorageSchema.PushNotificationsScheduledTime]: null,
    };

    const result = deserialize(serialized);

    expect(result.enabled).toBe(false);
});

it("returns false if loaded enabled flag is undefined", () => {
    const serialized = {
        [StorageSchema.PushNotificationsEnabled]: undefined,
        [StorageSchema.PushNotificationsScheduledTime]: null,
    };

    const result = deserialize(serialized);

    expect(result.enabled).toBe(false);
    expect(result.scheduledTime.getTime()).toBe(0);
});
