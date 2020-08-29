/** @returns date (without time) in ISO format, e.g. 2019-10-21 */
export const toIsoDateString = (date: Date) => date.toISOString().slice(0, 10);

export const isToday = (date: Date) =>
    toIsoDateString(date) === toIsoDateString(new Date());
