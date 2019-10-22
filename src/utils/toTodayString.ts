/** returns date (without time) in ISO format, e.g. 2019-10-21 */
export const toDateString = (date: Date) => date.toISOString().slice(0, 10);

export const isToday = (date: Date) =>
    toDateString(date) === toDateString(new Date());
