import { Column } from "../column/Column";
import { Moment } from "moment";
import { DayTemplateRenderer } from "./DayTemplateRenderer";
declare class Day extends Column {
    constructor();
    numberOfCols: number;
    templateRenderer: DayTemplateRenderer;
    calculateViewRange(contextMoment: Moment, _weekStartDay: number): {
        startMoment: Moment;
        endMoment: Moment;
    };
    getHeaderText(component: any): any;
    getDatePickerLabel(component: any): any;
}
declare const _default: Day;
export default _default;
