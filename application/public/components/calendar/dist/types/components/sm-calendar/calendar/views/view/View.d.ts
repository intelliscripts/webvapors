import CalendarEvent from "../../utils/events/CalendarEvent";
import { TemplateRenderer } from './TemplateRenderer';
import { Moment } from "moment";
export declare class View {
    templateRenderer: TemplateRenderer;
    render(component: any): any;
    getDatesInViewRange(startDateMoment: Moment, endDateMoment: Moment): Array<Moment>;
    getEventsInViewRange(component: any): Array<CalendarEvent>;
    processEventsInViewRange(_component: any, events: Array<CalendarEvent>): Array<CalendarEvent>;
    chopEvents(component: any, events: Array<CalendarEvent>): void;
    renderView(_component: any): void;
    getHeaderText(component: any): any;
    getDatePickerLabel(component: any): string;
}
