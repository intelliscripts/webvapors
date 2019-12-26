import { Moment } from 'moment-timezone';
declare class CalendarEvent {
    id: string;
    title: string;
    description: string;
    start: string;
    end: string;
    text_color: string;
    background: string;
    borderColor: string;
    isMultiDay: boolean;
    chunks: Array<object>;
    timezone: string;
    startMoment: Moment;
    originalStartMoment: Moment;
    endMoment: Moment;
    originalEndMoment: Moment;
    rawEvent: object;
    style: object;
    /**
     *
     * @param rawEvent
     * @param timezone
     */
    constructor(rawEvent: any, timezone?: string);
    clone(): CalendarEvent;
    /**
     *
     */
    generateId(): string;
}
export default CalendarEvent;
