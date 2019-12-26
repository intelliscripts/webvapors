import { h } from "@stencil/core";
import { INTERNAL_FORMAT, VIEWS } from "../../constants";
import moment from 'moment-timezone';
import { View } from "../view/View";
import { getBestFitPosition, getOverlaps } from './column-utils';
import templateRenderer from './ColumnTemplateRenderer';
export class Column extends View {
    constructor() {
        super();
        this.numberOfCols = 1;
        this.leftScaleWidth = 100;
        this.timeStepDuration = 60; //minutes
        this.timeStepHeight = 40;
        this.timeStepFormat = 'HH:mm';
        this.viewHeaderHeight = 50;
        this.scaleSizeInSecs = 24 * 60 * 60;
        this.templateRenderer = templateRenderer;
    }
    next(component) {
        component.contextDate = component.contextMoment.clone().add(this.numberOfCols, 'day').format(INTERNAL_FORMAT.DATE);
    }
    prev(component) {
        component.contextDate = component.contextMoment.clone().add(0 - this.numberOfCols, 'day').format(INTERNAL_FORMAT.DATE);
    }
    calculateViewRange(contextMoment, _weekStartDay) {
        return {
            startMoment: contextMoment.clone().startOf('day'),
            endMoment: contextMoment.clone().endOf('day')
        };
    }
    renderView(component) {
        component.stepMoments = this.getSteps();
        const cls = ['view-wrapper'];
        return (h("div", { class: cls.join(' '), style: { '--left-scale-width': this.leftScaleWidth + 'px', '--time-step-height': this.timeStepHeight + 'px', '--view-header-height': this.viewHeaderHeight + 'px' } },
            this.renderViewHeader(component),
            this.renderViewBody(component)));
    }
    renderViewBody(component) {
        const cls = ['view-body'];
        return (h("div", { class: cls.join(' ') },
            h("div", { class: 'view-body-relative' },
                this.renderLeftScale(component),
                this.renderDrawingArea(component))));
    }
    renderDrawingArea(component) {
        return (h("div", { class: 'drawing-area-container' },
            h("div", { class: 'drawing-area-container-relative' },
                this.renderGrid(component),
                this.renderEvents(component))));
    }
    renderEvents(component) {
        const events = [];
        this.getEvents(component).forEach((event) => {
            events.push(this.getEvent(component, event));
        });
        return (h("div", { class: 'events-wrapper' }, events));
    }
    getEvents(component) {
        const events = [];
        const MAX_EVENTS_OVERLAP = Math.trunc(200 / this.numberOfCols);
        const eventsColumnMap = this.getEventsColumnMap(component, component.viewRange.events);
        for (let column in eventsColumnMap) {
            const columnEvents = eventsColumnMap[column];
            const overlaps = getOverlaps(columnEvents, null, component.timezone);
            for (const o in overlaps) {
                const overlapEvents = overlaps[o];
                if (!overlapEvents || overlapEvents.length === 0)
                    continue;
                let bestFit = getBestFitPosition(overlapEvents, true);
                if (bestFit.divisor > MAX_EVENTS_OVERLAP) {
                    bestFit.divisor = MAX_EVENTS_OVERLAP;
                    bestFit.events = bestFit.events.filter(function (event) {
                        return event.startPosition < MAX_EVENTS_OVERLAP && event.endPosition <= MAX_EVENTS_OVERLAP;
                    });
                }
                events.push(...this.processStyleAttributes(component, bestFit, column));
            }
        }
        return events;
    }
    getEvent(component, event) {
        const eventStyles = Object.assign(Object.assign({}, event.style), { background: event.background, color: event.text_color, ['border-color']: event.borderColor });
        return (h("div", { class: 'event', style: Object.assign({}, eventStyles), onClick: () => {
                component.eventClick.emit({
                    event: event.rawEvent,
                });
                //component.selectedEvent = event;
            } }, this.templateRenderer.eventContainer(event)));
    }
    processStyleAttributes(_component, bestFit, column) {
        let events = bestFit.events;
        const { numberOfCols } = this;
        const layout = this.getPaddings();
        let totalWidth = (100 / numberOfCols) - layout.startPadding - layout.endPadding;
        let origStart = (100 / numberOfCols) * column + layout.startPadding;
        let eventWidth = (totalWidth / bestFit.divisor);
        for (let i = 0; i < events.length; i++) {
            let startSecs = events[i].startSec;
            let endSecs = events[i].endSec;
            const eventTop = startSecs / this.scaleSizeInSecs * 100;
            let eventHeight = (endSecs - startSecs) / this.scaleSizeInSecs * 100;
            const totalPosition = eventTop + eventHeight;
            if (totalPosition > 100) {
                eventHeight = 100 - eventTop;
            }
            events[i].style = {
                width: (eventWidth > layout.spacing ? (eventWidth * (events[i].endPosition - events[i].startPosition + 1) - layout.spacing) : eventWidth) + '%',
                left: (origStart + eventWidth * events[i].startPosition) + '%',
                top: eventTop + '%',
                height: eventHeight + '%',
            };
        }
        return events;
    }
    getPaddings() {
        /** All values are in % */
        return {
            startPadding: 0.2,
            endPadding: 1,
            spacing: 0.2,
        };
    }
    getEventsColumnMap(component, events) {
        const eventsColumnMap = {};
        events.forEach((event) => {
            const key = event.startMoment.diff(component.startMoment, 'days');
            if (!eventsColumnMap[key]) {
                eventsColumnMap[key] = [];
            }
            eventsColumnMap[key].push(event);
        });
        return eventsColumnMap;
    }
    processEventsInViewRange(component, events) {
        let processedEvents;
        this.chopEvents(component, events);
        processedEvents = this.chunkEvents(component, events);
        return processedEvents;
    }
    chunkEvents(_component, events) {
        const chunkEvents = [];
        events.forEach((event) => {
            if (event.isMultiDay) {
                const startMoment = event.startMoment.clone();
                while (!startMoment.isSame(event.endMoment, 'day')) {
                    const chunkEvent = event.clone();
                    chunkEvent.startMoment = startMoment.clone();
                    chunkEvent.endMoment = startMoment.clone().endOf('day');
                    chunkEvents.push(chunkEvent);
                    startMoment.endOf('day').add(1, 'second');
                }
                const chunkEvent = event.clone();
                chunkEvent.startMoment = startMoment.clone();
                chunkEvent.endMoment = event.endMoment.clone();
                chunkEvents.push(chunkEvent);
            }
            else {
                const chunkEvent = event.clone();
                chunkEvent.startMoment = event.startMoment.clone();
                chunkEvent.endMoment = event.endMoment.clone();
                chunkEvents.push(chunkEvent);
            }
        });
        return chunkEvents;
    }
    renderGrid(component) {
        return (h("div", { class: 'grid-wrapper' }, this.renderGridRows(component)));
    }
    renderGridRows(component) {
        const gridDates = component.viewRange.dates;
        const stepMoments = component.stepMoments;
        const rows = [];
        stepMoments.forEach((_stepMoment, index) => {
            const cols = [];
            gridDates.forEach((viewDate) => {
                cols.push(h("div", { class: 'item', style: { height: this.timeStepHeight + 'px' }, onClick: () => {
                        const fromMoment = viewDate.clone().add(this.timeStepDuration * index, 'minutes');
                        const from = fromMoment.format('YYYY-MM-DD HH:mm:ss');
                        const toMoment = viewDate.clone().add(this.timeStepDuration * index, 'minutes').add(this.timeStepDuration, 'minutes');
                        const to = toMoment.format('YYYY-MM-DD HH:mm:ss');
                        component.cellClick.emit({
                            view: component.view,
                            from,
                            to
                        });
                    } }));
            });
            rows.push(h("div", { class: 'row' }, cols));
        });
        return rows;
    }
    getSteps() {
        const totalSteps = (24 * 60) / this.timeStepDuration;
        const today = moment().startOf('day');
        const stepMoments = [];
        for (let i = 0; i < totalSteps; i++) {
            stepMoments.push(today.clone());
            today.add(this.timeStepDuration, 'minutes');
        }
        return stepMoments;
    }
    renderLeftScale(component) {
        const steps = [];
        const stepMoments = component.stepMoments;
        stepMoments.forEach((stepMoment, index) => {
            steps.push(h("div", { class: 'step', style: { height: this.timeStepHeight + 1 + 'px' } },
                h("div", { class: 'step-time' }, index === 0 ? '' : stepMoment.format(this.timeStepFormat))));
        });
        return (h("div", { class: 'left-scale' },
            h("div", { class: 'step-container' }, steps)));
    }
    renderViewHeader(component) {
        const gridHeaderDates = component.viewRange.dates;
        const cls = ['view-header'];
        const { contextMoment } = component;
        const dayNames = [];
        gridHeaderDates.forEach((date) => {
            const cls = ['item'];
            if (date.isSame(moment(), 'day')) {
                cls.push('today');
            }
            if (date.isSame(contextMoment, 'day')) {
                cls.push('context-date');
            }
            dayNames.push(h("div", { class: cls.join(' ') },
                h("div", { class: 'view-header-column' },
                    h("div", { class: 'day-date', onClick: () => {
                            component.contextDate = date.format(INTERNAL_FORMAT.DATE);
                            component.view = VIEWS.day;
                        } }, date.format('DD')),
                    h("div", { class: 'day-name' }, date.format('dddd')))));
        });
        return (h("div", { class: cls.join(' ') },
            h("div", { class: 'row' },
                h("div", { class: 'empty-left-scale' }),
                dayNames)));
    }
}
export default new Column();
