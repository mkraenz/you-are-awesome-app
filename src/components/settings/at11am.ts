import { CONFIG } from "../../config";

export const at11Am = (now = new Date()) =>
    new Date(now.setHours(CONFIG.defaultNotificationHour, 0, 0, 0));
