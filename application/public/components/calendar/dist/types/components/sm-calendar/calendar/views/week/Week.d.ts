import { Column } from "../column/Column";
import { Moment } from "moment";
import { WeekTemplateRenderer } from "./WeekTemplateRenderer";
declare class Week extends Column {
    constructor();
    numberOfCols: number;
    templateRenderer: WeekTemplateRenderer;
    calculateViewRange(contextMoment: Moment, weekStartDay: number): {
        startMoment: Moment;
        endMoment: Moment;
    };
}
declare const _default: Week;
export default _default;
