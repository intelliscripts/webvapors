import { ContextPanelTemplateRenderer } from "./ContextPanelTemplateRenderer";
import CalendarEvent from "../../utils/events/CalendarEvent";
import { Moment } from "moment";
declare class ContextPanel {
    templateRenderer: ContextPanelTemplateRenderer;
    render(component: any): any;
    renderContextPanel(component: any): any;
    renderHeader(component: any): any;
    renderBody(component: any): any;
    renderContextDateEvents(component: any): any;
    getContextDateEvents(component: any): CalendarEvent[];
    chopEvents(_component: any, events: Array<CalendarEvent>, contextStartMoment: Moment, contextEndMoment: Moment): void;
}
declare const _default: ContextPanel;
export default _default;
