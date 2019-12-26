import { h } from "@stencil/core";
import { View } from "../view/View";
import { calculateDateRange } from './month-utils';
import moment from "moment-timezone";
import { INTERNAL_FORMAT, VIEWS } from "../../constants";
import templateRenderer from "../month/MonthTemplateRenderer";
import { fade } from "../../utils/common/color-utils";
export class Month extends View {
    constructor() {
        super();
        this.viewHeaderHeight = 50;
        this.eventHeight = 20;
        this.eventLeftMargin = 5;
        this.eventTopMargin = 5;
        this.gridCellHeaderHeight = 35;
        this.templateRenderer = templateRenderer;
    }
    next(component) {
        component.contextDate = component.contextMoment.clone().add(1, 'month').format(INTERNAL_FORMAT.DATE);
    }
    prev(component) {
        component.contextDate = component.contextMoment.clone().add(-1, 'month').format(INTERNAL_FORMAT.DATE);
    }
    renderView(component) {
        const result = this.getRowHeights(component);
        component.maxEventsInRowMap = result.maxEventsInRowMap;
        const cls = ['view-wrapper'];
        return (h("div", { class: cls.join(' '), style: { '--view-header-height': this.viewHeaderHeight + 'px' } },
            this.renderViewHeader(component),
            this.renderViewBody(component)));
    }
    renderViewBody(component) {
        const cls = ['view-body'];
        return (h("div", { class: cls.join(' ') },
            h("div", { class: 'view-body-relative' }, this.renderDrawingArea(component))));
    }
    renderDrawingArea(component) {
        return (h("div", { class: 'drawing-area-container' },
            h("div", { class: 'drawing-area-container-relative' },
                this.renderGrid(component),
                this.renderEvents(component))));
    }
    renderEvents(component) {
        const events = [];
        this.getEvents(component).renderedEvents.forEach((event) => {
            events.push(this.getEvent(component, event));
        });
        return (h("div", { class: 'events-wrapper' }, events));
    }
    getRowHeights(component) {
        const events = [...component.viewRange.events];
        const maxEventsInRowMap = {};
        const gridHeaderDates = [...component.viewRange.dates].slice(0, 7);
        const days = [];
        gridHeaderDates.forEach((date) => {
            days.push(date.day());
        });
        const gridDates = [...component.viewRange.dates];
        const rowMS = [];
        const rowCount = gridDates.length / 7;
        for (let i = 0; i < rowCount; i++) {
            const rowDates = gridDates.splice(0, 7);
            rowMS.push({
                startMS: rowDates[0].valueOf(),
                endMS: rowDates[6].clone().endOf('day').valueOf()
            });
        }
        rowMS.forEach((row, index) => {
            const cellEventsMap = {};
            if (!maxEventsInRowMap[index]) {
                maxEventsInRowMap[index] = {
                    countInThisRow: 0,
                };
                maxEventsInRowMap[index].height = this.getRowHeight(component, maxEventsInRowMap, index);
            }
            events.forEach((event) => {
                const eventStartMS = event.startMoment.valueOf();
                const eventStartCellIndex = days.indexOf(event.startMoment.day());
                const eventEndCellIndex = days.indexOf(event.endMoment.day());
                if (eventStartMS > row.startMS && eventStartMS < row.endMS) {
                    let start = eventStartCellIndex;
                    while (start <= eventEndCellIndex) {
                        const cellKey = index + '_' + start;
                        if (!cellEventsMap[cellKey]) {
                            cellEventsMap[cellKey] = {
                                count: 1,
                            };
                        }
                        else {
                            cellEventsMap[cellKey].count = cellEventsMap[cellKey].count + 1;
                        }
                        if (cellEventsMap[cellKey].count > maxEventsInRowMap[index].countInThisRow) {
                            maxEventsInRowMap[index].countInThisRow = cellEventsMap[cellKey].count;
                            maxEventsInRowMap[index].height = this.getRowHeight(component, maxEventsInRowMap, index);
                        }
                        start++;
                    }
                }
            });
        });
        return {
            maxEventsInRowMap
        };
    }
    getEvents(component) {
        const events = [...component.viewRange.events];
        const renderedEvents = [];
        const gridHeaderDates = [...component.viewRange.dates].slice(0, 7);
        const days = [];
        gridHeaderDates.forEach((date) => {
            days.push(date.day());
        });
        const gridDates = [...component.viewRange.dates];
        const rowMS = [];
        const rowCount = gridDates.length / 7;
        for (let i = 0; i < rowCount; i++) {
            const rowDates = gridDates.splice(0, 7);
            rowMS.push({
                startMS: rowDates[0].valueOf(),
                endMS: rowDates[6].clone().endOf('day').valueOf()
            });
        }
        const cellEventsMap = {};
        console.log(events);
        events.forEach((event) => {
            const eventStartMS = event.startMoment.valueOf();
            const style = {
                height: this.eventHeight + 'px',
            };
            const eventCellCount = event.endMoment.diff(event.startMoment, 'days');
            style["width"] = 'calc(' + (((eventCellCount + 1) / 7) * 100) + '%' + ' - ' + (2 * this.eventLeftMargin) + 'px' + ')';
            const eventStartCellIndex = days.indexOf(event.startMoment.day());
            const leftPosition = 'calc(' + (((eventStartCellIndex) / 7) * 100) + '%' + ' + ' + this.eventLeftMargin + 'px' + ')';
            style["left"] = leftPosition;
            const eventEndCellIndex = days.indexOf(event.endMoment.day());
            rowMS.forEach((row, index) => {
                if (eventStartMS >= row.startMS && eventStartMS <= row.endMS) {
                    let start = eventStartCellIndex;
                    while (start <= eventEndCellIndex) {
                        const cellKey = index + '_' + start;
                        if (!cellEventsMap[cellKey]) {
                            cellEventsMap[cellKey] = {
                                count: 0,
                                moreEventsPresent: false
                            };
                        }
                        else {
                            cellEventsMap[cellKey].count = cellEventsMap[cellKey].count + 1;
                        }
                        start++;
                    }
                    const cellKey = index + '_' + eventStartCellIndex;
                    let heightTillPreviousRow = 0;
                    for (let j = 0; j < index; j++) {
                        heightTillPreviousRow = heightTillPreviousRow + component.maxEventsInRowMap[j].height;
                    }
                    const topPosition = 'calc(' + heightTillPreviousRow + 'px' + ' + ' + (this.gridCellHeaderHeight + ((cellEventsMap[cellKey].count) * (this.eventHeight + this.eventTopMargin))) + 'px' + ')';
                    style["top"] = topPosition;
                    event.style = style;
                    renderedEvents.push(event);
                }
            });
        });
        return {
            renderedEvents,
        };
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
    renderGrid(component) {
        return (h("div", { class: 'grid-wrapper' }, this.renderGridRows(component)));
    }
    renderGridRows(component) {
        const gridDates = [...component.viewRange.dates];
        const rows = [];
        const rowCount = gridDates.length / 7;
        for (let i = 0; i < rowCount; i++) {
            rows.push(this.getRow(component, gridDates.splice(0, 7), rowCount, i));
        }
        return rows;
    }
    getRowHeight(_component, maxEventsInRowMap, rowIndex) {
        let countInThisRow = 4;
        if (maxEventsInRowMap[rowIndex] && maxEventsInRowMap[rowIndex].countInThisRow > 4) {
            countInThisRow = maxEventsInRowMap[rowIndex].countInThisRow;
        }
        const rowHeight = this.gridCellHeaderHeight + countInThisRow * (this.eventHeight + this.eventTopMargin);
        return rowHeight;
    }
    getRow(component, rowDates, _rowcount, rowIndex) {
        const cols = [];
        const rowHeight = this.getRowHeight(component, component.maxEventsInRowMap, rowIndex) + 'px';
        //const minRowHeight = 'calc((var(--component-height) - var(--header-height) - var(--view-header-height) - 10px) / ' + rowcount + ')';
        rowDates.forEach((rowDate) => {
            cols.push(this.getCellWrapper(component, rowDate, rowHeight));
        });
        return (h("div", { class: 'row', style: { 'height': rowHeight } }, cols));
    }
    getCellWrapper(component, date, rowHeight) {
        const cls = ['item'];
        const { contextMoment } = component;
        const cellStyles = {
            background: ''
        };
        if (date.isSame(moment(), 'day')) {
            cls.push('today');
            cellStyles.background = fade(component.theme, 0.9);
        }
        if (date.isSame(contextMoment, 'day')) {
            cls.push('context-date');
        }
        if (!date.isSame(contextMoment, 'month')) {
            cls.push('grey-out');
        }
        return (h("div", { class: cls.join(' '), style: cellStyles },
            h("div", { class: 'cell-wrapper', style: { height: rowHeight }, onClick: () => {
                    component.cellClick.emit({
                        view: component.view,
                        from: date.format('YYYY-MM-DD HH:mm:ss'),
                        to: date.clone().add(1, 'day').add(-1, 'second').format('YYYY-MM-DD HH:mm:ss')
                    });
                } },
                h("div", { class: 'cell-header', style: { height: this.gridCellHeaderHeight + 'px' } },
                    h("div", { class: 'cell-date', onClick: (ev) => {
                            component.contextDate = date.format(INTERNAL_FORMAT.DATE);
                            component.view = VIEWS.day;
                            ev.stopPropagation();
                            ev.preventDefault();
                        } }, date.format('DD'))))));
    }
    renderViewHeader(component) {
        const gridHeaderDates = [...component.viewRange.dates].slice(0, 7);
        const cls = ['view-header'];
        const dayNames = [];
        gridHeaderDates.forEach((date) => {
            const headerColumnCls = ['view-header-column'];
            dayNames.push(h("div", { class: 'item' },
                h("div", { class: headerColumnCls.join(' ') },
                    h("div", { class: 'day-name' }, date.format('dddd')))));
        });
        return (h("div", { class: cls.join(' ') },
            h("div", { class: 'row' }, dayNames)));
    }
    calculateViewRange(contextMoment, weekStartDay) {
        return calculateDateRange(contextMoment, weekStartDay);
    }
    getHeaderText(component) {
        return (h("div", null, component.contextMoment.format('MMMM YYYY')));
    }
    getDatePickerLabel(component) {
        return component.contextMoment.format('MMM YYYY');
    }
    processEventsInViewRange(component, events) {
        let processedEvents;
        this.chopEvents(component, events);
        processedEvents = this.chunkEvents(component, events);
        return processedEvents;
    }
    chunkEvents(component, events) {
        const chunkEvents = [];
        const gridHeaderDates = [...component.viewRange.dates].slice(0, 7);
        const days = [];
        gridHeaderDates.forEach((date) => {
            days.push(date.day());
        });
        events.forEach((event) => {
            if (event.isMultiDay) {
                const eventEndIndex = days.indexOf(event.startMoment.day());
                const currentRowEndMoment = event.startMoment.clone().add(6 - eventEndIndex, 'days').endOf('day');
                if (currentRowEndMoment.isSameOrAfter(event.endMoment)) {
                    const chunkEvent = event.clone();
                    chunkEvent.startMoment = event.startMoment.clone();
                    chunkEvent.endMoment = event.endMoment.clone();
                    chunkEvents.push(chunkEvent);
                }
                else {
                    let startMoment = event.startMoment.clone();
                    while (currentRowEndMoment.isBefore(event.endMoment)) {
                        const chunkEvent = event.clone();
                        chunkEvent.startMoment = startMoment.clone();
                        chunkEvent.endMoment = currentRowEndMoment.clone();
                        chunkEvents.push(chunkEvent);
                        startMoment = chunkEvent.endMoment.clone().add(1, 'day').startOf('day');
                        currentRowEndMoment.add(7, 'days');
                    }
                    const chunkEvent = event.clone();
                    chunkEvent.startMoment = startMoment.clone();
                    chunkEvent.endMoment = event.endMoment.clone();
                    chunkEvents.push(chunkEvent);
                }
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
}
export default new Month();
