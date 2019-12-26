import { Moment } from "moment-timezone";
declare class DayView {
    render(component: any): any;
    renderViewContainer(component: any): any;
    renderViewFooter(component: any): any;
    renderViewNavigation(component: any): any;
    renderViewContent(component: any, dates: Array<Moment>): any[];
    getRow(component: any, dates: Array<Moment>): any;
}
declare const _default: DayView;
export default _default;
