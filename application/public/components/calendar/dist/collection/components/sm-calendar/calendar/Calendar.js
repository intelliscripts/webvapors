import { h } from "@stencil/core";
import header from './header/Header';
import dayView from './views/day/Day';
import weekView from './views/week/Week';
import monthView from './views/month/Month';
import contextPanel from './views/contextpanel/ContextPanel';
import editEvent from './edit-event/EditEvent';
import { VIEWS } from "./constants";
class Calendar {
    getViewRenderer(component) {
        if (component.view === VIEWS.day)
            return dayView;
        else if (component.view === VIEWS.week)
            return weekView;
        else if (component.view === VIEWS.month)
            return monthView;
    }
    render(component) {
        component.viewRenderer = this.getViewRenderer(component);
        component.contextPanel = contextPanel;
        const { startMoment, endMoment } = component;
        component.viewRange = {};
        component.viewRange.dates = component.viewRenderer.getDatesInViewRange(startMoment, endMoment);
        component.viewRange.events = component.viewRenderer.getEventsInViewRange(component);
        return (h("div", { class: 'sm-calendar-container', style: { '--header-height': '50px' } },
            h("header", { class: 'sm-calendar-header' }, header.render(component)),
            h("div", { class: 'sm-calendar-body' },
                component.viewRenderer.render(component),
                component.contextPanel.render(component)),
            h("div", { class: 'sm-calendar-other' }, editEvent.render(component))));
    }
}
export default new Calendar();
