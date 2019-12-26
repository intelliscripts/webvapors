import { h, r as registerInstance, c as createEvent, H as Host } from './core-8c3eb49f.js';
var PICKER_VIEWS = {
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
var Time = /** @class */ (function () {
    function Time() {
    }
    Time.prototype.render = function (component) {
        return this.renderViewContainer(component);
    };
    Time.prototype.renderViewContainer = function (component) {
        return (h("div", { class: 'time-view-container' }, this.renderPickerHeader(component), this.renderPickerBody(component), this.renderPickerFooter(component)));
    };
    Time.prototype.renderPickerFooter = function (component) {
        return (h("div", { class: 'picker-footer' }, h("button", { class: 'sm-button', onClick: function () {
                component.showPicker = false;
            } }, "Close"), h("button", { class: 'sm-button primary ok-button', onClick: function () {
                component.hour = component.contextHour;
                component.minute = component.contextMinute;
                component.showPicker = false;
                component.timeSelected.emit({
                    minute: component.minute,
                    hour: component.hour
                });
            } }, "Ok")));
    };
    Time.prototype.renderPickerHeader = function (_component) {
        return (h("div", { class: 'picker-header' }));
    };
    Time.prototype.isMaxHour = function (component) {
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
    };
    Time.prototype.isMinHour = function (component) {
        if (component.contextHour === 0) {
            return true;
        }
        return false;
    };
    Time.prototype.isMaxMinute = function (component) {
        if (component.contextMinute === 59) {
            return true;
        }
        return false;
    };
    Time.prototype.isMinMinute = function (component) {
        if (component.contextMinute === 0) {
            return true;
        }
        return false;
    };
    Time.prototype.renderPickerBody = function (component) {
        var _this = this;
        return (h("div", { class: 'picker-body' }, h("div", { class: 'row' }, h("div", { class: 'column' }, h("div", { class: 'up-triangle', onClick: function () {
                if (!_this.isMaxHour(component)) {
                    component.contextHour = component.contextHour + 1;
                }
            } })), h("div", { class: 'column' }), h("div", { class: 'column' }, h("div", { class: 'up-triangle', onClick: function () {
                if (!_this.isMaxMinute(component)) {
                    component.contextMinute = component.contextMinute + 1;
                }
            } }))), h("div", { class: 'row' }, h("div", { class: 'column' }, h("div", { class: 'hour', onClick: function () {
                component.pickerView = PICKER_VIEWS.HOUR;
            } }, getDisplayValue(component.contextHour))), h("div", { class: 'column' }, ":"), h("div", { class: 'column' }, h("div", { class: 'minute', onClick: function () {
                component.pickerView = PICKER_VIEWS.MINUTE;
            } }, getDisplayValue(component.contextMinute)))), h("div", { class: 'row' }, h("div", { class: 'column' }, h("div", { class: 'down-triangle', onClick: function () {
                if (!_this.isMinHour(component)) {
                    component.contextHour = component.contextHour - 1;
                }
            } })), h("div", { class: 'column' }), h("div", { class: 'column' }, h("div", { class: 'down-triangle', onClick: function () {
                if (!_this.isMinMinute(component)) {
                    component.contextMinute = component.contextMinute - 1;
                }
            } })))));
    };
    return Time;
}());
var timeView = new Time();
var Hour = /** @class */ (function () {
    function Hour() {
    }
    Hour.prototype.render = function (component) {
        return this.renderViewContainer(component);
    };
    Hour.prototype.renderViewContainer = function (component) {
        return (h("div", { class: 'hour-view-container' }, this.renderPickerHeader(component), this.renderPickerBody(component)));
    };
    Hour.prototype.renderPickerHeader = function (_component) {
        return (h("div", { class: 'picker-header' }));
    };
    Hour.prototype.renderPickerBody = function (component) {
        return (h("div", { class: 'picker-body' }, this.renderHours(component)));
    };
    Hour.prototype.renderHours = function (component) {
        var hours = this.getHours(component);
        var rows = [];
        var rowCount = hours.length / 4;
        for (var i = 0; i < rowCount; i++) {
            rows.push(this.getRow(component, hours.splice(0, 4)));
        }
        return rows;
    };
    Hour.prototype.getRow = function (component, hours) {
        var cells = [];
        hours.forEach(function (hour) {
            var cls = ['hour-cell'];
            if (component.contextHour === hour) {
                cls.push('selected');
            }
            cells.push(h("div", { class: cls.join(' '), onClick: function () {
                    component.contextHour = hour;
                    component.pickerView = PICKER_VIEWS.TIME;
                } }, h("div", { class: 'hour-number' }, getDisplayValue(hour))));
        });
        return (h("div", { class: "hour-row" }, cells));
    };
    Hour.prototype.getHours = function (component) {
        var hours = [];
        var maxHours = 23;
        if (component.isTwelveHourFormat) {
            maxHours = 11;
        }
        for (var i = 0; i <= maxHours; i++) {
            hours.push(i);
        }
        return hours;
    };
    return Hour;
}());
var hourView = new Hour();
var Minute = /** @class */ (function () {
    function Minute() {
    }
    Minute.prototype.render = function (component) {
        return this.renderViewContainer(component);
    };
    Minute.prototype.renderViewContainer = function (component) {
        return (h("div", { class: 'minute-view-container' }, this.renderPickerHeader(component), this.renderPickerBody(component)));
    };
    Minute.prototype.renderPickerHeader = function (_component) {
        return (h("div", { class: 'picker-header' }));
    };
    Minute.prototype.renderPickerBody = function (component) {
        return (h("div", { class: 'picker-body' }, this.renderMinutes(component)));
    };
    Minute.prototype.renderMinutes = function (component) {
        var minutes = this.getMinutes(component);
        var rows = [];
        var rowCount = minutes.length / 6;
        for (var i = 0; i < rowCount; i++) {
            rows.push(this.getRow(component, minutes.splice(0, 6)));
        }
        return rows;
    };
    Minute.prototype.getRow = function (component, minutes) {
        var cells = [];
        minutes.forEach(function (minute) {
            var cls = ['minute-cell'];
            if (component.contextMinute === minute) {
                cls.push('selected');
            }
            cells.push(h("div", { class: cls.join(' '), onClick: function () {
                    component.contextMinute = minute;
                    component.pickerView = PICKER_VIEWS.TIME;
                } }, h("div", { class: 'minute-number' }, getDisplayValue(minute))));
        });
        return (h("div", { class: "minute-row" }, cells));
    };
    Minute.prototype.getMinutes = function (_component) {
        var minutes = [];
        var maxMinutes = 59;
        for (var i = 0; i <= maxMinutes; i++) {
            minutes.push(i);
        }
        return minutes;
    };
    return Minute;
}());
var minuteView = new Minute();
var TimePicker = /** @class */ (function () {
    function TimePicker() {
    }
    TimePicker.prototype.togglePicker = function (component) {
        component.showPicker = !component.showPicker;
    };
    TimePicker.prototype.getTime = function (component) {
        return getDisplayValue(component.hour) + ':' + getDisplayValue(component.minute);
    };
    TimePicker.prototype.renderDropdown = function (component) {
        var _this = this;
        return (h("div", { class: 'sm-time-picker-dropdown', onClick: function () { return _this.togglePicker(component); } }, h("span", null, component.label || this.getTime(component)), h("div", { class: "down-triangle" })));
    };
    TimePicker.prototype.renderPicker = function (component) {
        var showPicker = component.showPicker;
        var currentView;
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
        return (h("div", { class: 'sm-time-picker-popover' }, h("div", { class: 'sm-time-picker-popover-container' }, currentView)));
    };
    TimePicker.prototype.render = function (component) {
        return ([this.renderDropdown(component), this.renderPicker(component)]);
    };
    return TimePicker;
}());
var timePicker = new TimePicker();
var SmTimePicker = /** @class */ (function () {
    function SmTimePicker(hostRef) {
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
    SmTimePicker.prototype.handleShowPickerChange = function () {
        this.pickerView = PICKER_VIEWS.TIME;
        this.contextHour = this.hour;
        this.contextMinute = this.minute;
    };
    SmTimePicker.prototype.render = function () {
        return (h(Host, { style: { '--theme-color': this.theme } }, h("div", { class: 'sm-time-picker' }, h("div", { class: 'sm-time-picker-container' }, timePicker.render(this)))));
    };
    Object.defineProperty(SmTimePicker, "watchers", {
        get: function () {
            return {
                "showPicker": ["handleShowPickerChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmTimePicker, "style", {
        get: function () { return "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}menu,ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}.down-triangle{border-top:10px solid #444}.down-triangle,.up-triangle{width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;margin-left:10px}.up-triangle{border-bottom:10px solid #444}.left-triangle{width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid var(--theme-color)}.left-triangle:hover{cursor:pointer}.right-triangle{width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:10px solid var(--theme-color)}.right-triangle:hover{cursor:pointer}.sm-button{margin-right:10px;margin-bottom:10px;margin-top:10px;padding:8px;-webkit-box-shadow:none;box-shadow:none;border:none;font-size:14px;background:#fff}.sm-button.primary{color:var(--theme-color)}.sm-button:hover{cursor:pointer}.sm-button.flat{background:var(--theme-color);color:#fff}.time-view-container .picker-body{margin-top:10px}.time-view-container .picker-body .row{display:-ms-flexbox;display:flex;margin-bottom:20px}.time-view-container .picker-body .row .column{-ms-flex:1;flex:1;text-align:center}.time-view-container .picker-body .row .column .down-triangle,.time-view-container .picker-body .row .column .up-triangle{margin:0 auto}.time-view-container .picker-body .row .column .down-triangle:hover,.time-view-container .picker-body .row .column .up-triangle:hover{cursor:pointer}.time-view-container .picker-body .row .column .hour,.time-view-container .picker-body .row .column .minute{font-size:18px;font-weight:200;color:var(--theme-color)}.time-view-container .picker-body .row .column .hour:hover,.time-view-container .picker-body .row .column .minute:hover{cursor:pointer}.time-view-container .picker-footer .ok-button{float:right}.hour-view-container .picker-body .hour-row{display:-ms-flexbox;display:flex}.hour-view-container .picker-body .hour-row .hour-cell{-ms-flex:1;flex:1}.hour-view-container .picker-body .hour-row .hour-cell.selected .hour-number{background:var(--theme-color);color:#fff!important}.hour-view-container .picker-body .hour-row .hour-cell .hour-number{padding:5px;font-size:13px;border-radius:50%;width:18px;height:18px;text-align:center}.hour-view-container .picker-body .hour-row .hour-cell .hour-number:hover{cursor:pointer;background:var(--theme-color);opacity:.4;color:#fff!important}.minute-view-container .picker-body .minute-row{display:-ms-flexbox;display:flex}.minute-view-container .picker-body .minute-row .minute-cell{-ms-flex:1;flex:1}.minute-view-container .picker-body .minute-row .minute-cell.selected .minute-number{background:var(--theme-color);color:#fff!important}.minute-view-container .picker-body .minute-row .minute-cell .minute-number{padding:5px;font-size:13px;border-radius:50%;width:18px;height:18px;text-align:center}.minute-view-container .picker-body .minute-row .minute-cell .minute-number:hover{cursor:pointer;background:var(--theme-color);opacity:.4;color:#fff!important}:host{--theme-color:teal}.sm-time-picker{min-width:100px;border-bottom:1px solid #aaa;position:relative;font-family:Open Sans,sans-serif}.sm-time-picker .today-button{float:right}.sm-time-picker .sm-time-picker-container .sm-time-picker-dropdown{padding:8px;text-align:center;font-weight:300}.sm-time-picker .sm-time-picker-container .sm-time-picker-dropdown .down-triangle{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #000;float:right;margin-top:5px}.sm-time-picker .sm-time-picker-container .sm-time-picker-dropdown:hover{cursor:pointer}.sm-time-picker .sm-time-picker-container .sm-time-picker-popover{position:absolute;top:38px;left:-1px;width:200px;-webkit-box-shadow:0 0 5px #ccc;box-shadow:0 0 5px #ccc;height:auto;border:1px solid #ccc;background:#fff;z-index:9}.sm-time-picker .sm-time-picker-container .sm-time-picker-popover .sm-time-picker-popover-container{padding:8px}"; },
        enumerable: true,
        configurable: true
    });
    return SmTimePicker;
}());
export { SmTimePicker as sm_time_picker };
