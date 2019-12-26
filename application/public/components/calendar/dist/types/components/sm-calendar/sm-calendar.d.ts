import { EventEmitter } from '../../stencil.core';
import { Moment } from 'moment';
import { EventStore } from "./calendar/utils/events/EventStore";
import CalendarEvent from "./calendar/utils/events/CalendarEvent";
export declare class SmCalendar {
    /**
     * Theme
     */
    theme: string;
    /**
     * contextDate
     */
    contextDate: string;
    /**
     * availableViews
     */
    availableViews: Array<string>;
    /**
     * view
     */
    view: string;
    /**
     * timezone
     */
    timezone: string;
    /**
     * weekStartDay
     */
    weekStartDay: string;
    /**
     * events
     */
    events: Array<object>;
    /**
     * showContextPanel
     */
    showContextPanel: boolean;
    /**
     * state variables
     */
    contextMoment: Moment;
    startMoment: Moment;
    endMoment: Moment;
    eventStore: EventStore;
    selectedEvent: CalendarEvent;
    /**
     * component DOM reference
     */
    ref: HTMLElement;
    /**
     * life cycle methods
     */
    componentWillLoad(): void;
    /**
     * watchers
     */
    handleContextDateChange(): void;
    handleViewChange(): void;
    handleEventsChange(): void;
    /**
     * Events
     */
    eventClick: EventEmitter;
    cellClick: EventEmitter;
    viewChange: EventEmitter;
    eventUpdate: EventEmitter;
    /**
     *
     * Listners
     */
    handleClick(mouseEvent: any): void;
    /**
     * functions
     */
    updateView(): void;
    /**
     * main renderer
     */
    render(): any;
}
