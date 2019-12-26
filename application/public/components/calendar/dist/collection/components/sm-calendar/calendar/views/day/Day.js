import { Column } from "../column/Column";
import templateRenderer from "./DayTemplateRenderer";
import { h } from "@stencil/core";
class Day extends Column {
    constructor() {
        super();
        this.numberOfCols = 1;
        this.templateRenderer = templateRenderer;
    }
    calculateViewRange(contextMoment, _weekStartDay) {
        const startMoment = contextMoment.clone().startOf('day');
        const endMoment = contextMoment.clone().endOf('day');
        return { startMoment, endMoment };
    }
    getHeaderText(component) {
        return (h("div", null, component.contextMoment.format('DD MMMM YYYY')));
    }
    getDatePickerLabel(component) {
        return component.contextMoment.format('DD MMM YYYY');
    }
}
export default new Day();
