import { h } from "@stencil/core";
import { INTERNAL_FORMAT, VIEW_LABELS } from "../constants";
import moment from "moment";
class Header {
    render(component) {
        return (h("div", { class: 'header-container' },
            h("div", { class: 'header-section' }, this.renderViewNavigation(component)),
            h("div", { class: 'header-section' },
                h("div", { class: 'context-date-label' }, component.viewRenderer.getHeaderText(component))),
            h("div", { class: 'header-section' }, this.renderViewButton(component))));
    }
    renderViewRange(component) {
        return (h("div", { class: 'view-range' }, component.viewRenderer.getHeaderText(component)));
    }
    renderViewNavigation(component) {
        return (h("div", { class: 'view-navigation' },
            h("div", { class: 'nav-item' },
                h("div", { class: 'btn-list' },
                    h("div", { class: 'btn-list-item' },
                        h("div", { class: "left-triangle", onClick: () => {
                                component.viewRenderer.prev(component);
                            } })),
                    h("div", { class: 'btn-list-item' },
                        h("div", { class: 'today-button', onClick: () => {
                                component.contextDate = moment().startOf('day').format(INTERNAL_FORMAT.DATE);
                            } }, "Today")),
                    h("div", { class: 'btn-list-item' },
                        h("div", { class: "right-triangle", onClick: () => {
                                component.viewRenderer.next(component);
                            } })))),
            h("div", { class: 'nav-item' },
                h("div", { class: 'date-picker' },
                    h("sm-date-picker", { onDateSelected: (payload) => {
                            if (component.contextMoment.format(INTERNAL_FORMAT.DATE) !== payload.detail) {
                                component.contextDate = payload.detail;
                            }
                        }, label: component.viewRenderer.getDatePickerLabel(component), theme: component.theme, date: component.contextMoment.format(INTERNAL_FORMAT.DATE), "week-start-day": component.weekStartDay })))));
    }
    renderViewButton(component) {
        const { availableViews } = component;
        const buttons = [];
        availableViews.forEach((view) => {
            const cls = ['view-name'];
            if (view === component.view) {
                cls.push('active');
            }
            buttons.push(h("div", { class: cls.join(' '), onClick: () => {
                    component.view = view;
                } }, VIEW_LABELS[view]));
        });
        return (h("div", { class: 'view-list' }, buttons));
    }
}
export default new Header();
