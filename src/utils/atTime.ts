export const atTime = (hour: number, min: number, date = new Date()) => {
    if (date.getHours() >= hour) {
        date.setDate(date.getDate() + 1);
    }
    date.setHours(hour);
    date.setMinutes(min);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};
