export function getWeekEndDayNumber(startDayNumber) {
    if (startDayNumber == 0)
        return 6;
    return startDayNumber - 1;
}
export function getNextDate(date, weekEndDayNumber) {
    const dayNumber = date.day();
    if (weekEndDayNumber >= dayNumber)
        date.day(weekEndDayNumber);
    else
        date.day(weekEndDayNumber + 7);
    date.endOf('day');
    return date;
}
export function getPreviousDate(date, weekStartDayNumber) {
    const dayNumber = date.day();
    if (weekStartDayNumber <= dayNumber)
        date.day(weekStartDayNumber);
    else
        date.day(weekStartDayNumber - 7);
    date.startOf('day');
    return date;
}
export function getFirstDayOfaMonthView(date, weekStartDay) {
    const firstDateOfMonth = date.clone().startOf('month');
    const firstDateOfMonthView = getPreviousDate(firstDateOfMonth, weekStartDay);
    return firstDateOfMonthView;
}
export function getLastDayOfaMonthView(date, weekLastDay) {
    const lastDateOfMonth = date.clone().endOf('month');
    const lastDateOfMonthView = getNextDate(lastDateOfMonth, weekLastDay);
    return lastDateOfMonthView;
}
export function getBetweenDates(startDateMoment, endDateMoment) {
    const dates = [];
    const startDateMomentClone = startDateMoment.clone();
    while (startDateMomentClone.valueOf() < endDateMoment.valueOf()) {
        dates.push(startDateMomentClone.clone());
        startDateMomentClone.add(1, 'days');
    }
    return dates;
}
export function calculateDateRange(date, weekStartDayNumber) {
    const weekEndDayNumber = getWeekEndDayNumber(weekStartDayNumber);
    const startMoment = getFirstDayOfaMonthView(date, weekStartDayNumber);
    const endMoment = getLastDayOfaMonthView(date, weekEndDayNumber);
    return getBetweenDates(startMoment, endMoment);
}
