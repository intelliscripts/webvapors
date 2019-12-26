import { View } from "../view/View";
import { Moment } from "moment-timezone";
import CalendarEvent from "../../utils/events/CalendarEvent";
import { MonthTemplateRenderer } from "../month/MonthTemplateRenderer";
export declare class Month extends View {
    viewHeaderHeight: number;
    private eventHeight;
    private eventLeftMargin;
    private eventTopMargin;
    private gridCellHeaderHeight;
    templateRenderer: MonthTemplateRenderer;
    constructor();
    next(component: any): void;
    prev(component: any): void;
    renderView(component: any): any;
    renderViewBody(component: any): any;
    renderDrawingArea(component: any): any;
    renderEvents(component: any): any;
    getRowHeights(component: any): {
        maxEventsInRowMap: {};
    };
    getEvents(component: any): {
        renderedEvents: CalendarEvent[];
    };
    getEvent(component: any, event: CalendarEvent): any;
    renderGrid(component: any): any;
    renderGridRows(component: any): any[];
    getRowHeight(_component: any, maxEventsInRowMap: any, rowIndex: any): number;
    getRow(component: any, rowDates: Array<Moment>, _rowcount: number, rowIndex: number): any;
    getCellWrapper(component: any, date: Moment, rowHeight: string): any;
    renderViewHeader(component: any): any;
    calculateViewRange(contextMoment: Moment, weekStartDay: number): {
        startMoment: any;
        endMoment: any;
    };
    getHeaderText(component: any): any;
    getDatePickerLabel(component: any): any;
    processEventsInViewRange(component: any, events: Array<CalendarEvent>): Array<CalendarEvent>;
    chunkEvents(component: any, events: Array<CalendarEvent>): CalendarEvent[];
}
declare const _default: Month;
export default _default;
