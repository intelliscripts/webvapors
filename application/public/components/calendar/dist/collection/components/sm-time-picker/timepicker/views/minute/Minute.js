import { h } from "@stencil/core";
import { PICKER_VIEWS } from "../../constants";
import { getDisplayValue } from "../../utils/time-utils";
export class Minute {
    render(component) {
        return this.renderViewContainer(component);
    }
    renderViewContainer(component) {
        return (h("div", { class: 'minute-view-container' },
            this.renderPickerHeader(component),
            this.renderPickerBody(component)));
    }
    renderPickerHeader(_component) {
        return (h("div", { class: 'picker-header' }));
    }
    renderPickerBody(component) {
        return (h("div", { class: 'picker-body' }, this.renderMinutes(component)));
    }
    renderMinutes(component) {
        const minutes = this.getMinutes(component);
        const rows = [];
        const rowCount = minutes.length / 6;
        for (let i = 0; i < rowCount; i++) {
            rows.push(this.getRow(component, minutes.splice(0, 6)));
        }
        return rows;
    }
    getRow(component, minutes) {
        const cells = [];
        minutes.forEach((minute) => {
            const cls = ['minute-cell'];
            if (component.contextMinute === minute) {
                cls.push('selected');
            }
            cells.push(h("div", { class: cls.join(' '), onClick: () => {
                    component.contextMinute = minute;
                    component.pickerView = PICKER_VIEWS.TIME;
                } },
                h("div", { class: 'minute-number' }, getDisplayValue(minute))));
        });
        return (h("div", { class: "minute-row" }, cells));
    }
    getMinutes(_component) {
        const minutes = [];
        let maxMinutes = 59;
        for (let i = 0; i <= maxMinutes; i++) {
            minutes.push(i);
        }
        return minutes;
    }
}
export default new Minute();
