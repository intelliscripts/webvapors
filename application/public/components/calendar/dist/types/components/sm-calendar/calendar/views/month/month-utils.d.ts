import moment, { Moment } from "moment-timezone";
export declare function getWeekEndDayNumber(startDayNumber: number): number;
export declare function getNextDate(date: moment.Moment, weekEndDayNumber: number): Moment;
export declare function getPreviousDate(date: Moment, weekStartDayNumber: number): Moment;
export declare function getFirstDayOfaMonthView(date: Moment, weekStartDay: number): Moment;
export declare function getLastDayOfaMonthView(date: Moment, weekLastDay: number): any;
export declare function getBetweenDates(startDateMoment: Moment, endDateMoment: Moment): Array<Moment>;
export declare function calculateDateRange(date: Moment, weekStartDayNumber: number): {
    startMoment: any;
    endMoment: any;
};
