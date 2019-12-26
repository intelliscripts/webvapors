import { h, Host } from "@stencil/core";
import moment from 'moment';
import calendar from './calendar/Calendar';
import { EVENTS, INTERNAL_FORMAT, VIEWS, WEEK_DAYS } from "./calendar/constants";
import eventStore from "./calendar/utils/events/EventStore";
export class SmCalendar {
    constructor() {
        /**
         * Theme
         */
        this.theme = 'lightseagreen'; //lightseagreen//#00acc1//teal
        /**
         * contextDate
         */
        this.contextDate = moment().format(INTERNAL_FORMAT.DATE);
        /**
         * availableViews
         */
        this.availableViews = [VIEWS.day, VIEWS.week, VIEWS.month];
        /**
         * view
         */
        this.view = VIEWS.week;
        /**
         * timezone
         */
        this.timezone = 'GMT';
        /**
         * weekStartDay
         */
        this.weekStartDay = 'sun';
        /**
         * events
         */
        this.events = [];
        /**
         * showContextPanel
         */
        this.showContextPanel = false;
        /**
         * state variables
         */
        this.contextMoment = moment(this.contextDate, INTERNAL_FORMAT.DATE, this.timezone);
        this.eventStore = eventStore;
    }
    /**
     * life cycle methods
     */
    componentWillLoad() {
        this.eventStore.parseEvents(this.events, this.timezone);
        this.updateView();
    }
    /**
     * watchers
     */
    handleContextDateChange() {
        this.contextMoment = moment(this.contextDate, INTERNAL_FORMAT.DATE, this.timezone);
        this.updateView();
    }
    handleViewChange() {
        this.updateView();
    }
    handleEventsChange() {
        this.eventStore.parseEvents(this.events, this.timezone);
    }
    /**
     *
     * Listners
     */
    handleClick(mouseEvent) {
        const path = mouseEvent.composedPath ? mouseEvent.composedPath() : mouseEvent.path;
        let clickedInsideDatePicker = false;
        for (let i = 0; i < path.length; i++) {
            if (path[i].classList && path[i].classList.contains('sm-date-picker')) {
                clickedInsideDatePicker = true;
                break;
            }
        }
        if (!clickedInsideDatePicker) {
            const datePickers = this.ref.shadowRoot.querySelectorAll('sm-date-picker');
            datePickers.forEach((datePicker) => {
                datePicker.showPicker = false;
            });
        }
    }
    /**
     * functions
     */
    updateView() {
        const viewRange = calendar.getViewRenderer(this).calculateViewRange(this.contextMoment, WEEK_DAYS[this.weekStartDay]);
        this.startMoment = viewRange.startMoment;
        this.endMoment = viewRange.endMoment;
        this.viewChange.emit({
            view: this.view,
            start: this.startMoment.format(INTERNAL_FORMAT.DATE_TIME),
            end: this.endMoment.format(INTERNAL_FORMAT.DATE_TIME)
        });
    }
    /**
     * main renderer
     */
    render() {
        const componentHeight = this.ref.style.height + '' || 'calc(100vh - 10px)';
        return (h(Host, { style: { '--theme-color': this.theme, '--component-height': componentHeight }, onClick: () => { } },
            h("div", { class: 'sm-calendar' }, calendar.render(this))));
    }
    static get is() { return "sm-calendar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./styles/sm-calendar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["styles/sm-calendar.css"]
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
            "defaultValue": "'lightseagreen'"
        },
        "contextDate": {
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
                "text": "contextDate"
            },
            "attribute": "context-date",
            "reflect": true,
            "defaultValue": "moment().format(INTERNAL_FORMAT.DATE)"
        },
        "availableViews": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "Array<string>",
                "resolved": "string[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "availableViews"
            },
            "defaultValue": "[VIEWS.day, VIEWS.week, VIEWS.month]"
        },
        "view": {
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
                "text": "view"
            },
            "attribute": "view",
            "reflect": true,
            "defaultValue": "VIEWS.week"
        },
        "timezone": {
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
                "text": "timezone"
            },
            "attribute": "timezone",
            "reflect": true,
            "defaultValue": "'GMT'"
        },
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
        "events": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "Array<object>",
                "resolved": "object[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "events"
            },
            "defaultValue": "[]"
        },
        "showContextPanel": {
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
                "text": "showContextPanel"
            },
            "attribute": "show-context-panel",
            "reflect": true,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "contextMoment": {},
        "startMoment": {},
        "endMoment": {},
        "eventStore": {},
        "selectedEvent": {}
    }; }
    static get events() { return [{
            "method": "eventClick",
            "name": "eventClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Events"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "cellClick",
            "name": "cellClick",
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
        }, {
            "method": "viewChange",
            "name": "viewChange",
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
        }, {
            "method": "eventUpdate",
            "name": "eventUpdate",
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
    static get elementRef() { return "ref"; }
    static get watchers() { return [{
            "propName": "contextDate",
            "methodName": "handleContextDateChange"
        }, {
            "propName": "view",
            "methodName": "handleViewChange"
        }, {
            "propName": "events",
            "methodName": "handleEventsChange"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClick",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
