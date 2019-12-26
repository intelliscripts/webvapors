import { h, Host } from "@stencil/core";
import timePicker from './timepicker/TimePicker';
import { PICKER_VIEWS } from "./timepicker/constants";
export class SmTimePicker {
    constructor() {
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
    }
    handleShowPickerChange() {
        this.pickerView = PICKER_VIEWS.TIME;
        this.contextHour = this.hour;
        this.contextMinute = this.minute;
    }
    render() {
        return (h(Host, { style: { '--theme-color': this.theme } },
            h("div", { class: 'sm-time-picker' },
                h("div", { class: 'sm-time-picker-container' }, timePicker.render(this)))));
    }
    static get is() { return "sm-time-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./styles/sm-time-picker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["styles/sm-time-picker.css"]
    }; }
    static get properties() { return {
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
        "hour": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "hour"
            },
            "attribute": "hour",
            "reflect": true,
            "defaultValue": "0"
        },
        "minute": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "minute"
            },
            "attribute": "minute",
            "reflect": true,
            "defaultValue": "0"
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
        "isTwelveHourFormat": {
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
                "text": "isTwelveHourFormat"
            },
            "attribute": "is-twelve-hour-format",
            "reflect": true,
            "defaultValue": "false"
        },
        "meridian": {
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
                "text": "meridian"
            },
            "attribute": "meridian",
            "reflect": true,
            "defaultValue": "'am'"
        }
    }; }
    static get states() { return {
        "pickerView": {},
        "contextHour": {},
        "contextMinute": {}
    }; }
    static get events() { return [{
            "method": "timeSelected",
            "name": "timeSelected",
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
            "propName": "showPicker",
            "methodName": "handleShowPickerChange"
        }]; }
}
