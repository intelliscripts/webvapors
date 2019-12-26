import { h, r as registerInstance, c as createEvent, H as Host } from './core-8c3eb49f.js';

const PICKER_VIEWS = {
    TIME: 'DAY',
    HOUR: 'MONTH',
    MINUTE: 'YEAR'
};

function getDisplayValue(str) {
    if (str.toString().length === 1) {
        return '0' + str;
    }
    return str;
}

class Time {
    render(component) {
        return this.renderViewContainer(component);
    }
    renderViewContainer(component) {
        return (h("div", { class: 'time-view-container' },
            this.renderPickerHeader(component),
            this.renderPickerBody(component),
            this.renderPickerFooter(component)));
    }
    renderPickerFooter(component) {
        return (h("div", { class: 'picker-footer' },
            h("button", { class: 'sm-button', onClick: () => {
                    component.showPicker = false;
                } }, "Close"),
            h("button", { class: 'sm-button primary ok-button', onClick: () => {
                    component.hour = component.contextHour;
                    component.minute = component.contextMinute;
                    component.showPicker = false;
                    component.timeSelected.emit({
                        minute: component.minute,
                        hour: component.hour
                    });
                } }, "Ok")));
    }
    renderPickerHeader(_component) {
        return (h("div", { class: 'picker-header' }));
    }
    isMaxHour(component) {
        if (component.isTwelveHourFormat) {
            if (component.contextHour === 11) {
                return true;
            }
        }
        else {
            if (component.contextHour === 23) {
                return true;
            }
        }
        return false;
    }
    isMinHour(component) {
        if (component.contextHour === 0) {
            return true;
        }
        return false;
    }
    isMaxMinute(component) {
        if (component.contextMinute === 59) {
            return true;
        }
        return false;
    }
    isMinMinute(component) {
        if (component.contextMinute === 0) {
            return true;
        }
        return false;
    }
    renderPickerBody(component) {
        return (h("div", { class: 'picker-body' },
            h("div", { class: 'row' },
                h("div", { class: 'column' },
                    h("div", { class: 'up-triangle', onClick: () => {
                            if (!this.isMaxHour(component)) {
                                component.contextHour = component.contextHour + 1;
                            }
                        } })),
                h("div", { class: 'column' }),
                h("div", { class: 'column' },
                    h("div", { class: 'up-triangle', onClick: () => {
                            if (!this.isMaxMinute(component)) {
                                component.contextMinute = component.contextMinute + 1;
                            }
                        } }))),
            h("div", { class: 'row' },
                h("div", { class: 'column' },
                    h("div", { class: 'hour', onClick: () => {
                            component.pickerView = PICKER_VIEWS.HOUR;
                        } }, getDisplayValue(component.contextHour))),
                h("div", { class: 'column' }, ":"),
                h("div", { class: 'column' },
                    h("div", { class: 'minute', onClick: () => {
                            component.pickerView = PICKER_VIEWS.MINUTE;
                        } }, getDisplayValue(component.contextMinute)))),
            h("div", { class: 'row' },
                h("div", { class: 'column' },
                    h("div", { class: 'down-triangle', onClick: () => {
                            if (!this.isMinHour(component)) {
                                component.contextHour = component.contextHour - 1;
                            }
                        } })),
                h("div", { class: 'column' }),
                h("div", { class: 'column' },
                    h("div", { class: 'down-triangle', onClick: () => {
                            if (!this.isMinMinute(component)) {
                                component.contextMinute = component.contextMinute - 1;
                            }
                        } })))));
    }
}
const timeView = new Time();

