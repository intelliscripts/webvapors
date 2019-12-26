import CalendarEvent from "./CalendarEvent";
import { Moment } from "moment-timezone";
export declare class EventStore {
    private events;
    addEvent(rawEvent: object, timezone: string): void;
    flush(): void;
    /**
     *
     * @param rawEvents
     * @param timezone
     */
    parseEvents(rawEvents: Array<object>, timezone: string): void;
    /**
     *
     * @param startMoment
     * @param endMoment
     */
    getEventsBetween(startMoment: Moment, endMoment: Moment): Array<CalendarEvent>;
}
declare const _default: EventStore;
export default _default;
