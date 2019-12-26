import { Moment } from "moment";
declare class MonthView {
    render(component: any): any;
    renderViewContainer(component: any): any;
    renderViewNavigation(component: any): any;
    renderViewContent(component: any): any[];
    getRow(component: any, dates: Array<Moment>): any;
    renderViewFooter(component: any): any;
}
declare const _default: MonthView;
export default _default;
