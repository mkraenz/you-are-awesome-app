import { StorageSchema } from "../../config";

export const deserialize = (settings: [StorageSchema, string][]) => {
    if (settings.length !== 2) {
        throw new Error(
            `Expected serialized settings array to have length 2, found ${settings.length}`
        );
    }
    return {
        enabled: JSON.parse(settings[0][1]),
        // TODO #35 somehow this is in UTC
        scheduledTime: new Date(settings[1][1]),
    };
};
