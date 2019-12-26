import { h } from "@stencil/core";
import { PICKER_VIEWS } from "../../constants";
import { getDisplayValue } from "../../utils/time-utils";
export class Hour {
    render(component) {
        return this.renderViewContainer(component);
    }
    renderViewContainer(component) {
        return (h("div", { class: 'hour-view-container' },
            this.renderPickerHeader(component),
            this.renderPickerBody(component)));
    }
    renderPickerHeader(_component) {
        return (h("div", { class: 'picker-header' }));
    }
    renderPickerBody(component) {
        return (h("div", { class: 'picker-body' }, this.renderHours(component)));
    }
    renderHours(component) {
        const hours = this.getHours(component);
        const rows = [];
        const rowCount = hours.length / 4;
        for (let i = 0; i < rowCount; i++) {
            rows.push(this.getRow(component, hours.splice(0, 4)));
        }
        return rows;
    }
    getRow(component, hours) {
        const cells = [];
        hours.forEach((hour) => {
            const cls = ['hour-cell'];
            if (component.contextHour === hour) {
                cls.push('selected');
            }
            cells.push(h("div", { class: cls.join(' '), onClick: () => {
                    component.contextHour = hour;
                    component.pickerView = PICKER_VIEWS.TIME;
                } },
                h("div", { class: 'hour-number' }, getDisplayValue(hour))));
        });
        return (h("div", { class: "hour-row" }, cells));
    }
    getHours(component) {
        const hours = [];
        let maxHours = 23;
        if (component.isTwelveHourFormat) {
            maxHours = 11;
        }
        for (let i = 0; i <= maxHours; i++) {
            hours.push(i);
        }
        return hours;
    }
}
export default new Hour();
