import { h, Host } from "@stencil/core";
import moment from 'moment-timezone';
import { PICKER_VIEWS, INTERNAL_FORMAT } from './datepicker/constants';
import datePicker from './datepicker/DatePicker';
export class SmDatePicker {
    constructor() {
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
        return (h(Host, { style: { '--theme-color': this.theme } },
            h("div", { class: 'sm-date-picker' },
                h("div", { class: 'sm-date-picker-container' }, datePicker.render(this)))));
    }
    static get is() { return "sm-date-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./styles/sm-date-picker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["styles/sm-date-picker.css"]
    }; }
    static get properties() { return {
        "weekStartDay": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "weekStartDay"
            },
            "attribute": "week-start-day",
            "reflect": true,
            "defaultValue": "'sun'"
        },
        "date": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "date"
            },
            "attribute": "date",
            "reflect": true,
            "defaultValue": "moment().format(INTERNAL_FORMAT.DATE)"
        },
        "showPicker": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "showPicker"
            },
            "attribute": "show-picker",
            "reflect": true,
            "defaultValue": "false"
        },
        "theme": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Theme"
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "'teal'"
        },
        "label": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "label"
            },
            "attribute": "label",
            "reflect": true
        }
    }; }
    static get states() { return {
        "pickerView": {},
        "contextMoment": {},
        "navMoment": {}
    }; }
    static get events() { return [{
            "method": "dateSelected",
            "name": "dateSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "date",
            "methodName": "handleDateChange"
        }, {
            "propName": "contextMoment",
            "methodName": "handleContextMomentChange"
        }, {
            "propName": "showPicker",
            "methodName": "handleShowPickerChange"
        }]; }
}
