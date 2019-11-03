import { StorageSchema } from "../../config";

export const deserialize = (settings: [StorageSchema, string][]) => {
    if (settings.length !== 2) {
        throw new Error(
            `Expected serialized settings array to have length 2, found ${settings.length}`
        );
    }
    return {
        enabled: JSON.parse(settings[0][1]),
        scheduledTime: new Date(settings[1][1]),
    };
};

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
