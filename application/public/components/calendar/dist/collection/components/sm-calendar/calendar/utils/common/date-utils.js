import moment from 'moment-timezone';
export function getTimeFromStartOfDay(dateTime, units = 'seconds') {
    return dateTime.diff(moment(dateTime).startOf('day'), units);
}
export function getTimeDiff(date1, date2, units = 'seconds') {
    return Math.abs(date1.diff(date2, units));
}
