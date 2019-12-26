import { h } from "@stencil/core";
import { getDisplayValue } from "../../utils/time-utils";
import { PICKER_VIEWS } from "../../constants";
export class Time {
    render(component) {
        return this.renderViewContainer(component);
    }
    renderViewContainer(component) {
        return (h("div", { class: 'time-view-container' },
            this.renderPickerHeader(component),
            this.renderPickerBody(component),
            this.renderPickerFooter(component)));
    }
    renderPickerFooter(component) {
        return (h("div", { class: 'picker-footer' },
            h("button", { class: 'sm-button', onClick: () => {
                    component.showPicker = false;
                } }, "Close"),
            h("button", { class: 'sm-button primary ok-button', onClick: () => {
                    component.hour = component.contextHour;
                    component.minute = component.contextMinute;
                    component.showPicker = false;
                    component.timeSelected.emit({
                        minute: component.minute,
                        hour: component.hour
                    });
                } }, "Ok")));
    }
    renderPickerHeader(_component) {
        return (h("div", { class: 'picker-header' }));
    }
    isMaxHour(component) {
        if (component.isTwelveHourFormat) {
            if (component.contextHour === 11) {
                return true;
            }
        }
        else {
            if (component.contextHour === 23) {
                return true;
            }
        }
        return false;
    }
    isMinHour(component) {
        if (component.contextHour === 0) {
            return true;
        }
        return false;
    }
    isMaxMinute(component) {
        if (component.contextMinute === 59) {
            return true;
        }
        return false;
    }
    isMinMinute(component) {
        if (component.contextMinute === 0) {
            return true;
        }
        return false;
    }
    renderPickerBody(component) {
        return (h("div", { class: 'picker-body' },
            h("div", { class: 'row' },
                h("div", { class: 'column' },
                    h("div", { class: 'up-triangle', onClick: () => {
                            if (!this.isMaxHour(component)) {
                                component.contextHour = component.contextHour + 1;
                            }
                        } })),
                h("div", { class: 'column' }),
                h("div", { class: 'column' },
                    h("div", { class: 'up-triangle', onClick: () => {
                            if (!this.isMaxMinute(component)) {
                                component.contextMinute = component.contextMinute + 1;
                            }
                        } }))),
            h("div", { class: 'row' },
                h("div", { class: 'column' },
                    h("div", { class: 'hour', onClick: () => {
                            component.pickerView = PICKER_VIEWS.HOUR;
                        } }, getDisplayValue(component.contextHour))),
                h("div", { class: 'column' }, ":"),
                h("div", { class: 'column' },
                    h("div", { class: 'minute', onClick: () => {
                            component.pickerView = PICKER_VIEWS.MINUTE;
                        } }, getDisplayValue(component.contextMinute)))),
            h("div", { class: 'row' },
                h("div", { class: 'column' },
                    h("div", { class: 'down-triangle', onClick: () => {
                            if (!this.isMinHour(component)) {
                                component.contextHour = component.contextHour - 1;
                            }
                        } })),
                h("div", { class: 'column' }),
                h("div", { class: 'column' },
                    h("div", { class: 'down-triangle', onClick: () => {
                            if (!this.isMinMinute(component)) {
                                component.contextMinute = component.contextMinute - 1;
                            }
                        } })))));
    }
}
export default new Time();
