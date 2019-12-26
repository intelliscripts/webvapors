import { Column } from "../column/Column";
import moment from 'moment-timezone';
import templateRenderer from "./WeekTemplateRenderer";
class Week extends Column {
    constructor() {
        super();
        this.numberOfCols = 7;
        this.templateRenderer = templateRenderer;
    }
    calculateViewRange(contextMoment, weekStartDay) {
        let startMoment = contextMoment.clone().startOf('day');
        if (weekStartDay <= contextMoment.day())
            startMoment.day(weekStartDay);
        else
            startMoment.day(weekStartDay - 7);
        const endMoment = moment(startMoment).add(this.numberOfCols - 1, 'days').endOf('day');
        return { startMoment, endMoment };
    }
}
export default new Week();
