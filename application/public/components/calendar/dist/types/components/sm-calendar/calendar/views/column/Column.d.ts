import { Moment } from 'moment-timezone';
import { View } from "../view/View";
import CalendarEvent from "../../utils/events/CalendarEvent";
import { ColumnTemplateRenderer } from './ColumnTemplateRenderer';
export declare class Column extends View {
    numberOfCols: number;
    leftScaleWidth: number;
    timeStepDuration: number;
    timeStepHeight: number;
    timeStepFormat: string;
    viewHeaderHeight: number;
    scaleSizeInSecs: number;
    templateRenderer: ColumnTemplateRenderer;
    constructor();
    next(component: any): void;
    prev(component: any): void;
    calculateViewRange(contextMoment: Moment, _weekStartDay: number): {
        startMoment: any;
        endMoment: any;
    };
    renderView(component: any): any;
    renderViewBody(component: any): any;
    renderDrawingArea(component: any): any;
    renderEvents(component: any): any;
    getEvents(component: any): any[];
    getEvent(component: any, event: CalendarEvent): any;
    processStyleAttributes(_component: any, bestFit: any, column: any): any;
    getPaddings(): {
        startPadding: number;
        endPadding: number;
        spacing: number;
    };
    getEventsColumnMap(component: any, events: Array<CalendarEvent>): object;
    processEventsInViewRange(component: any, events: Array<CalendarEvent>): Array<CalendarEvent>;
    chunkEvents(_component: any, events: Array<CalendarEvent>): CalendarEvent[];
    renderGrid(component: any): any;
    renderGridRows(component: any): any[];
    getSteps(): Array<Moment>;
    renderLeftScale(component: any): any;
    renderViewHeader(component: any): any;
}
declare const _default: Column;
export default _default;
