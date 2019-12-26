import { h } from "@stencil/core";
import { INTERNAL_FORMAT } from "../constants";
import moment from 'moment-timezone';
export class EditEvent {
    render(component) {
        if (!component.selectedEvent) {
            return;
        }
        return this.renderEditEventModal(component);
    }
    renderEditEventModal(component) {
        return (h("div", { class: 'event-edit-container' },
            h("div", { class: 'event-edit-wrapper', style: { 'border-top-color': component.selectedEvent.borderColor } },
                this.renderHeader(component),
                this.renderBody(component),
                this.renderFooter(component))));
    }
    renderFooter(component) {
        return (h("div", { class: 'event-edit-footer' },
            h("button", { class: 'sm-button', onClick: () => {
                    component.selectedEvent = null;
                } }, "Cancel"),
            h("button", { class: 'sm-button primary flat ok-button', onClick: () => {
                    component.eventUpdate.emit({
                        event: component.selectedEvent.rawEvent,
                        updatedValues: {
                            start: component.selectedEvent.originalStartMoment.format(INTERNAL_FORMAT.DATE_TIME),
                            end: component.selectedEvent.originalEndMoment.format(INTERNAL_FORMAT.DATE_TIME)
                        }
                    });
                    component.selectedEvent = null;
                } }, "Ok")));
    }
    renderHeader(component) {
        return (h("div", { class: 'event-edit-header' },
            component.selectedEvent.title,
            h("div", { class: 'close', onClick: () => {
                    component.selectedEvent = null;
                } }, "X")));
    }
    renderBody(component) {
        return (h("div", { class: 'event-edit-body' },
            h("div", { class: 'form-row' },
                h("label", { class: 'form-label' }, "Start time"),
                h("div", { class: 'form-element date-time-picker' },
                    h("div", { class: 'date-picker' },
                        h("sm-date-picker", { onDateSelected: (payload) => {
                                component.selectedEvent.originalStartMoment = moment(payload.detail + ' ' + component.selectedEvent.originalStartMoment.format(INTERNAL_FORMAT.TIME));
                            }, theme: component.theme, date: component.selectedEvent.originalStartMoment.format(INTERNAL_FORMAT.DATE), "week-start-day": component.weekStartDay })),
                    h("div", { class: 'time-picker' },
                        h("sm-time-picker", { onTimeSelected: (payload) => {
                                component.selectedEvent.originalStartMoment.hour(payload.detail.hour);
                                component.selectedEvent.originalStartMoment.minute(payload.detail.minute);
                            }, hour: component.selectedEvent.originalStartMoment.hour(), minute: component.selectedEvent.originalStartMoment.minute() })))),
            h("div", { class: 'form-row' },
                h("label", { class: 'form-label' }, "End time"),
                h("div", { class: 'form-element date-time-picker' },
                    h("div", { class: 'date-picker' },
                        h("sm-date-picker", { onDateSelected: (payload) => {
                                component.selectedEvent.originalEndMoment = moment(payload.detail + ' ' + component.selectedEvent.originalEndMoment.format(INTERNAL_FORMAT.TIME));
                            }, theme: component.theme, date: component.selectedEvent.originalEndMoment.format(INTERNAL_FORMAT.DATE), "week-start-day": component.weekStartDay })),
                    h("div", { class: 'time-picker' },
                        h("sm-time-picker", { onTimeSelected: (payload) => {
                                component.selectedEvent.originalEndMoment.hour(payload.detail.hour);
                                component.selectedEvent.originalEndMoment.minute(payload.detail.minute);
                            }, hour: component.selectedEvent.originalEndMoment.hour(), minute: component.selectedEvent.originalEndMoment.minute() }))))));
    }
}
export default new EditEvent();
