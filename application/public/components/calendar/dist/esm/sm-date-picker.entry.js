import { h, r as registerInstance, c as createEvent, H as Host } from './core-8c3eb49f.js';
import { a as moment, m as moment$1 } from './index-fbd28b63.js';

const WEEK_DAYS = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
};
const PICKER_VIEWS = {
    DAY: 'DAY',
    MONTH: 'MONTH',
    YEAR: 'YEAR'
};
const INTERNAL_FORMAT = {
    DATE: 'YYYY-MM-DD',
    TIME: 'HH:mm:ss',
    DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
    DISPLAY_TIME: 'HH:mm'
};

function getWeekEndDayNumber(startDayNumber) {
    if (startDayNumber == 0)
        return 6;
    return startDayNumber - 1;
}
function getNextDate(date, weekEndDayNumber) {
    const dayNumber = date.day();
    if (weekEndDayNumber >= dayNumber)
        date.day(weekEndDayNumber);
    else
        date.day(weekEndDayNumber + 7);
    date.endOf('day');
    return date;
}
function getPreviousDate(date, weekStartDayNumber) {
    const dayNumber = date.day();
    if (weekStartDayNumber <= dayNumber)
        date.day(weekStartDayNumber);
    else
        date.day(weekStartDayNumber - 7);
    date.startOf('day');
    return date;
}
function getFirstDayOfaMonthView(date, weekStartDay) {
    const firstDateOfMonth = date.clone().startOf('month');
    const firstDateOfMonthView = getPreviousDate(firstDateOfMonth, weekStartDay);
    return firstDateOfMonthView;
}
function getLastDayOfaMonthView(date, weekLastDay) {
    const lastDateOfMonth = date.clone().endOf('month');
    const lastDateOfMonthView = getNextDate(lastDateOfMonth, weekLastDay);
    return lastDateOfMonthView;
}
function getBetweenDates(startDateMoment, endDateMoment) {
    const dates = [];
    const startDateMomentClone = startDateMoment.clone();
    while (startDateMomentClone.valueOf() < endDateMoment.valueOf()) {
        dates.push(startDateMomentClone.clone());
        startDateMomentClone.add(1, 'days');
    }
    return dates;
}
function calculateDateRange(date, weekStartDayNumber) {
    const weekEndDayNumber = getWeekEndDayNumber(weekStartDayNumber);
    const startMoment = getFirstDayOfaMonthView(date, weekStartDayNumber);
    const endMoment = getLastDayOfaMonthView(date, weekEndDayNumber);
    return getBetweenDates(startMoment, endMoment);
}

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
const dayView = new DayView();

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
                        component.navMoment = moment$1().year(navYear).month(0).startOf('month');
                    } })),
            h("div", { class: 'nav-item label' },
                h("span", null, navMoment.format('YYYY'))),
            h("div", { class: 'nav-item' },
                h("div", { class: "right-triangle", onClick: () => {
                        let navYear = navMoment.year();
                        navYear += 1;
                        component.navMoment = moment$1().year(navYear).month(0).startOf('month');
                    } }))));
    }
    renderViewContent(component) {
        const { navMoment } = component;
        const monthDateMoments = [];
        moment$1.monthsShort().forEach((index) => {
            const monthStart = moment$1().year(navMoment.year()).month(index).startOf('month');
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
            if (moment$1().isSame(date, 'month')) {
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
                    component.contextMoment = moment$1().startOf('month');
                    component.pickerView = PICKER_VIEWS.DAY;
                } }, "Current Month")));
    }
}
const monthView = new MonthView();

class DatePicker {
    togglePicker(component) {
        component.showPicker = !component.showPicker;
    }
    renderDropdown(component) {
        // return (
        //   <div class='sm-date-picker-dropdown' onClick={() => this.togglePicker(component)}>
        //     <span>{component.label || moment(component.date).format('DD MMM YYYY')}</span>
        //     <div class="down-triangle">
        //     </div>
        //   </div>
        // );
        return (h("div", { class: 'sm-date-picker-icon', onClick: () => this.togglePicker(component) },
            h("img", { src: 'data:image/png;base64,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' })));
    }
    renderPicker(component) {
        const { showPicker } = component;
        let currentView;
        if (!showPicker) {
            return;
        }
        if (component.pickerView === PICKER_VIEWS.DAY) {
            currentView = dayView.render(component);
        }
        else if (component.pickerView === PICKER_VIEWS.MONTH) {
            currentView = monthView.render(component);
        }
        return (h("div", { class: 'sm-date-picker-popover' },
            h("div", { class: 'sm-date-picker-popover-container' }, currentView)));
    }
    render(component) {
        return ([this.renderDropdown(component), this.renderPicker(component)]);
    }
}
const datePicker = new DatePicker();

const SmDatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * weekStartDay
         */
        this.weekStartDay = 'sun';
        /**
         * date
         */
        this.date = moment().format(INTERNAL_FORMAT.DATE);
        /**
         * showPicker
         */
        this.showPicker = false;
        /**
         * Theme
         */
        this.theme = 'teal';
        this.pickerView = PICKER_VIEWS.DAY;
        this.contextMoment = moment(this.date, INTERNAL_FORMAT.DATE);
        this.navMoment = moment(this.date, INTERNAL_FORMAT.DATE);
        this.dateSelected = createEvent(this, "dateSelected", 7);
    }
    handleDateChange(date) {
        this.dateSelected.emit(date);
        this.contextMoment = moment(date, INTERNAL_FORMAT.DATE);
    }
    handleContextMomentChange(contextMoment) {
        this.navMoment = contextMoment.clone();
    }
    handleShowPickerChange() {
        this.pickerView = PICKER_VIEWS.DAY;
        this.contextMoment = moment(this.date, INTERNAL_FORMAT.DATE);
    }
    render() {
        return (h(Host, { style: { '--theme-color': this.theme } }, h("div", { class: 'sm-date-picker' }, h("div", { class: 'sm-date-picker-container' }, datePicker.render(this)))));
    }
    static get watchers() { return {
        "date": ["handleDateChange"],
        "contextMoment": ["handleContextMomentChange"],
        "showPicker": ["handleShowPickerChange"]
    }; }
    static get style() { return "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}menu,ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}.down-triangle{float:right;margin-top:5px;width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-top:9px solid #000;margin-left:9px}.left-triangle{float:right;margin-top:3px;margin-right:25px;width:0;height:0;border-top:9px solid transparent;border-bottom:9px solid transparent;border-right:9px solid var(--theme-color)}.left-triangle:hover{cursor:pointer}.right-triangle{margin-top:3px;margin-left:25px;width:0;height:0;border-top:9px solid transparent;border-bottom:9px solid transparent;border-left:9px solid var(--theme-color)}.right-triangle:hover{cursor:pointer}.sm-button{margin-right:10px;margin-bottom:10px;margin-top:10px;padding:8px;-webkit-box-shadow:none;box-shadow:none;border:none;font-size:14px;background:#fff}.sm-button.primary{color:var(--theme-color)}.sm-button:hover{cursor:pointer}.day-view-container .view-header{display:-ms-flexbox;display:flex;margin:10px 0}.day-view-container .view-header .day-name{-ms-flex:1;flex:1;font-size:14px;text-align:center}.day-view-container .view-content .date-row{display:-ms-flexbox;display:flex}.day-view-container .view-content .date-row .date-cell{-ms-flex:1;flex:1;text-align:center;padding:11px;font-size:13px;font-weight:300;border-radius:50%}.day-view-container .view-content .date-row .date-cell.today{border:1px solid var(--theme-color)}.day-view-container .view-content .date-row .date-cell.selected{background:var(--theme-color);color:#fff!important}.day-view-container .view-content .date-row .date-cell.grey-out{color:#ccc;cursor:not-allowed!important}.day-view-container .view-content .date-row .date-cell:hover{cursor:pointer;background:var(--theme-color);opacity:.4;color:#fff!important}.month-view-container .month-row{display:-ms-flexbox;display:flex;margin:10px}.month-view-container .month-row .month-cell{-ms-flex:1;flex:1;text-align:center;margin:10px;font-weight:300;font-size:15px}.month-view-container .month-row .month-cell.current-month{color:var(--theme-color)}.month-view-container .month-row .month-cell:hover{cursor:pointer;color:var(--theme-color)}:host{--theme-color:teal}.sm-date-picker{position:relative;font-family:Open Sans,sans-serif}.sm-date-picker .today-button{float:right}.sm-date-picker .sm-date-picker-container .sm-date-picker-icon img{width:25px;height:25px}.sm-date-picker .sm-date-picker-container .sm-date-picker-icon img:hover{cursor:pointer}.sm-date-picker .sm-date-picker-container .sm-date-picker-dropdown{padding:8px;text-align:center;font-weight:300}.sm-date-picker .sm-date-picker-container .sm-date-picker-dropdown:hover{cursor:pointer}.sm-date-picker .sm-date-picker-container .sm-date-picker-popover{position:absolute;top:38px;left:-1px;width:300px;-webkit-box-shadow:0 0 5px #ccc;box-shadow:0 0 5px #ccc;height:auto;border:1px solid #ccc;min-height:200px;background:#fff;z-index:9}.sm-date-picker .sm-date-picker-container .sm-date-picker-popover .sm-date-picker-popover-container{padding:8px}.sm-date-picker .sm-date-picker-container .sm-date-picker-popover .sm-date-picker-popover-container .view-navigation{display:-ms-flexbox;display:flex;padding-bottom:10px;margin-top:10px}.sm-date-picker .sm-date-picker-container .sm-date-picker-popover .sm-date-picker-popover-container .view-navigation .nav-item{-ms-flex:1;flex:1;text-align:center}.sm-date-picker .sm-date-picker-container .sm-date-picker-popover .sm-date-picker-popover-container .view-navigation .nav-item.label{-ms-flex:3;flex:3;cursor:default;color:var(--theme-color);padding-top:2px}.sm-date-picker .sm-date-picker-container .sm-date-picker-popover .sm-date-picker-popover-container .view-navigation .nav-item.label span:hover{cursor:pointer}"; }
};

export { SmDatePicker as sm_date_picker };