class Hour {
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
const hourView = new Hour();

class Minute {
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
const minuteView = new Minute();

class TimePicker {
    togglePicker(component) {
        component.showPicker = !component.showPicker;
    }
    getTime(component) {
        return getDisplayValue(component.hour) + ':' + getDisplayValue(component.minute);
    }
    renderDropdown(component) {
        return (h("div", { class: 'sm-time-picker-dropdown', onClick: () => this.togglePicker(component) },
            h("span", null, component.label || this.getTime(component)),
            h("div", { class: "down-triangle" })));
    }
    renderPicker(component) {
        const { showPicker } = component;
        let currentView;
        if (!showPicker) {
            return;
        }
        if (component.pickerView === PICKER_VIEWS.TIME) {
            currentView = timeView.render(component);
        }
        if (component.pickerView === PICKER_VIEWS.HOUR) {
            currentView = hourView.render(component);
        }
        if (component.pickerView === PICKER_VIEWS.MINUTE) {
            currentView = minuteView.render(component);
        }
        return (h("div", { class: 'sm-time-picker-popover' },
            h("div", { class: 'sm-time-picker-popover-container' }, currentView)));
    }
    render(component) {
        return ([this.renderDropdown(component), this.renderPicker(component)]);
    }
}
const timePicker = new TimePicker();

const SmTimePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Theme
         */
        this.theme = 'teal';
        /**
         * hour
         */
        this.hour = 0;
        /**
         * minute
         */
        this.minute = 0;
        /**
         * showPicker
         */
        this.showPicker = false;
        /**
         * isTwelveHourFormat
         */
        this.isTwelveHourFormat = false;
        /**
         * meridian
         */
        this.meridian = 'am';
        this.pickerView = PICKER_VIEWS.TIME;
        this.contextHour = this.hour;
        this.contextMinute = this.minute;
        this.timeSelected = createEvent(this, "timeSelected", 7);
    }
    handleShowPickerChange() {
        this.pickerView = PICKER_VIEWS.TIME;
        this.contextHour = this.hour;
        this.contextMinute = this.minute;
    }
    render() {
        return (h(Host, { style: { '--theme-color': this.theme } }, h("div", { class: 'sm-time-picker' }, h("div", { class: 'sm-time-picker-container' }, timePicker.render(this)))));
    }
    static get watchers() { return {
        "showPicker": ["handleShowPickerChange"]
    }; }
    static get style() { return "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}menu,ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}.down-triangle{border-top:10px solid #444}.down-triangle,.up-triangle{width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;margin-left:10px}.up-triangle{border-bottom:10px solid #444}.left-triangle{width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid var(--theme-color)}.left-triangle:hover{cursor:pointer}.right-triangle{width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:10px solid var(--theme-color)}.right-triangle:hover{cursor:pointer}.sm-button{margin-right:10px;margin-bottom:10px;margin-top:10px;padding:8px;-webkit-box-shadow:none;box-shadow:none;border:none;font-size:14px;background:#fff}.sm-button.primary{color:var(--theme-color)}.sm-button:hover{cursor:pointer}.sm-button.flat{background:var(--theme-color);color:#fff}.time-view-container .picker-body{margin-top:10px}.time-view-container .picker-body .row{display:-ms-flexbox;display:flex;margin-bottom:20px}.time-view-container .picker-body .row .column{-ms-flex:1;flex:1;text-align:center}.time-view-container .picker-body .row .column .down-triangle,.time-view-container .picker-body .row .column .up-triangle{margin:0 auto}.time-view-container .picker-body .row .column .down-triangle:hover,.time-view-container .picker-body .row .column .up-triangle:hover{cursor:pointer}.time-view-container .picker-body .row .column .hour,.time-view-container .picker-body .row .column .minute{font-size:18px;font-weight:200;color:var(--theme-color)}.time-view-container .picker-body .row .column .hour:hover,.time-view-container .picker-body .row .column .minute:hover{cursor:pointer}.time-view-container .picker-footer .ok-button{float:right}.hour-view-container .picker-body .hour-row{display:-ms-flexbox;display:flex}.hour-view-container .picker-body .hour-row .hour-cell{-ms-flex:1;flex:1}.hour-view-container .picker-body .hour-row .hour-cell.selected .hour-number{background:var(--theme-color);color:#fff!important}.hour-view-container .picker-body .hour-row .hour-cell .hour-number{padding:5px;font-size:13px;border-radius:50%;width:18px;height:18px;text-align:center}.hour-view-container .picker-body .hour-row .hour-cell .hour-number:hover{cursor:pointer;background:var(--theme-color);opacity:.4;color:#fff!important}.minute-view-container .picker-body .minute-row{display:-ms-flexbox;display:flex}.minute-view-container .picker-body .minute-row .minute-cell{-ms-flex:1;flex:1}.minute-view-container .picker-body .minute-row .minute-cell.selected .minute-number{background:var(--theme-color);color:#fff!important}.minute-view-container .picker-body .minute-row .minute-cell .minute-number{padding:5px;font-size:13px;border-radius:50%;width:18px;height:18px;text-align:center}.minute-view-container .picker-body .minute-row .minute-cell .minute-number:hover{cursor:pointer;background:var(--theme-color);opacity:.4;color:#fff!important}:host{--theme-color:teal}.sm-time-picker{min-width:100px;border-bottom:1px solid #aaa;position:relative;font-family:Open Sans,sans-serif}.sm-time-picker .today-button{float:right}.sm-time-picker .sm-time-picker-container .sm-time-picker-dropdown{padding:8px;text-align:center;font-weight:300}.sm-time-picker .sm-time-picker-container .sm-time-picker-dropdown .down-triangle{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #000;float:right;margin-top:5px}.sm-time-picker .sm-time-picker-container .sm-time-picker-dropdown:hover{cursor:pointer}.sm-time-picker .sm-time-picker-container .sm-time-picker-popover{position:absolute;top:38px;left:-1px;width:200px;-webkit-box-shadow:0 0 5px #ccc;box-shadow:0 0 5px #ccc;height:auto;border:1px solid #ccc;background:#fff;z-index:9}.sm-time-picker .sm-time-picker-container .sm-time-picker-popover .sm-time-picker-popover-container{padding:8px}"; }
};

export { SmTimePicker as sm_time_picker };
