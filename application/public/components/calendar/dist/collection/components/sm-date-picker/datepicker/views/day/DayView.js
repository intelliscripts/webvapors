import moment from "moment-timezone";
import { INTERNAL_FORMAT, PICKER_VIEWS, WEEK_DAYS } from "../../constants";
import { h } from "@stencil/core";
import { calculateDateRange } from './day-view-utils';
class DayView {
    render(component) {
        return this.renderViewContainer(component);
    }
    renderViewContainer(component) {
        const { weekStartDay, contextMoment } = component;
        const dates = calculateDateRange(contextMoment, WEEK_DAYS[weekStartDay]);
        return (h("div", { class: 'day-view-container' },
            this.renderViewNavigation(component),
            this.renderViewContent(component, dates)));
    }
    renderViewFooter(component) {
        return (h("div", null,
            h("button", { class: 'sm-button', onClick: () => {
                    component.showPicker = false;
                } }, "Close"),
            h("button", { class: 'sm-button primary today-button', onClick: () => {
                    component.date = moment().format(INTERNAL_FORMAT.DATE);
                    component.showPicker = false;
                } }, "Today")));
    }
    renderViewNavigation(component) {
        const { contextMoment } = component;
        return (h("div", { class: 'view-navigation' },
            h("div", { class: 'nav-item' },
                h("div", { class: "left-triangle", onClick: () => {
                        const currentDate = component.contextMoment.clone();
                        currentDate.add(-1, 'months').date(1);
                        component.contextMoment = currentDate;
                    } })),
            h("div", { class: 'nav-item label' },
                h("span", { onClick: () => {
                        component.pickerView = PICKER_VIEWS.MONTH;
                    } }, contextMoment.format('MMMM YYYY'))),
            h("div", { class: 'nav-item' },
                h("div", { class: "right-triangle", onClick: () => {
                        const currentDate = component.contextMoment.clone();
                        currentDate.add(1, 'months').date(1);
                        component.contextMoment = currentDate;
                    } }))));
    }
    renderViewContent(component, dates) {
        const headerDates = dates.slice(0, 7);
        const headerDateCells = [];
        headerDates.forEach((date) => {
            headerDateCells.push(h("div", { class: 'day-name' }, date.format('ddd')));
        });
        const rows = [];
        const rowCount = dates.length / 7;
        for (let i = 0; i < rowCount; i++) {
            rows.push(this.getRow(component, dates.splice(0, 7)));
        }
        return ([
            h("div", { class: 'view-header' }, headerDateCells),
            h("div", { class: 'view-content' }, rows),
            h("div", { class: 'view-footer' }, this.renderViewFooter(component))
        ]);
    }
    getRow(component, dates) {
        const cells = [];
        const selectedDate = moment(component.date);
        dates.forEach((date) => {
            const cls = ['date-cell'];
            if (moment().isSame(date, 'day')) {
                cls.push('today');
            }
            if (selectedDate.isSame(date, 'day')) {
                cls.push('selected');
            }
            if (!component.contextMoment.isSame(date, 'month')) {
                cls.push('grey-out');
            }
            cells.push(h("div", { class: cls.join(' '), onClick: () => {
                    if (component.contextMoment.isSame(date, 'month')) {
                        component.date = date.format(INTERNAL_FORMAT.DATE);
                        component.showPicker = false;
                    }
                } }, date.format('DD')));
        });
        return (h("div", { class: "date-row" }, cells));
    }
}
export default new DayView();
