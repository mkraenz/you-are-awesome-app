import { DateTime } from "luxon";
import { createTransform } from "redux-persist";
import traverse from "traverse";

export const IsoStringToDateTransform = createTransform(
    null,
    (outboundState) => {
        return traverse(outboundState).map(toDateOrIdentity);
    }
);

export const toDateOrIdentity = (val: unknown) =>
    typeof val === "string" &&
    val.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) &&
    DateTime.fromISO(val).isValid
        ? new Date(val)
        : val;
