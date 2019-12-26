import CalendarEvent from "./CalendarEvent";
export class EventStore {
    constructor() {
        this.events = [];
    }
    addEvent(rawEvent, timezone) {
        this.events.push(new CalendarEvent(rawEvent, timezone));
    }
    flush() {
        this.events = [];
    }
    /**
     *
     * @param rawEvents
     * @param timezone
     */
    parseEvents(rawEvents = [], timezone) {
        this.flush();
        rawEvents.forEach((rawEvent) => {
            this.addEvent(rawEvent, timezone);
        });
    }
    /**
     *
     * @param startMoment
     * @param endMoment
     */
    getEventsBetween(startMoment, endMoment) {
        const events = [];
        this.events.forEach((event) => {
            if (!(event.startMoment.valueOf() > endMoment.valueOf() || event.endMoment.valueOf() < startMoment.valueOf() || event.endMoment.valueOf() === startMoment.valueOf())) {
                events.push(event.clone());
            }
        });
        return events.sort((a, b) => a.startMoment.diff(b.startMoment));
    }
}
export default new EventStore();
