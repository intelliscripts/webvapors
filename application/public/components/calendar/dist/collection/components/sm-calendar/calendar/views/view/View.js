import templateRenderer from './TemplateRenderer';
import { h } from "@stencil/core";
export class View {
    constructor() {
        this.templateRenderer = templateRenderer;
    }
    render(component) {
        const cls = ['view-container', component.view];
        return (h("div", { class: cls.join(' ') }, this.renderView(component)));
    }
    getDatesInViewRange(startDateMoment, endDateMoment) {
        const dates = [];
        const startDateMomentClone = startDateMoment.clone();
        while (startDateMomentClone.valueOf() < endDateMoment.valueOf()) {
            dates.push(startDateMomentClone.clone());
            startDateMomentClone.add(1, 'days');
        }
        return dates;
    }
    getEventsInViewRange(component) {
        const events = component.eventStore.getEventsBetween(component.startMoment, component.endMoment);
        return this.processEventsInViewRange(component, events);
    }
    processEventsInViewRange(_component, events) {
        return events;
    }
    chopEvents(component, events) {
        events.forEach((event) => {
            if (event.startMoment.isBefore(component.startMoment)) {
                event.startMoment = component.startMoment.clone();
            }
            if (event.endMoment.isAfter(component.endMoment)) {
                event.endMoment = component.endMoment.clone();
            }
            if (!event.startMoment.isSame(event.endMoment, 'day')) {
                event.isMultiDay = true;
            }
        });
    }
    renderView(_component) {
    }
    getHeaderText(component) {
        return (h("div", null,
            component.startMoment.format('DD MMM, YYYY'),
            " - ",
            component.endMoment.format('DD MMM, YYYY')));
    }
    getDatePickerLabel(component) {
        return component.startMoment.format('DD MMM, YYYY') + ' - ' + component.endMoment.format('DD MMM, YYYY');
    }
}
