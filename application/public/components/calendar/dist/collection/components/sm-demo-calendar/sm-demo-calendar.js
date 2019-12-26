import { h } from "@stencil/core";
import { getEvents, CONTEXT_DATE, getEvent } from './utils/event-utils';
export class SmDemoCalendar {
    constructor() {
        this.weekStartDay = 'sun';
        this.events = getEvents();
        this.contextDate = CONTEXT_DATE;
    }
    componentDidLoad() {
        setTimeout(() => {
            //this.events = [...this.events, this.events[0]];
        }, 2000);
    }
    render() {
        return (h("div", { class: 'sm-demo-calendar' },
            h("sm-calendar", { events: this.events, view: "month", "context-date": this.contextDate, onViewChange: (_payload) => {
                    //console.log(_payload.detail);
                }, onEventClick: (_payload) => {
                    console.log(_payload.detail);
                }, onCellClick: (_payload) => {
                    const newEvent = getEvent('new event', 'sample description', _payload.detail.from, _payload.detail.to);
                    this.events = [...this.events, newEvent];
                    console.log(_payload.detail);
                }, onEventUpdate: (payload) => {
                    const updateEvent = payload.detail.event;
                    const { start, end } = payload.detail.updatedValues;
                    const eventsBackUp = this.events;
                    eventsBackUp.forEach((event) => {
                        // @ts-ignore
                        if (event.id === updateEvent.id) {
                            // @ts-ignore
                            event.start = start;
                            // @ts-ignore
                            event.end = end;
                        }
                    });
                    this.events = [...eventsBackUp];
                } })));
    }
    static get is() { return "sm-demo-calendar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./styles/sm-demo-calendar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["styles/sm-demo-calendar.css"]
    }; }
    static get states() { return {
        "weekStartDay": {},
        "events": {},
        "contextDate": {}
    }; }
}
