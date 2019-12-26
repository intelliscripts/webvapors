import templateRenderer from "./ContextPanelTemplateRenderer";
import { h } from "@stencil/core";
import { INTERNAL_FORMAT } from "../../constants";
class ContextPanel {
    constructor() {
        this.templateRenderer = templateRenderer;
    }
    render(component) {
        if (!component.showContextPanel) {
            return;
        }
        return this.renderContextPanel(component);
    }
    renderContextPanel(component) {
        return (h("div", { class: 'context-panel-container' },
            h("div", { class: 'context-panel-wrapper' },
                this.renderHeader(component),
                this.renderBody(component))));
    }
    renderHeader(component) {
        return (h("div", { class: 'context-panel-header' },
            h("div", { class: 'context-date' }, component.contextMoment.format('DD MMM, YYYY'))));
    }
    renderBody(component) {
        return (h("div", { class: 'context-panel-body' }, this.renderContextDateEvents(component)));
    }
    renderContextDateEvents(component) {
        const eventsDOM = [];
        const events = this.getContextDateEvents(component);
        if (events.length > 0) {
            events.forEach((event) => {
                eventsDOM.push(h("div", { class: 'context-panel-event', style: { 'border-left-color': event.borderColor }, onClick: () => {
                        component.eventClick.emit({
                            event: event.rawEvent,
                            isContextPanel: true
                        });
                    } },
                    h("div", { class: 'context-panel-event-header' },
                        h("div", { class: 'event-time' },
                            event.startMoment.format(INTERNAL_FORMAT.DISPLAY_TIME),
                            " - ",
                            event.endMoment.format(INTERNAL_FORMAT.DISPLAY_TIME))),
                    h("div", { class: 'context-panel-event-body' },
                        h("div", { class: 'event-title' }, event.title),
                        h("div", { class: 'event-description' }, event.description))));
            });
            return eventsDOM;
        }
        return (h("div", { class: 'no-events' }, "No Events"));
    }
    getContextDateEvents(component) {
        const contextStartMoment = component.contextMoment.clone().startOf('day');
        const contextEndMoment = component.contextMoment.clone().endOf('day');
        const events = component.eventStore.getEventsBetween(contextStartMoment.clone(), contextEndMoment.clone());
        this.chopEvents(component, events, contextStartMoment, contextEndMoment);
        return [...events];
    }
    chopEvents(_component, events, contextStartMoment, contextEndMoment) {
        events.forEach((event) => {
            if (event.startMoment.isBefore(contextStartMoment)) {
                event.startMoment = contextStartMoment.clone();
            }
            if (event.endMoment.isAfter(contextEndMoment)) {
                event.endMoment = contextEndMoment.clone();
            }
        });
    }
}
export default new ContextPanel();
