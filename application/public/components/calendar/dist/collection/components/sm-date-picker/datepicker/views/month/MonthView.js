import moment from "moment";
import { h } from "@stencil/core";
import { PICKER_VIEWS } from "../../constants";
class MonthView {
    render(component) {
        return this.renderViewContainer(component);
    }
    renderViewContainer(component) {
        return (h("div", { class: 'month-view-container' },
            this.renderViewNavigation(component),
            this.renderViewContent(component)));
    }
    renderViewNavigation(component) {
        const { navMoment } = component;
        return (h("div", { class: 'view-navigation' },
            h("div", { class: 'nav-item' },
                h("div", { class: "left-triangle", onClick: () => {
                        let navYear = navMoment.year();
                        navYear -= 1;
                        component.navMoment = moment().year(navYear).month(0).startOf('month');
                    } })),
            h("div", { class: 'nav-item label' },
                h("span", null, navMoment.format('YYYY'))),
            h("div", { class: 'nav-item' },
                h("div", { class: "right-triangle", onClick: () => {
                        let navYear = navMoment.year();
                        navYear += 1;
                        component.navMoment = moment().year(navYear).month(0).startOf('month');
                    } }))));
    }
    renderViewContent(component) {
        const { navMoment } = component;
        const monthDateMoments = [];
        moment.monthsShort().forEach((index) => {
            const monthStart = moment().year(navMoment.year()).month(index).startOf('month');
            monthDateMoments.push(monthStart);
        });
        const rows = [];
        const rowCount = monthDateMoments.length / 3;
        for (let i = 0; i < rowCount; i++) {
            rows.push(this.getRow(component, monthDateMoments.splice(0, 3)));
        }
        return [...rows, this.renderViewFooter(component)];
    }
    getRow(component, dates) {
        const cells = [];
        dates.forEach((date) => {
            const cls = ['month-cell'];
            if (moment().isSame(date, 'month')) {
                cls.push('current-month');
            }
            cells.push(h("div", { class: cls.join(' '), onClick: () => {
                    component.contextMoment = date.clone();
                    component.pickerView = PICKER_VIEWS.DAY;
                } }, date.format('MMM')));
        });
        return (h("div", { class: "month-row" }, cells));
    }
    renderViewFooter(component) {
        return (h("div", { class: 'view-footer' },
            h("button", { class: 'sm-button', onClick: () => {
                    component.pickerView = PICKER_VIEWS.DAY;
                } }, "Back"),
            h("button", { class: 'sm-button primary today-button', onClick: () => {
                    component.contextMoment = moment().startOf('month');
                    component.pickerView = PICKER_VIEWS.DAY;
                } }, "Current Month")));
    }
}
export default new MonthView();
