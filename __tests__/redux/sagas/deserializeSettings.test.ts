import { StorageSchema } from "../../../src/config";
import { deserialize } from "../../../src/redux/sagas/deserializeSettings";

it("deserializes correctly", () => {
    const serialized = [
        [StorageSchema.LocalNotificationsEnabled, "true"],
        [
            StorageSchema.LocalNotificationsScheduledTime,
            "'August 19, 1975 23:15:30 GMT+01:00'",
        ],
    ] as [StorageSchema, string][];

    const result = deserialize(serialized);

    expect(result.enabled).toBe(true);
    // JS Date automatically subtracts the +01:00 from the locale string
    expect(result.scheduledTime.toISOString()).toMatch(/^1975-08-19T22:15:30/);
});

it("throws if input has not correct length", () => {
    const serialized = [] as [StorageSchema, string][];

    const resultFn = () => deserialize(serialized);

    expect(resultFn).toThrowError(/to have length 2/);
});
