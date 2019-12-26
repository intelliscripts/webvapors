var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { h, r as registerInstance, c as createEvent, H as Host, g as getElement } from './core-8c3eb49f.js';
import { m as moment, a as moment$1, c as createCommonjsModule } from './index-fbd28b63.js';
var WEEK_DAYS = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
};
var VIEWS = {
    day: 'day',
    week: 'week',
    month: 'month'
};
var VIEW_LABELS = {
    day: 'Day',
    week: 'Week',
    month: 'Month'
};
var INTERNAL_FORMAT = {
    DATE: 'YYYY-MM-DD',
    TIME: 'HH:mm:ss',
    DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
    DISPLAY_TIME: 'HH:mm'
};
var INTERNAL_DATE_TIME_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
var Header = /** @class */ (function () {
    function Header() {
    }
    Header.prototype.render = function (component) {
        return (h("div", { class: 'header-container' }, h("div", { class: 'header-section' }, this.renderViewNavigation(component)), h("div", { class: 'header-section' }, h("div", { class: 'context-date-label' }, component.viewRenderer.getHeaderText(component))), h("div", { class: 'header-section' }, this.renderViewButton(component))));
    };
    Header.prototype.renderViewRange = function (component) {
        return (h("div", { class: 'view-range' }, component.viewRenderer.getHeaderText(component)));
    };
    Header.prototype.renderViewNavigation = function (component) {
        return (h("div", { class: 'view-navigation' }, h("div", { class: 'nav-item' }, h("div", { class: 'btn-list' }, h("div", { class: 'btn-list-item' }, h("div", { class: "left-triangle", onClick: function () {
                component.viewRenderer.prev(component);
            } })), h("div", { class: 'btn-list-item' }, h("div", { class: 'today-button', onClick: function () {
                component.contextDate = moment().startOf('day').format(INTERNAL_FORMAT.DATE);
            } }, "Today")), h("div", { class: 'btn-list-item' }, h("div", { class: "right-triangle", onClick: function () {
                component.viewRenderer.next(component);
            } })))), h("div", { class: 'nav-item' }, h("div", { class: 'date-picker' }, h("sm-date-picker", { onDateSelected: function (payload) {
                if (component.contextMoment.format(INTERNAL_FORMAT.DATE) !== payload.detail) {
                    component.contextDate = payload.detail;
                }
            }, label: component.viewRenderer.getDatePickerLabel(component), theme: component.theme, date: component.contextMoment.format(INTERNAL_FORMAT.DATE), "week-start-day": component.weekStartDay })))));
    };
    Header.prototype.renderViewButton = function (component) {
        var availableViews = component.availableViews;
        var buttons = [];
        availableViews.forEach(function (view) {
            var cls = ['view-name'];
            if (view === component.view) {
                cls.push('active');
            }
            buttons.push(h("div", { class: cls.join(' '), onClick: function () {
                    component.view = view;
                } }, VIEW_LABELS[view]));
        });
        return (h("div", { class: 'view-list' }, buttons));
    };
    return Header;
}());
var header = new Header();
var TemplateRenderer = /** @class */ (function () {
    function TemplateRenderer() {
    }
    TemplateRenderer.prototype.eventContainer = function (event) {
        return (h("div", { class: "event-container" }, h("div", { class: "event-title" }, event.title)));
    };
    return TemplateRenderer;
}());
var templateRenderer = new TemplateRenderer();
var View = /** @class */ (function () {
    function View() {
        this.templateRenderer = templateRenderer;
    }
    View.prototype.render = function (component) {
        var cls = ['view-container', component.view];
        return (h("div", { class: cls.join(' ') }, this.renderView(component)));
    };
    View.prototype.getDatesInViewRange = function (startDateMoment, endDateMoment) {
        var dates = [];
        var startDateMomentClone = startDateMoment.clone();
        while (startDateMomentClone.valueOf() < endDateMoment.valueOf()) {
            dates.push(startDateMomentClone.clone());
            startDateMomentClone.add(1, 'days');
        }
        return dates;
    };
    View.prototype.getEventsInViewRange = function (component) {
        var events = component.eventStore.getEventsBetween(component.startMoment, component.endMoment);
        return this.processEventsInViewRange(component, events);
    };
    View.prototype.processEventsInViewRange = function (_component, events) {
        return events;
    };
    View.prototype.chopEvents = function (component, events) {
        events.forEach(function (event) {
            if (event.startMoment.isBefore(component.startMoment)) {
                event.startMoment = component.startMoment.clone();
            }
            if (event.endMoment.isAfter(component.endMoment)) {
                event.endMoment = component.endMoment.clone();
            }
            if (!event.startMoment.isSame(event.endMoment, 'day')) {
                event.isMultiDay = true;
            }
        });
    };
    View.prototype.renderView = function (_component) {
    };
    View.prototype.getHeaderText = function (component) {
        return (h("div", null, component.startMoment.format('DD MMM, YYYY'), " - ", component.endMoment.format('DD MMM, YYYY')));
    };
    View.prototype.getDatePickerLabel = function (component) {
        return component.startMoment.format('DD MMM, YYYY') + ' - ' + component.endMoment.format('DD MMM, YYYY');
    };
    return View;
}());
function getTimeFromStartOfDay(dateTime, units) {
    if (units === void 0) { units = 'seconds'; }
    return dateTime.diff(moment$1(dateTime).startOf('day'), units);
}
function getTimeDiff(date1, date2, units) {
    if (units === void 0) { units = 'seconds'; }
    return Math.abs(date1.diff(date2, units));
}
function getBestFitPosition(events, expandEvents) {
    if (!events || events.length == 0)
        return {};
    var root = new Tree();
    return root._getBestFitPosition(events, expandEvents);
}
function getOverlaps(payload, startMoment) {
    if (!payload)
        return {};
    var nodes = getNodes(payload, startMoment);
    var root = new Tree();
    return root._getOverlaps(nodes);
}
function getNodes(payload, startMoment) {
    return payload.map(function (el) {
        var node = {};
        if (startMoment) {
            node.start = getTimeDiff(startMoment, el.startMoment).startOf('day');
            node.end = getTimeDiff(startMoment, el.endMoment).endOf('day');
        }
        else {
            node.start = getTimeFromStartOfDay(el.startMoment);
            node.end = getTimeFromStartOfDay(el.endMoment);
        }
        node.data = el;
        // Adding start and end time in seconds to event to avoid re-calculation
        el.startSec = node.start;
        el.endSec = node.end;
        return node;
    });
}
var Interval = /** @class */ (function () {
    function Interval(start, end) {
        this.start = start;
        this.end = end;
    }
    return Interval;
}());
var TreeNode = /** @class */ (function () {
    function TreeNode(node) {
        this.interval = new Interval(node.start, node.end);
        this.data = node.data;
        this.max = node.max ? node.max : 0;
        this.left = null;
        this.right = null;
        this.position = node.position ? node.position : 0;
    }
    return TreeNode;
}());
/**
 * Interval tree
 */
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = null;
    }
    Tree.prototype.insert = function (newnode) {
        return this._insert(this.root, newnode);
    };
    Tree.prototype._insert = function (root, newnode) {
        if (!root)
            return new TreeNode(newnode);
        if (newnode.start < root.interval.start)
            root.left = this._insert(root.left, newnode);
        else
            root.right = this._insert(root.right, newnode);
        if (root.max < newnode.end)
            root.max = newnode.end;
        return root;
    };
    Tree.prototype._isOverlapping = function (a, b) {
        if (a.start < b.end && b.start < a.end)
            return true;
        if (a.start == b.start || a.end == b.end)
            return true;
        return false;
    };
    Tree.prototype.overlapSearch = function (interval) {
        return this._overlapSearch(this.root, interval);
    };
    Tree.prototype._overlapSearch = function (node, interval) {
        if (!node)
            return null;
        if (this._isOverlapping(node.interval, interval))
            return node;
        if (node.left && node.left.max >= interval.start)
            return this._overlapSearch(node.left, interval);
        return this._overlapSearch(node.right, interval);
    };
    /**
     * Input: Array of tree nodes
     * Ouput: Object {
     *                  overlaps: [[],[],[]..] // each array contains events having transitive property for overlapping
     *              }
     */
    Tree.prototype._getOverlaps = function (nodes) {
        if (!nodes || nodes.length === 0)
            return {};
        nodes.sort(function (e1, e2) { return (e1.start - e2.start); });
        this.root = this.insert(nodes[0]);
        var overlappingIntervals = [];
        var set = new Set();
        set.add(nodes[0].data);
        for (var i = 1; i < nodes.length; i++) {
            var resNode = this.overlapSearch(new Interval(nodes[i].start, nodes[i].end));
            if (resNode) {
                set.add(nodes[i].data);
                set.add(resNode.data);
            }
            else {
                //push all overlapping intervals so far
                overlappingIntervals.push(__spreadArrays(set));
                //non-overlapping interval found, discard previous tree at this point
                this.root = null;
                set.clear();
                set.add(nodes[i].data);
            }
            this.root = this.insert(nodes[i]);
        }
        //push remaining intervals
        if (set.size > 0)
            overlappingIntervals.push(__spreadArrays(set));
        return overlappingIntervals;
    };
    /**
     * Input: Array of overlapping events
     * Output: Object {
     * 			divisor: <>
     * 			events: [{...event, startPosition: 0, endPosition: 2}, ....]
     * 		}
     * where:
     *        divisor:    <integer> (divide column width by this number to get event width)
     *        position:    <integer> (0 based index to position event in a column and incrementing along x-axis)
     */
    Tree.prototype._getBestFitPosition = function (events, expand) {
        var maxPositionSoFar = 0;
        var result = {};
        result.events = [];
        var nodeMap = []; //index i stores root node of ith position
        //initialize first event as root
        events[0].startPosition = 0;
        this.root = this._insertFit(nodeMap, this.root, new TreeNode({
            data: events[0],
            start: events[0].startSec,
            end: events[0].endSec - 1,
            max: events[0].endSec - 1
        }));
        result.events.push(events[0]);
        for (var i = 1; i < events.length; i++) {
            this._insertFit(nodeMap, this.root, new TreeNode({
                data: events[i],
                start: events[i].startSec,
                end: events[i].endSec - 1,
                max: events[i].endSec - 1
            }));
            result.events.push(events[i]);
            if (maxPositionSoFar < events[i].startPosition)
                maxPositionSoFar = events[i].startPosition;
        }
        result.divisor = maxPositionSoFar + 1;
        if (expand) {
            this.expandPositions(this.root, nodeMap);
        }
        return result;
    };
    Tree.prototype._insertFit = function (nodeMap, root, newnode) {
        if (!root) {
            newnode.data.startPosition = newnode.data.endPosition = newnode.position;
            if (!nodeMap[newnode.position])
                nodeMap[newnode.position] = newnode;
            return newnode;
        }
        if (root.max < newnode.interval.start) {
            root.max = newnode.interval.end;
            newnode.position = root.position;
            root.left = this._insertFit(nodeMap, root.left, newnode);
        }
        else {
            newnode.position = root.position + 1;
            root.right = this._insertFit(nodeMap, root.right, newnode);
        }
        return root;
    };
    Tree.prototype.expandPositions = function (root, nodeMap) {
        if (!root)
            return;
        this._expandPositions(root, nodeMap);
        this.expandPositions(root.left, nodeMap);
        this.expandPositions(root.right, nodeMap);
    };
    /**
     * Find maximum endPosition to the right until which an event can be expanded
     */
    Tree.prototype._expandPositions = function (root, nodeMap) {
        var nextRoot = nodeMap[root.data.startPosition + 1];
        while (nextRoot) {
            if (this._isOverlapping(root.interval, nextRoot.interval))
                break;
            if (!nextRoot.left) {
                root.data.endPosition += 1;
                nextRoot = nodeMap[root.data.endPosition + 1];
            }
            else {
                nextRoot = nextRoot.left;
            }
        }
    };
    return Tree;
}());
var ColumnTemplateRenderer = /** @class */ (function (_super) {
    __extends(ColumnTemplateRenderer, _super);
    function ColumnTemplateRenderer() {
        return _super.call(this) || this;
    }
    ColumnTemplateRenderer.prototype.eventContainer = function (event) {
        var start = event.startMoment.format(INTERNAL_FORMAT.DISPLAY_TIME);
        var end = event.endMoment.format(INTERNAL_FORMAT.DISPLAY_TIME);
        return (h("div", { class: "event-container" }, h("div", { class: "event-title" }, h("span", null, start, " - ", end), h("br", null), event.title), h("div", { class: "event-description" }, event.description)));
    };
    return ColumnTemplateRenderer;
}(TemplateRenderer));
var templateRenderer$1 = new ColumnTemplateRenderer();
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super.call(this) || this;
        _this.numberOfCols = 1;
        _this.leftScaleWidth = 100;
        _this.timeStepDuration = 60; //minutes
        _this.timeStepHeight = 40;
        _this.timeStepFormat = 'HH:mm';
        _this.viewHeaderHeight = 50;
        _this.scaleSizeInSecs = 24 * 60 * 60;
        _this.templateRenderer = templateRenderer$1;
        return _this;
    }
    Column.prototype.next = function (component) {
        component.contextDate = component.contextMoment.clone().add(this.numberOfCols, 'day').format(INTERNAL_FORMAT.DATE);
    };
    Column.prototype.prev = function (component) {
        component.contextDate = component.contextMoment.clone().add(0 - this.numberOfCols, 'day').format(INTERNAL_FORMAT.DATE);
    };
    Column.prototype.calculateViewRange = function (contextMoment, _weekStartDay) {
        return {
            startMoment: contextMoment.clone().startOf('day'),
            endMoment: contextMoment.clone().endOf('day')
        };
    };
    Column.prototype.renderView = function (component) {
        component.stepMoments = this.getSteps();
        var cls = ['view-wrapper'];
        return (h("div", { class: cls.join(' '), style: { '--left-scale-width': this.leftScaleWidth + 'px', '--time-step-height': this.timeStepHeight + 'px', '--view-header-height': this.viewHeaderHeight + 'px' } }, this.renderViewHeader(component), this.renderViewBody(component)));
    };
    Column.prototype.renderViewBody = function (component) {
        var cls = ['view-body'];
        return (h("div", { class: cls.join(' ') }, h("div", { class: 'view-body-relative' }, this.renderLeftScale(component), this.renderDrawingArea(component))));
    };
    Column.prototype.renderDrawingArea = function (component) {
        return (h("div", { class: 'drawing-area-container' }, h("div", { class: 'drawing-area-container-relative' }, this.renderGrid(component), this.renderEvents(component))));
    };
    Column.prototype.renderEvents = function (component) {
        var _this = this;
        var events = [];
        this.getEvents(component).forEach(function (event) {
            events.push(_this.getEvent(component, event));
        });
        return (h("div", { class: 'events-wrapper' }, events));
    };
    Column.prototype.getEvents = function (component) {
        var events = [];
        var MAX_EVENTS_OVERLAP = Math.trunc(200 / this.numberOfCols);
        var eventsColumnMap = this.getEventsColumnMap(component, component.viewRange.events);
        for (var column in eventsColumnMap) {
            var columnEvents = eventsColumnMap[column];
            var overlaps = getOverlaps(columnEvents, null);
            for (var o in overlaps) {
                var overlapEvents = overlaps[o];
                if (!overlapEvents || overlapEvents.length === 0)
                    continue;
                var bestFit = getBestFitPosition(overlapEvents, true);
                if (bestFit.divisor > MAX_EVENTS_OVERLAP) {
                    bestFit.divisor = MAX_EVENTS_OVERLAP;
                    bestFit.events = bestFit.events.filter(function (event) {
                        return event.startPosition < MAX_EVENTS_OVERLAP && event.endPosition <= MAX_EVENTS_OVERLAP;
                    });
                }
                events.push.apply(events, this.processStyleAttributes(component, bestFit, column));
            }
        }
        return events;
    };
    Column.prototype.getEvent = function (component, event) {
        var _a;
        var eventStyles = Object.assign(Object.assign({}, event.style), (_a = { background: event.background, color: event.text_color }, _a['border-color'] = event.borderColor, _a));
        return (h("div", { class: 'event', style: Object.assign({}, eventStyles), onClick: function () {
                component.eventClick.emit({
                    event: event.rawEvent,
                });
                //component.selectedEvent = event;
            } }, this.templateRenderer.eventContainer(event)));
    };
    Column.prototype.processStyleAttributes = function (_component, bestFit, column) {
        var events = bestFit.events;
        var numberOfCols = this.numberOfCols;
        var layout = this.getPaddings();
        var totalWidth = (100 / numberOfCols) - layout.startPadding - layout.endPadding;
        var origStart = (100 / numberOfCols) * column + layout.startPadding;
        var eventWidth = (totalWidth / bestFit.divisor);
        for (var i = 0; i < events.length; i++) {
            var startSecs = events[i].startSec;
            var endSecs = events[i].endSec;
            var eventTop = startSecs / this.scaleSizeInSecs * 100;
            var eventHeight = (endSecs - startSecs) / this.scaleSizeInSecs * 100;
            var totalPosition = eventTop + eventHeight;
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
    };
    Column.prototype.getPaddings = function () {
        /** All values are in % */
        return {
            startPadding: 0.2,
            endPadding: 1,
            spacing: 0.2,
        };
    };
    Column.prototype.getEventsColumnMap = function (component, events) {
        var eventsColumnMap = {};
        events.forEach(function (event) {
            var key = event.startMoment.diff(component.startMoment, 'days');
            if (!eventsColumnMap[key]) {
                eventsColumnMap[key] = [];
            }
            eventsColumnMap[key].push(event);
        });
        return eventsColumnMap;
    };
    Column.prototype.processEventsInViewRange = function (component, events) {
        var processedEvents;
        this.chopEvents(component, events);
        processedEvents = this.chunkEvents(component, events);
        return processedEvents;
    };
    Column.prototype.chunkEvents = function (_component, events) {
        var chunkEvents = [];
        events.forEach(function (event) {
            if (event.isMultiDay) {
                var startMoment = event.startMoment.clone();
                while (!startMoment.isSame(event.endMoment, 'day')) {
                    var chunkEvent_1 = event.clone();
                    chunkEvent_1.startMoment = startMoment.clone();
                    chunkEvent_1.endMoment = startMoment.clone().endOf('day');
                    chunkEvents.push(chunkEvent_1);
                    startMoment.endOf('day').add(1, 'second');
                }
                var chunkEvent = event.clone();
                chunkEvent.startMoment = startMoment.clone();
                chunkEvent.endMoment = event.endMoment.clone();
                chunkEvents.push(chunkEvent);
            }
            else {
                var chunkEvent = event.clone();
                chunkEvent.startMoment = event.startMoment.clone();
                chunkEvent.endMoment = event.endMoment.clone();
                chunkEvents.push(chunkEvent);
            }
        });
        return chunkEvents;
    };
    Column.prototype.renderGrid = function (component) {
        return (h("div", { class: 'grid-wrapper' }, this.renderGridRows(component)));
    };
    Column.prototype.renderGridRows = function (component) {
        var _this = this;
        var gridDates = component.viewRange.dates;
        var stepMoments = component.stepMoments;
        var rows = [];
        stepMoments.forEach(function (_stepMoment, index) {
            var cols = [];
            gridDates.forEach(function (viewDate) {
                cols.push(h("div", { class: 'item', style: { height: _this.timeStepHeight + 'px' }, onClick: function () {
                        var fromMoment = viewDate.clone().add(_this.timeStepDuration * index, 'minutes');
                        var from = fromMoment.format('YYYY-MM-DD HH:mm:ss');
                        var toMoment = viewDate.clone().add(_this.timeStepDuration * index, 'minutes').add(_this.timeStepDuration, 'minutes');
                        var to = toMoment.format('YYYY-MM-DD HH:mm:ss');
                        component.cellClick.emit({
                            view: component.view,
                            from: from,
                            to: to
                        });
                    } }));
            });
            rows.push(h("div", { class: 'row' }, cols));
        });
        return rows;
    };
    Column.prototype.getSteps = function () {
        var totalSteps = (24 * 60) / this.timeStepDuration;
        var today = moment$1().startOf('day');
        var stepMoments = [];
        for (var i = 0; i < totalSteps; i++) {
            stepMoments.push(today.clone());
            today.add(this.timeStepDuration, 'minutes');
        }
        return stepMoments;
    };
    Column.prototype.renderLeftScale = function (component) {
        var _this = this;
        var steps = [];
        var stepMoments = component.stepMoments;
        stepMoments.forEach(function (stepMoment, index) {
            steps.push(h("div", { class: 'step', style: { height: _this.timeStepHeight + 1 + 'px' } }, h("div", { class: 'step-time' }, index === 0 ? '' : stepMoment.format(_this.timeStepFormat))));
        });
        return (h("div", { class: 'left-scale' }, h("div", { class: 'step-container' }, steps)));
    };
    Column.prototype.renderViewHeader = function (component) {
        var gridHeaderDates = component.viewRange.dates;
        var cls = ['view-header'];
        var contextMoment = component.contextMoment;
        var dayNames = [];
        gridHeaderDates.forEach(function (date) {
            var cls = ['item'];
            if (date.isSame(moment$1(), 'day')) {
                cls.push('today');
            }
            if (date.isSame(contextMoment, 'day')) {
                cls.push('context-date');
            }
            dayNames.push(h("div", { class: cls.join(' ') }, h("div", { class: 'view-header-column' }, h("div", { class: 'day-date', onClick: function () {
                    component.contextDate = date.format(INTERNAL_FORMAT.DATE);
                    component.view = VIEWS.day;
                } }, date.format('DD')), h("div", { class: 'day-name' }, date.format('dddd')))));
        });
        return (h("div", { class: cls.join(' ') }, h("div", { class: 'row' }, h("div", { class: 'empty-left-scale' }), dayNames)));
    };
    return Column;
}(View));
new Column();
var DayTemplateRenderer = /** @class */ (function (_super) {
    __extends(DayTemplateRenderer, _super);
    function DayTemplateRenderer() {
        return _super.call(this) || this;
    }
    return DayTemplateRenderer;
}(ColumnTemplateRenderer));
var templateRenderer$2 = new DayTemplateRenderer();
var Day = /** @class */ (function (_super) {
    __extends(Day, _super);
    function Day() {
        var _this = _super.call(this) || this;
        _this.numberOfCols = 1;
        _this.templateRenderer = templateRenderer$2;
        return _this;
    }
    Day.prototype.calculateViewRange = function (contextMoment, _weekStartDay) {
        var startMoment = contextMoment.clone().startOf('day');
        var endMoment = contextMoment.clone().endOf('day');
        return { startMoment: startMoment, endMoment: endMoment };
    };
    Day.prototype.getHeaderText = function (component) {
        return (h("div", null, component.contextMoment.format('DD MMMM YYYY')));
    };
    Day.prototype.getDatePickerLabel = function (component) {
        return component.contextMoment.format('DD MMM YYYY');
    };
    return Day;
}(Column));
var dayView = new Day();
var WeekTemplateRenderer = /** @class */ (function (_super) {
    __extends(WeekTemplateRenderer, _super);
    function WeekTemplateRenderer() {
        return _super.call(this) || this;
    }
    return WeekTemplateRenderer;
}(ColumnTemplateRenderer));
var templateRenderer$3 = new WeekTemplateRenderer();
var Week = /** @class */ (function (_super) {
    __extends(Week, _super);
    function Week() {
        var _this = _super.call(this) || this;
        _this.numberOfCols = 7;
        _this.templateRenderer = templateRenderer$3;
        return _this;
    }
    Week.prototype.calculateViewRange = function (contextMoment, weekStartDay) {
        var startMoment = contextMoment.clone().startOf('day');
        if (weekStartDay <= contextMoment.day())
            startMoment.day(weekStartDay);
        else
            startMoment.day(weekStartDay - 7);
        var endMoment = moment$1(startMoment).add(this.numberOfCols - 1, 'days').endOf('day');
        return { startMoment: startMoment, endMoment: endMoment };
    };
    return Week;
}(Column));
var weekView = new Week();
function getWeekEndDayNumber(startDayNumber) {
    if (startDayNumber == 0)
        return 6;
    return startDayNumber - 1;
}
function getNextDate(date, weekEndDayNumber) {
    var dayNumber = date.day();
    if (weekEndDayNumber >= dayNumber)
        date.day(weekEndDayNumber);
    else
        date.day(weekEndDayNumber + 7);
    date.endOf('day');
    return date;
}
function getPreviousDate(date, weekStartDayNumber) {
    var dayNumber = date.day();
    if (weekStartDayNumber <= dayNumber)
        date.day(weekStartDayNumber);
    else
        date.day(weekStartDayNumber - 7);
    date.startOf('day');
    return date;
}
function getFirstDayOfaMonthView(date, weekStartDay) {
    var firstDateOfMonth = date.clone().startOf('month');
    var firstDateOfMonthView = getPreviousDate(firstDateOfMonth, weekStartDay);
    return firstDateOfMonthView;
}
function getLastDayOfaMonthView(date, weekLastDay) {
    var lastDateOfMonth = date.clone().endOf('month');
    var lastDateOfMonthView = getNextDate(lastDateOfMonth, weekLastDay);
    return lastDateOfMonthView;
}
function calculateDateRange(date, weekStartDayNumber) {
    var weekEndDayNumber = getWeekEndDayNumber(weekStartDayNumber);
    var startMoment = getFirstDayOfaMonthView(date, weekStartDayNumber);
    var endMoment = getLastDayOfaMonthView(date, weekEndDayNumber);
    return {
        startMoment: startMoment,
        endMoment: endMoment
    };
}
var MonthTemplateRenderer = /** @class */ (function (_super) {
    __extends(MonthTemplateRenderer, _super);
    function MonthTemplateRenderer() {
        return _super.call(this) || this;
    }
    MonthTemplateRenderer.prototype.eventContainer = function (event) {
        var start = event.startMoment.format(INTERNAL_FORMAT.DISPLAY_TIME);
        var end = event.endMoment.format(INTERNAL_FORMAT.DISPLAY_TIME);
        return (h("div", { class: "event-container" }, h("div", { class: "event-title" }, h("span", null, start, " - ", end), ": ", event.title)));
    };
    return MonthTemplateRenderer;
}(TemplateRenderer));
var templateRenderer$4 = new MonthTemplateRenderer();
var colorName = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
};
var isArrayish = function isArrayish(obj) {
    if (!obj || typeof obj === 'string') {
        return false;
    }
    return obj instanceof Array || Array.isArray(obj) ||
        (obj.length >= 0 && (obj.splice instanceof Function ||
            (Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};
var simpleSwizzle = createCommonjsModule(function (module) {
    var concat = Array.prototype.concat;
    var slice = Array.prototype.slice;
    var swizzle = module.exports = function swizzle(args) {
        var results = [];
        for (var i = 0, len = args.length; i < len; i++) {
            var arg = args[i];
            if (isArrayish(arg)) {
                // http://jsperf.com/javascript-array-concat-vs-push/98
                results = concat.call(results, slice.call(arg));
            }
            else {
                results.push(arg);
            }
        }
        return results;
    };
    swizzle.wrap = function (fn) {
        return function () {
            return fn(swizzle(arguments));
        };
    };
});
var colorString = createCommonjsModule(function (module) {
    /* MIT license */
    var reverseNames = {};
    // create a list of reverse color names
    for (var name in colorName) {
        if (colorName.hasOwnProperty(name)) {
            reverseNames[colorName[name]] = name;
        }
    }
    var cs = module.exports = {
        to: {},
        get: {}
    };
    cs.get = function (string) {
        var prefix = string.substring(0, 3).toLowerCase();
        var val;
        var model;
        switch (prefix) {
            case 'hsl':
                val = cs.get.hsl(string);
                model = 'hsl';
                break;
            case 'hwb':
                val = cs.get.hwb(string);
                model = 'hwb';
                break;
            default:
                val = cs.get.rgb(string);
                model = 'rgb';
                break;
        }
        if (!val) {
            return null;
        }
        return { model: model, value: val };
    };
    cs.get.rgb = function (string) {
        if (!string) {
            return null;
        }
        var abbr = /^#([a-f0-9]{3,4})$/i;
        var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
        var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
        var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
        var keyword = /(\D+)/;
        var rgb = [0, 0, 0, 1];
        var match;
        var i;
        var hexAlpha;
        if (match = string.match(hex)) {
            hexAlpha = match[2];
            match = match[1];
            for (i = 0; i < 3; i++) {
                // https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
                var i2 = i * 2;
                rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
            }
            if (hexAlpha) {
                rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
            }
        }
        else if (match = string.match(abbr)) {
            match = match[1];
            hexAlpha = match[3];
            for (i = 0; i < 3; i++) {
                rgb[i] = parseInt(match[i] + match[i], 16);
            }
            if (hexAlpha) {
                rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
            }
        }
        else if (match = string.match(rgba)) {
            for (i = 0; i < 3; i++) {
                rgb[i] = parseInt(match[i + 1], 0);
            }
            if (match[4]) {
                rgb[3] = parseFloat(match[4]);
            }
        }
        else if (match = string.match(per)) {
            for (i = 0; i < 3; i++) {
                rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
            }
            if (match[4]) {
                rgb[3] = parseFloat(match[4]);
            }
        }
        else if (match = string.match(keyword)) {
            if (match[1] === 'transparent') {
                return [0, 0, 0, 0];
            }
            rgb = colorName[match[1]];
            if (!rgb) {
                return null;
            }
            rgb[3] = 1;
            return rgb;
        }
        else {
            return null;
        }
        for (i = 0; i < 3; i++) {
            rgb[i] = clamp(rgb[i], 0, 255);
        }
        rgb[3] = clamp(rgb[3], 0, 1);
        return rgb;
    };
    cs.get.hsl = function (string) {
        if (!string) {
            return null;
        }
        var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
        var match = string.match(hsl);
        if (match) {
            var alpha = parseFloat(match[4]);
            var h = (parseFloat(match[1]) + 360) % 360;
            var s = clamp(parseFloat(match[2]), 0, 100);
            var l = clamp(parseFloat(match[3]), 0, 100);
            var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
            return [h, s, l, a];
        }
        return null;
    };
    cs.get.hwb = function (string) {
        if (!string) {
            return null;
        }
        var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
        var match = string.match(hwb);
        if (match) {
            var alpha = parseFloat(match[4]);
            var h = ((parseFloat(match[1]) % 360) + 360) % 360;
            var w = clamp(parseFloat(match[2]), 0, 100);
            var b = clamp(parseFloat(match[3]), 0, 100);
            var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
            return [h, w, b, a];
        }
        return null;
    };
    cs.to.hex = function () {
        var rgba = simpleSwizzle(arguments);
        return ('#' +
            hexDouble(rgba[0]) +
            hexDouble(rgba[1]) +
            hexDouble(rgba[2]) +
            (rgba[3] < 1
                ? (hexDouble(Math.round(rgba[3] * 255)))
                : ''));
    };
    cs.to.rgb = function () {
        var rgba = simpleSwizzle(arguments);
        return rgba.length < 4 || rgba[3] === 1
            ? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
            : 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
    };
    cs.to.rgb.percent = function () {
        var rgba = simpleSwizzle(arguments);
        var r = Math.round(rgba[0] / 255 * 100);
        var g = Math.round(rgba[1] / 255 * 100);
        var b = Math.round(rgba[2] / 255 * 100);
        return rgba.length < 4 || rgba[3] === 1
            ? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
            : 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
    };
    cs.to.hsl = function () {
        var hsla = simpleSwizzle(arguments);
        return hsla.length < 4 || hsla[3] === 1
            ? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
            : 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
    };
    // hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
    // (hwb have alpha optional & 1 is default value)
    cs.to.hwb = function () {
        var hwba = simpleSwizzle(arguments);
        var a = '';
        if (hwba.length >= 4 && hwba[3] !== 1) {
            a = ', ' + hwba[3];
        }
        return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
    };
    cs.to.keyword = function (rgb) {
        return reverseNames[rgb.slice(0, 3)];
    };
    // helpers
    function clamp(num, min, max) {
        return Math.min(Math.max(min, num), max);
    }
    function hexDouble(num) {
        var str = num.toString(16).toUpperCase();
        return (str.length < 2) ? '0' + str : str;
    }
});
var conversions = createCommonjsModule(function (module) {
    /* MIT license */
    // NOTE: conversions should only return primitive values (i.e. arrays, or
    //       values that give correct `typeof` results).
    //       do not use box values types (i.e. Number(), String(), etc.)
    var reverseKeywords = {};
    for (var key in colorName) {
        if (colorName.hasOwnProperty(key)) {
            reverseKeywords[colorName[key]] = key;
        }
    }
    var convert = module.exports = {
        rgb: { channels: 3, labels: 'rgb' },
        hsl: { channels: 3, labels: 'hsl' },
        hsv: { channels: 3, labels: 'hsv' },
        hwb: { channels: 3, labels: 'hwb' },
        cmyk: { channels: 4, labels: 'cmyk' },
        xyz: { channels: 3, labels: 'xyz' },
        lab: { channels: 3, labels: 'lab' },
        lch: { channels: 3, labels: 'lch' },
        hex: { channels: 1, labels: ['hex'] },
        keyword: { channels: 1, labels: ['keyword'] },
        ansi16: { channels: 1, labels: ['ansi16'] },
        ansi256: { channels: 1, labels: ['ansi256'] },
        hcg: { channels: 3, labels: ['h', 'c', 'g'] },
        apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
        gray: { channels: 1, labels: ['gray'] }
    };
    // hide .channels and .labels properties
    for (var model in convert) {
        if (convert.hasOwnProperty(model)) {
            if (!('channels' in convert[model])) {
                throw new Error('missing channels property: ' + model);
            }
            if (!('labels' in convert[model])) {
                throw new Error('missing channel labels property: ' + model);
            }
            if (convert[model].labels.length !== convert[model].channels) {
                throw new Error('channel and label counts mismatch: ' + model);
            }
            var channels = convert[model].channels;
            var labels = convert[model].labels;
            delete convert[model].channels;
            delete convert[model].labels;
            Object.defineProperty(convert[model], 'channels', { value: channels });
            Object.defineProperty(convert[model], 'labels', { value: labels });
        }
    }
    convert.rgb.hsl = function (rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var h;
        var s;
        var l;
        if (max === min) {
            h = 0;
        }
        else if (r === max) {
            h = (g - b) / delta;
        }
        else if (g === max) {
            h = 2 + (b - r) / delta;
        }
        else if (b === max) {
            h = 4 + (r - g) / delta;
        }
        h = Math.min(h * 60, 360);
        if (h < 0) {
            h += 360;
        }
        l = (min + max) / 2;
        if (max === min) {
            s = 0;
        }
        else if (l <= 0.5) {
            s = delta / (max + min);
        }
        else {
            s = delta / (2 - max - min);
        }
        return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function (rgb) {
        var rdif;
        var gdif;
        var bdif;
        var h;
        var s;
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var v = Math.max(r, g, b);
        var diff = v - Math.min(r, g, b);
        var diffc = function (c) {
            return (v - c) / 6 / diff + 1 / 2;
        };
        if (diff === 0) {
            h = s = 0;
        }
        else {
            s = diff / v;
            rdif = diffc(r);
            gdif = diffc(g);
            bdif = diffc(b);
            if (r === v) {
                h = bdif - gdif;
            }
            else if (g === v) {
                h = (1 / 3) + rdif - bdif;
            }
            else if (b === v) {
                h = (2 / 3) + gdif - rdif;
            }
            if (h < 0) {
                h += 1;
            }
            else if (h > 1) {
                h -= 1;
            }
        }
        return [
            h * 360,
            s * 100,
            v * 100
        ];
    };
    convert.rgb.hwb = function (rgb) {
        var r = rgb[0];
        var g = rgb[1];
        var b = rgb[2];
        var h = convert.rgb.hsl(rgb)[0];
        var w = 1 / 255 * Math.min(r, Math.min(g, b));
        b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
        return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function (rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var c;
        var m;
        var y;
        var k;
        k = Math.min(1 - r, 1 - g, 1 - b);
        c = (1 - r - k) / (1 - k) || 0;
        m = (1 - g - k) / (1 - k) || 0;
        y = (1 - b - k) / (1 - k) || 0;
        return [c * 100, m * 100, y * 100, k * 100];
    };
    /**
     * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
     * */
    function comparativeDistance(x, y) {
        return (Math.pow(x[0] - y[0], 2) +
            Math.pow(x[1] - y[1], 2) +
            Math.pow(x[2] - y[2], 2));
    }
    convert.rgb.keyword = function (rgb) {
        var reversed = reverseKeywords[rgb];
        if (reversed) {
            return reversed;
        }
        var currentClosestDistance = Infinity;
        var currentClosestKeyword;
        for (var keyword in colorName) {
            if (colorName.hasOwnProperty(keyword)) {
                var value = colorName[keyword];
                // Compute comparative distance
                var distance = comparativeDistance(rgb, value);
                // Check if its less, if so set as closest
                if (distance < currentClosestDistance) {
                    currentClosestDistance = distance;
                    currentClosestKeyword = keyword;
                }
            }
        }
        return currentClosestKeyword;
    };
    convert.keyword.rgb = function (keyword) {
        return colorName[keyword];
    };
    convert.rgb.xyz = function (rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        // assume sRGB
        r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
        g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
        b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
        var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
        var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
        var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
        return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function (rgb) {
        var xyz = convert.rgb.xyz(rgb);
        var x = xyz[0];
        var y = xyz[1];
        var z = xyz[2];
        var l;
        var a;
        var b;
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
        l = (116 * y) - 16;
        a = 500 * (x - y);
        b = 200 * (y - z);
        return [l, a, b];
    };
    convert.hsl.rgb = function (hsl) {
        var h = hsl[0] / 360;
        var s = hsl[1] / 100;
        var l = hsl[2] / 100;
        var t1;
        var t2;
        var t3;
        var rgb;
        var val;
        if (s === 0) {
            val = l * 255;
            return [val, val, val];
        }
        if (l < 0.5) {
            t2 = l * (1 + s);
        }
        else {
            t2 = l + s - l * s;
        }
        t1 = 2 * l - t2;
        rgb = [0, 0, 0];
        for (var i = 0; i < 3; i++) {
            t3 = h + 1 / 3 * -(i - 1);
            if (t3 < 0) {
                t3++;
            }
            if (t3 > 1) {
                t3--;
            }
            if (6 * t3 < 1) {
                val = t1 + (t2 - t1) * 6 * t3;
            }
            else if (2 * t3 < 1) {
                val = t2;
            }
            else if (3 * t3 < 2) {
                val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            }
            else {
                val = t1;
            }
            rgb[i] = val * 255;
        }
        return rgb;
    };
    convert.hsl.hsv = function (hsl) {
        var h = hsl[0];
        var s = hsl[1] / 100;
        var l = hsl[2] / 100;
        var smin = s;
        var lmin = Math.max(l, 0.01);
        var sv;
        var v;
        l *= 2;
        s *= (l <= 1) ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        v = (l + s) / 2;
        sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);
        return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function (hsv) {
        var h = hsv[0] / 60;
        var s = hsv[1] / 100;
        var v = hsv[2] / 100;
        var hi = Math.floor(h) % 6;
        var f = h - Math.floor(h);
        var p = 255 * v * (1 - s);
        var q = 255 * v * (1 - (s * f));
        var t = 255 * v * (1 - (s * (1 - f)));
        v *= 255;
        switch (hi) {
            case 0:
                return [v, t, p];
            case 1:
                return [q, v, p];
            case 2:
                return [p, v, t];
            case 3:
                return [p, q, v];
            case 4:
                return [t, p, v];
            case 5:
                return [v, p, q];
        }
    };
    convert.hsv.hsl = function (hsv) {
        var h = hsv[0];
        var s = hsv[1] / 100;
        var v = hsv[2] / 100;
        var vmin = Math.max(v, 0.01);
        var lmin;
        var sl;
        var l;
        l = (2 - s) * v;
        lmin = (2 - s) * vmin;
        sl = s * vmin;
        sl /= (lmin <= 1) ? lmin : 2 - lmin;
        sl = sl || 0;
        l /= 2;
        return [h, sl * 100, l * 100];
    };
    // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
    convert.hwb.rgb = function (hwb) {
        var h = hwb[0] / 360;
        var wh = hwb[1] / 100;
        var bl = hwb[2] / 100;
        var ratio = wh + bl;
        var i;
        var v;
        var f;
        var n;
        // wh + bl cant be > 1
        if (ratio > 1) {
            wh /= ratio;
            bl /= ratio;
        }
        i = Math.floor(6 * h);
        v = 1 - bl;
        f = 6 * h - i;
        if ((i & 0x01) !== 0) {
            f = 1 - f;
        }
        n = wh + f * (v - wh); // linear interpolation
        var r;
        var g;
        var b;
        switch (i) {
            default:
            case 6:
            case 0:
                r = v;
                g = n;
                b = wh;
                break;
            case 1:
                r = n;
                g = v;
                b = wh;
                break;
            case 2:
                r = wh;
                g = v;
                b = n;
                break;
            case 3:
                r = wh;
                g = n;
                b = v;
                break;
            case 4:
                r = n;
                g = wh;
                b = v;
                break;
            case 5:
                r = v;
                g = wh;
                b = n;
                break;
        }
        return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function (cmyk) {
        var c = cmyk[0] / 100;
        var m = cmyk[1] / 100;
        var y = cmyk[2] / 100;
        var k = cmyk[3] / 100;
        var r;
        var g;
        var b;
        r = 1 - Math.min(1, c * (1 - k) + k);
        g = 1 - Math.min(1, m * (1 - k) + k);
        b = 1 - Math.min(1, y * (1 - k) + k);
        return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function (xyz) {
        var x = xyz[0] / 100;
        var y = xyz[1] / 100;
        var z = xyz[2] / 100;
        var r;
        var g;
        var b;
        r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
        g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
        b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
        // assume sRGB
        r = r > 0.0031308
            ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
            : r * 12.92;
        g = g > 0.0031308
            ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
            : g * 12.92;
        b = b > 0.0031308
            ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
            : b * 12.92;
        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b = Math.min(Math.max(0, b), 1);
        return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function (xyz) {
        var x = xyz[0];
        var y = xyz[1];
        var z = xyz[2];
        var l;
        var a;
        var b;
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
        l = (116 * y) - 16;
        a = 500 * (x - y);
        b = 200 * (y - z);
        return [l, a, b];
    };
    convert.lab.xyz = function (lab) {
        var l = lab[0];
        var a = lab[1];
        var b = lab[2];
        var x;
        var y;
        var z;
        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b / 200;
        var y2 = Math.pow(y, 3);
        var x2 = Math.pow(x, 3);
        var z2 = Math.pow(z, 3);
        y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
        x *= 95.047;
        y *= 100;
        z *= 108.883;
        return [x, y, z];
    };
    convert.lab.lch = function (lab) {
        var l = lab[0];
        var a = lab[1];
        var b = lab[2];
        var hr;
        var h;
        var c;
        hr = Math.atan2(b, a);
        h = hr * 360 / 2 / Math.PI;
        if (h < 0) {
            h += 360;
        }
        c = Math.sqrt(a * a + b * b);
        return [l, c, h];
    };
    convert.lch.lab = function (lch) {
        var l = lch[0];
        var c = lch[1];
        var h = lch[2];
        var a;
        var b;
        var hr;
        hr = h / 360 * 2 * Math.PI;
        a = c * Math.cos(hr);
        b = c * Math.sin(hr);
        return [l, a, b];
    };
    convert.rgb.ansi16 = function (args) {
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization
        value = Math.round(value / 50);
        if (value === 0) {
            return 30;
        }
        var ansi = 30
            + ((Math.round(b / 255) << 2)
                | (Math.round(g / 255) << 1)
                | Math.round(r / 255));
        if (value === 2) {
            ansi += 60;
        }
        return ansi;
    };
    convert.hsv.ansi16 = function (args) {
        // optimization here; we already know the value and don't need to get
        // it converted for us.
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function (args) {
        var r = args[0];
        var g = args[1];
        var b = args[2];
        // we use the extended greyscale palette here, with the exception of
        // black and white. normal palette only has 4 greyscale shades.
        if (r === g && g === b) {
            if (r < 8) {
                return 16;
            }
            if (r > 248) {
                return 231;
            }
            return Math.round(((r - 8) / 247) * 24) + 232;
        }
        var ansi = 16
            + (36 * Math.round(r / 255 * 5))
            + (6 * Math.round(g / 255 * 5))
            + Math.round(b / 255 * 5);
        return ansi;
    };
    convert.ansi16.rgb = function (args) {
        var color = args % 10;
        // handle greyscale
        if (color === 0 || color === 7) {
            if (args > 50) {
                color += 3.5;
            }
            color = color / 10.5 * 255;
            return [color, color, color];
        }
        var mult = (~~(args > 50) + 1) * 0.5;
        var r = ((color & 1) * mult) * 255;
        var g = (((color >> 1) & 1) * mult) * 255;
        var b = (((color >> 2) & 1) * mult) * 255;
        return [r, g, b];
    };
    convert.ansi256.rgb = function (args) {
        // handle greyscale
        if (args >= 232) {
            var c = (args - 232) * 10 + 8;
            return [c, c, c];
        }
        args -= 16;
        var rem;
        var r = Math.floor(args / 36) / 5 * 255;
        var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
        var b = (rem % 6) / 5 * 255;
        return [r, g, b];
    };
    convert.rgb.hex = function (args) {
        var integer = ((Math.round(args[0]) & 0xFF) << 16)
            + ((Math.round(args[1]) & 0xFF) << 8)
            + (Math.round(args[2]) & 0xFF);
        var string = integer.toString(16).toUpperCase();
        return '000000'.substring(string.length) + string;
    };
    convert.hex.rgb = function (args) {
        var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
            return [0, 0, 0];
        }
        var colorString = match[0];
        if (match[0].length === 3) {
            colorString = colorString.split('').map(function (char) {
                return char + char;
            }).join('');
        }
        var integer = parseInt(colorString, 16);
        var r = (integer >> 16) & 0xFF;
        var g = (integer >> 8) & 0xFF;
        var b = integer & 0xFF;
        return [r, g, b];
    };
    convert.rgb.hcg = function (rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var max = Math.max(Math.max(r, g), b);
        var min = Math.min(Math.min(r, g), b);
        var chroma = (max - min);
        var grayscale;
        var hue;
        if (chroma < 1) {
            grayscale = min / (1 - chroma);
        }
        else {
            grayscale = 0;
        }
        if (chroma <= 0) {
            hue = 0;
        }
        else if (max === r) {
            hue = ((g - b) / chroma) % 6;
        }
        else if (max === g) {
            hue = 2 + (b - r) / chroma;
        }
        else {
            hue = 4 + (r - g) / chroma + 4;
        }
        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function (hsl) {
        var s = hsl[1] / 100;
        var l = hsl[2] / 100;
        var c = 1;
        var f = 0;
        if (l < 0.5) {
            c = 2.0 * s * l;
        }
        else {
            c = 2.0 * s * (1.0 - l);
        }
        if (c < 1.0) {
            f = (l - 0.5 * c) / (1.0 - c);
        }
        return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function (hsv) {
        var s = hsv[1] / 100;
        var v = hsv[2] / 100;
        var c = s * v;
        var f = 0;
        if (c < 1.0) {
            f = (v - c) / (1 - c);
        }
        return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function (hcg) {
        var h = hcg[0] / 360;
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        if (c === 0.0) {
            return [g * 255, g * 255, g * 255];
        }
        var pure = [0, 0, 0];
        var hi = (h % 1) * 6;
        var v = hi % 1;
        var w = 1 - v;
        var mg = 0;
        switch (Math.floor(hi)) {
            case 0:
                pure[0] = 1;
                pure[1] = v;
                pure[2] = 0;
                break;
            case 1:
                pure[0] = w;
                pure[1] = 1;
                pure[2] = 0;
                break;
            case 2:
                pure[0] = 0;
                pure[1] = 1;
                pure[2] = v;
                break;
            case 3:
                pure[0] = 0;
                pure[1] = w;
                pure[2] = 1;
                break;
            case 4:
                pure[0] = v;
                pure[1] = 0;
                pure[2] = 1;
                break;
            default:
                pure[0] = 1;
                pure[1] = 0;
                pure[2] = w;
        }
        mg = (1.0 - c) * g;
        return [
            (c * pure[0] + mg) * 255,
            (c * pure[1] + mg) * 255,
            (c * pure[2] + mg) * 255
        ];
    };
    convert.hcg.hsv = function (hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var v = c + g * (1.0 - c);
        var f = 0;
        if (v > 0.0) {
            f = c / v;
        }
        return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function (hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var l = g * (1.0 - c) + 0.5 * c;
        var s = 0;
        if (l > 0.0 && l < 0.5) {
            s = c / (2 * l);
        }
        else if (l >= 0.5 && l < 1.0) {
            s = c / (2 * (1 - l));
        }
        return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function (hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var v = c + g * (1.0 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function (hwb) {
        var w = hwb[1] / 100;
        var b = hwb[2] / 100;
        var v = 1 - b;
        var c = v - w;
        var g = 0;
        if (c < 1) {
            g = (v - c) / (1 - c);
        }
        return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function (apple) {
        return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
    };
    convert.rgb.apple = function (rgb) {
        return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
    };
    convert.gray.rgb = function (args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = convert.gray.hsv = function (args) {
        return [0, 0, args[0]];
    };
    convert.gray.hwb = function (gray) {
        return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function (gray) {
        return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function (gray) {
        return [gray[0], 0, 0];
    };
    convert.gray.hex = function (gray) {
        var val = Math.round(gray[0] / 100 * 255) & 0xFF;
        var integer = (val << 16) + (val << 8) + val;
        var string = integer.toString(16).toUpperCase();
        return '000000'.substring(string.length) + string;
    };
    convert.rgb.gray = function (rgb) {
        var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
    };
});
/*
    this function routes a model to all other models.

    all functions that are routed have a property `.conversion` attached
    to the returned synthetic function. This property is an array
    of strings, each with the steps in between the 'from' and 'to'
    color models (inclusive).

    conversions that are not possible simply are not included.
*/
function buildGraph() {
    var graph = {};
    // https://jsperf.com/object-keys-vs-for-in-with-closure/3
    var models = Object.keys(conversions);
    for (var len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null
        };
    }
    return graph;
}
// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
    var graph = buildGraph();
    var queue = [fromModel]; // unshift -> queue -> pop
    graph[fromModel].distance = 0;
    while (queue.length) {
        var current = queue.pop();
        var adjacents = Object.keys(conversions[current]);
        for (var len = adjacents.length, i = 0; i < len; i++) {
            var adjacent = adjacents[i];
            var node = graph[adjacent];
            if (node.distance === -1) {
                node.distance = graph[current].distance + 1;
                node.parent = current;
                queue.unshift(adjacent);
            }
        }
    }
    return graph;
}
function link(from, to) {
    return function (args) {
        return to(from(args));
    };
}
function wrapConversion(toModel, graph) {
    var path = [graph[toModel].parent, toModel];
    var fn = conversions[graph[toModel].parent][toModel];
    var cur = graph[toModel].parent;
    while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
}
var route = function (fromModel) {
    var graph = deriveBFS(fromModel);
    var conversion = {};
    var models = Object.keys(graph);
    for (var len = models.length, i = 0; i < len; i++) {
        var toModel = models[i];
        var node = graph[toModel];
        if (node.parent === null) {
            // no possible conversion, or this node is the source model.
            continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
};
var convert = {};
var models = Object.keys(conversions);
function wrapRaw(fn) {
    var wrappedFn = function (args) {
        if (args === undefined || args === null) {
            return args;
        }
        if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
        }
        return fn(args);
    };
    // preserve .conversion property if there is one
    if ('conversion' in fn) {
        wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
}
function wrapRounded(fn) {
    var wrappedFn = function (args) {
        if (args === undefined || args === null) {
            return args;
        }
        if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
        }
        var result = fn(args);
        // we're assuming the result is an array here.
        // see notice in conversions.js; don't use box types
        // in conversion functions.
        if (typeof result === 'object') {
            for (var len = result.length, i = 0; i < len; i++) {
                result[i] = Math.round(result[i]);
            }
        }
        return result;
    };
    // preserve .conversion property if there is one
    if ('conversion' in fn) {
        wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
}
models.forEach(function (fromModel) {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], 'channels', { value: conversions[fromModel].channels });
    Object.defineProperty(convert[fromModel], 'labels', { value: conversions[fromModel].labels });
    var routes = route(fromModel);
    var routeModels = Object.keys(routes);
    routeModels.forEach(function (toModel) {
        var fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
    });
});
var colorConvert = convert;
var _slice = [].slice;
var skippedModels = [
    // to be honest, I don't really feel like keyword belongs in color convert, but eh.
    'keyword',
    // gray conflicts with some method names, and has its own method defined.
    'gray',
    // shouldn't really be in color-convert either...
    'hex'
];
var hashedModelKeys = {};
Object.keys(colorConvert).forEach(function (model) {
    hashedModelKeys[_slice.call(colorConvert[model].labels).sort().join('')] = model;
});
var limiters = {};
function Color(obj, model) {
    if (!(this instanceof Color)) {
        return new Color(obj, model);
    }
    if (model && model in skippedModels) {
        model = null;
    }
    if (model && !(model in colorConvert)) {
        throw new Error('Unknown model: ' + model);
    }
    var i;
    var channels;
    if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
        this.model = 'rgb';
        this.color = [0, 0, 0];
        this.valpha = 1;
    }
    else if (obj instanceof Color) {
        this.model = obj.model;
        this.color = obj.color.slice();
        this.valpha = obj.valpha;
    }
    else if (typeof obj === 'string') {
        var result = colorString.get(obj);
        if (result === null) {
            throw new Error('Unable to parse color from string: ' + obj);
        }
        this.model = result.model;
        channels = colorConvert[this.model].channels;
        this.color = result.value.slice(0, channels);
        this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
    }
    else if (obj.length) {
        this.model = model || 'rgb';
        channels = colorConvert[this.model].channels;
        var newArr = _slice.call(obj, 0, channels);
        this.color = zeroArray(newArr, channels);
        this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
    }
    else if (typeof obj === 'number') {
        // this is always RGB - can be converted later on.
        obj &= 0xFFFFFF;
        this.model = 'rgb';
        this.color = [
            (obj >> 16) & 0xFF,
            (obj >> 8) & 0xFF,
            obj & 0xFF
        ];
        this.valpha = 1;
    }
    else {
        this.valpha = 1;
        var keys = Object.keys(obj);
        if ('alpha' in obj) {
            keys.splice(keys.indexOf('alpha'), 1);
            this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
        }
        var hashedKeys = keys.sort().join('');
        if (!(hashedKeys in hashedModelKeys)) {
            throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
        }
        this.model = hashedModelKeys[hashedKeys];
        var labels = colorConvert[this.model].labels;
        var color = [];
        for (i = 0; i < labels.length; i++) {
            color.push(obj[labels[i]]);
        }
        this.color = zeroArray(color);
    }
    // perform limitations (clamping, etc.)
    if (limiters[this.model]) {
        channels = colorConvert[this.model].channels;
        for (i = 0; i < channels; i++) {
            var limit = limiters[this.model][i];
            if (limit) {
                this.color[i] = limit(this.color[i]);
            }
        }
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha));
    if (Object.freeze) {
        Object.freeze(this);
    }
}
Color.prototype = {
    toString: function () {
        return this.string();
    },
    toJSON: function () {
        return this[this.model]();
    },
    string: function (places) {
        var self = this.model in colorString.to ? this : this.rgb();
        self = self.round(typeof places === 'number' ? places : 1);
        var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return colorString.to[self.model](args);
    },
    percentString: function (places) {
        var self = this.rgb().round(typeof places === 'number' ? places : 1);
        var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return colorString.to.rgb.percent(args);
    },
    array: function () {
        return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
    },
    object: function () {
        var result = {};
        var channels = colorConvert[this.model].channels;
        var labels = colorConvert[this.model].labels;
        for (var i = 0; i < channels; i++) {
            result[labels[i]] = this.color[i];
        }
        if (this.valpha !== 1) {
            result.alpha = this.valpha;
        }
        return result;
    },
    unitArray: function () {
        var rgb = this.rgb().color;
        rgb[0] /= 255;
        rgb[1] /= 255;
        rgb[2] /= 255;
        if (this.valpha !== 1) {
            rgb.push(this.valpha);
        }
        return rgb;
    },
    unitObject: function () {
        var rgb = this.rgb().object();
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        if (this.valpha !== 1) {
            rgb.alpha = this.valpha;
        }
        return rgb;
    },
    round: function (places) {
        places = Math.max(places || 0, 0);
        return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
    },
    alpha: function (val) {
        if (arguments.length) {
            return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
        }
        return this.valpha;
    },
    // rgb
    red: getset('rgb', 0, maxfn(255)),
    green: getset('rgb', 1, maxfn(255)),
    blue: getset('rgb', 2, maxfn(255)),
    hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }),
    saturationl: getset('hsl', 1, maxfn(100)),
    lightness: getset('hsl', 2, maxfn(100)),
    saturationv: getset('hsv', 1, maxfn(100)),
    value: getset('hsv', 2, maxfn(100)),
    chroma: getset('hcg', 1, maxfn(100)),
    gray: getset('hcg', 2, maxfn(100)),
    white: getset('hwb', 1, maxfn(100)),
    wblack: getset('hwb', 2, maxfn(100)),
    cyan: getset('cmyk', 0, maxfn(100)),
    magenta: getset('cmyk', 1, maxfn(100)),
    yellow: getset('cmyk', 2, maxfn(100)),
    black: getset('cmyk', 3, maxfn(100)),
    x: getset('xyz', 0, maxfn(100)),
    y: getset('xyz', 1, maxfn(100)),
    z: getset('xyz', 2, maxfn(100)),
    l: getset('lab', 0, maxfn(100)),
    a: getset('lab', 1),
    b: getset('lab', 2),
    keyword: function (val) {
        if (arguments.length) {
            return new Color(val);
        }
        return colorConvert[this.model].keyword(this.color);
    },
    hex: function (val) {
        if (arguments.length) {
            return new Color(val);
        }
        return colorString.to.hex(this.rgb().round().color);
    },
    rgbNumber: function () {
        var rgb = this.rgb().color;
        return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
    },
    luminosity: function () {
        // http://www.w3.org/TR/WCAG20/#relativeluminancedef
        var rgb = this.rgb().color;
        var lum = [];
        for (var i = 0; i < rgb.length; i++) {
            var chan = rgb[i] / 255;
            lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
        }
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },
    contrast: function (color2) {
        // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
        var lum1 = this.luminosity();
        var lum2 = color2.luminosity();
        if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
        }
        return (lum2 + 0.05) / (lum1 + 0.05);
    },
    level: function (color2) {
        var contrastRatio = this.contrast(color2);
        if (contrastRatio >= 7.1) {
            return 'AAA';
        }
        return (contrastRatio >= 4.5) ? 'AA' : '';
    },
    isDark: function () {
        // YIQ equation from http://24ways.org/2010/calculating-color-contrast
        var rgb = this.rgb().color;
        var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return yiq < 128;
    },
    isLight: function () {
        return !this.isDark();
    },
    negate: function () {
        var rgb = this.rgb();
        for (var i = 0; i < 3; i++) {
            rgb.color[i] = 255 - rgb.color[i];
        }
        return rgb;
    },
    lighten: function (ratio) {
        var hsl = this.hsl();
        hsl.color[2] += hsl.color[2] * ratio;
        return hsl;
    },
    darken: function (ratio) {
        var hsl = this.hsl();
        hsl.color[2] -= hsl.color[2] * ratio;
        return hsl;
    },
    saturate: function (ratio) {
        var hsl = this.hsl();
        hsl.color[1] += hsl.color[1] * ratio;
        return hsl;
    },
    desaturate: function (ratio) {
        var hsl = this.hsl();
        hsl.color[1] -= hsl.color[1] * ratio;
        return hsl;
    },
    whiten: function (ratio) {
        var hwb = this.hwb();
        hwb.color[1] += hwb.color[1] * ratio;
        return hwb;
    },
    blacken: function (ratio) {
        var hwb = this.hwb();
        hwb.color[2] += hwb.color[2] * ratio;
        return hwb;
    },
    grayscale: function () {
        // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
        var rgb = this.rgb().color;
        var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
        return Color.rgb(val, val, val);
    },
    fade: function (ratio) {
        return this.alpha(this.valpha - (this.valpha * ratio));
    },
    opaquer: function (ratio) {
        return this.alpha(this.valpha + (this.valpha * ratio));
    },
    rotate: function (degrees) {
        var hsl = this.hsl();
        var hue = hsl.color[0];
        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;
        hsl.color[0] = hue;
        return hsl;
    },
    mix: function (mixinColor, weight) {
        // ported from sass implementation in C
        // https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
        if (!mixinColor || !mixinColor.rgb) {
            throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
        }
        var color1 = mixinColor.rgb();
        var color2 = this.rgb();
        var p = weight === undefined ? 0.5 : weight;
        var w = 2 * p - 1;
        var a = color1.alpha() - color2.alpha();
        var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        var w2 = 1 - w1;
        return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
    }
};
// model conversion methods and static constructors
Object.keys(colorConvert).forEach(function (model) {
    if (skippedModels.indexOf(model) !== -1) {
        return;
    }
    var channels = colorConvert[model].channels;
    // conversion methods
    Color.prototype[model] = function () {
        if (this.model === model) {
            return new Color(this);
        }
        if (arguments.length) {
            return new Color(arguments, model);
        }
        var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
        return new Color(assertArray(colorConvert[this.model][model].raw(this.color)).concat(newAlpha), model);
    };
    // 'static' construction methods
    Color[model] = function (color) {
        if (typeof color === 'number') {
            color = zeroArray(_slice.call(arguments), channels);
        }
        return new Color(color, model);
    };
});
function roundTo(num, places) {
    return Number(num.toFixed(places));
}
function roundToPlace(places) {
    return function (num) {
        return roundTo(num, places);
    };
}
function getset(model, channel, modifier) {
    model = Array.isArray(model) ? model : [model];
    model.forEach(function (m) {
        (limiters[m] || (limiters[m] = []))[channel] = modifier;
    });
    model = model[0];
    return function (val) {
        var result;
        if (arguments.length) {
            if (modifier) {
                val = modifier(val);
            }
            result = this[model]();
            result.color[channel] = val;
            return result;
        }
        result = this[model]().color[channel];
        if (modifier) {
            result = modifier(result);
        }
        return result;
    };
}
function maxfn(max) {
    return function (v) {
        return Math.max(0, Math.min(max, v));
    };
}
function assertArray(val) {
    return Array.isArray(val) ? val : [val];
}
function zeroArray(arr, length) {
    for (var i = 0; i < length; i++) {
        if (typeof arr[i] !== 'number') {
            arr[i] = 0;
        }
    }
    return arr;
}
var color = Color;
function fade(color$1, amount) {
    return color(color$1).fade(amount);
}
function negate(color$1) {
    return color(color$1).negate();
}
function darken(color$1, amount) {
    return color(color$1).darken(amount);
}
var Month = /** @class */ (function (_super) {
    __extends(Month, _super);
    function Month() {
        var _this = _super.call(this) || this;
        _this.viewHeaderHeight = 50;
        _this.eventHeight = 20;
        _this.eventLeftMargin = 5;
        _this.eventTopMargin = 5;
        _this.gridCellHeaderHeight = 35;
        _this.templateRenderer = templateRenderer$4;
        return _this;
    }
    Month.prototype.next = function (component) {
        component.contextDate = component.contextMoment.clone().add(1, 'month').format(INTERNAL_FORMAT.DATE);
    };
    Month.prototype.prev = function (component) {
        component.contextDate = component.contextMoment.clone().add(-1, 'month').format(INTERNAL_FORMAT.DATE);
    };
    Month.prototype.renderView = function (component) {
        var result = this.getRowHeights(component);
        component.maxEventsInRowMap = result.maxEventsInRowMap;
        var cls = ['view-wrapper'];
        return (h("div", { class: cls.join(' '), style: { '--view-header-height': this.viewHeaderHeight + 'px' } }, this.renderViewHeader(component), this.renderViewBody(component)));
    };
    Month.prototype.renderViewBody = function (component) {
        var cls = ['view-body'];
        return (h("div", { class: cls.join(' ') }, h("div", { class: 'view-body-relative' }, this.renderDrawingArea(component))));
    };
    Month.prototype.renderDrawingArea = function (component) {
        return (h("div", { class: 'drawing-area-container' }, h("div", { class: 'drawing-area-container-relative' }, this.renderGrid(component), this.renderEvents(component))));
    };
    Month.prototype.renderEvents = function (component) {
        var _this = this;
        var events = [];
        this.getEvents(component).renderedEvents.forEach(function (event) {
            events.push(_this.getEvent(component, event));
        });
        return (h("div", { class: 'events-wrapper' }, events));
    };
    Month.prototype.getRowHeights = function (component) {
        var _this = this;
        var events = __spreadArrays(component.viewRange.events);
        var maxEventsInRowMap = {};
        var gridHeaderDates = __spreadArrays(component.viewRange.dates).slice(0, 7);
        var days = [];
        gridHeaderDates.forEach(function (date) {
            days.push(date.day());
        });
        var gridDates = __spreadArrays(component.viewRange.dates);
        var rowMS = [];
        var rowCount = gridDates.length / 7;
        for (var i = 0; i < rowCount; i++) {
            var rowDates = gridDates.splice(0, 7);
            rowMS.push({
                startMS: rowDates[0].valueOf(),
                endMS: rowDates[6].clone().endOf('day').valueOf()
            });
        }
        rowMS.forEach(function (row, index) {
            var cellEventsMap = {};
            if (!maxEventsInRowMap[index]) {
                maxEventsInRowMap[index] = {
                    countInThisRow: 0,
                };
                maxEventsInRowMap[index].height = _this.getRowHeight(component, maxEventsInRowMap, index);
            }
            events.forEach(function (event) {
                var eventStartMS = event.startMoment.valueOf();
                var eventStartCellIndex = days.indexOf(event.startMoment.day());
                var eventEndCellIndex = days.indexOf(event.endMoment.day());
                if (eventStartMS > row.startMS && eventStartMS < row.endMS) {
                    var start = eventStartCellIndex;
                    while (start <= eventEndCellIndex) {
                        var cellKey = index + '_' + start;
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
                            maxEventsInRowMap[index].height = _this.getRowHeight(component, maxEventsInRowMap, index);
                        }
                        start++;
                    }
                }
            });
        });
        return {
            maxEventsInRowMap: maxEventsInRowMap
        };
    };
    Month.prototype.getEvents = function (component) {
        var _this = this;
        var events = __spreadArrays(component.viewRange.events);
        var renderedEvents = [];
        var gridHeaderDates = __spreadArrays(component.viewRange.dates).slice(0, 7);
        var days = [];
        gridHeaderDates.forEach(function (date) {
            days.push(date.day());
        });
        var gridDates = __spreadArrays(component.viewRange.dates);
        var rowMS = [];
        var rowCount = gridDates.length / 7;
        for (var i = 0; i < rowCount; i++) {
            var rowDates = gridDates.splice(0, 7);
            rowMS.push({
                startMS: rowDates[0].valueOf(),
                endMS: rowDates[6].clone().endOf('day').valueOf()
            });
        }
        var cellEventsMap = {};
        console.log(events);
        events.forEach(function (event) {
            var eventStartMS = event.startMoment.valueOf();
            var style = {
                height: _this.eventHeight + 'px',
            };
            var eventCellCount = event.endMoment.diff(event.startMoment, 'days');
            style["width"] = 'calc(' + (((eventCellCount + 1) / 7) * 100) + '%' + ' - ' + (2 * _this.eventLeftMargin) + 'px' + ')';
            var eventStartCellIndex = days.indexOf(event.startMoment.day());
            var leftPosition = 'calc(' + (((eventStartCellIndex) / 7) * 100) + '%' + ' + ' + _this.eventLeftMargin + 'px' + ')';
            style["left"] = leftPosition;
            var eventEndCellIndex = days.indexOf(event.endMoment.day());
            rowMS.forEach(function (row, index) {
                if (eventStartMS >= row.startMS && eventStartMS <= row.endMS) {
                    var start = eventStartCellIndex;
                    while (start <= eventEndCellIndex) {
                        var cellKey_1 = index + '_' + start;
                        if (!cellEventsMap[cellKey_1]) {
                            cellEventsMap[cellKey_1] = {
                                count: 0,
                                moreEventsPresent: false
                            };
                        }
                        else {
                            cellEventsMap[cellKey_1].count = cellEventsMap[cellKey_1].count + 1;
                        }
                        start++;
                    }
                    var cellKey = index + '_' + eventStartCellIndex;
                    var heightTillPreviousRow = 0;
                    for (var j = 0; j < index; j++) {
                        heightTillPreviousRow = heightTillPreviousRow + component.maxEventsInRowMap[j].height;
                    }
                    var topPosition = 'calc(' + heightTillPreviousRow + 'px' + ' + ' + (_this.gridCellHeaderHeight + ((cellEventsMap[cellKey].count) * (_this.eventHeight + _this.eventTopMargin))) + 'px' + ')';
                    style["top"] = topPosition;
                    event.style = style;
                    renderedEvents.push(event);
                }
            });
        });
        return {
            renderedEvents: renderedEvents,
        };
    };
    Month.prototype.getEvent = function (component, event) {
        var _a;
        var eventStyles = Object.assign(Object.assign({}, event.style), (_a = { background: event.background, color: event.text_color }, _a['border-color'] = event.borderColor, _a));
        return (h("div", { class: 'event', style: Object.assign({}, eventStyles), onClick: function () {
                component.eventClick.emit({
                    event: event.rawEvent,
                });
                //component.selectedEvent = event;
            } }, this.templateRenderer.eventContainer(event)));
    };
    Month.prototype.renderGrid = function (component) {
        return (h("div", { class: 'grid-wrapper' }, this.renderGridRows(component)));
    };
    Month.prototype.renderGridRows = function (component) {
        var gridDates = __spreadArrays(component.viewRange.dates);
        var rows = [];
        var rowCount = gridDates.length / 7;
        for (var i = 0; i < rowCount; i++) {
            rows.push(this.getRow(component, gridDates.splice(0, 7), rowCount, i));
        }
        return rows;
    };
    Month.prototype.getRowHeight = function (_component, maxEventsInRowMap, rowIndex) {
        var countInThisRow = 4;
        if (maxEventsInRowMap[rowIndex] && maxEventsInRowMap[rowIndex].countInThisRow > 4) {
            countInThisRow = maxEventsInRowMap[rowIndex].countInThisRow;
        }
        var rowHeight = this.gridCellHeaderHeight + countInThisRow * (this.eventHeight + this.eventTopMargin);
        return rowHeight;
    };
    Month.prototype.getRow = function (component, rowDates, _rowcount, rowIndex) {
        var _this = this;
        var cols = [];
        var rowHeight = this.getRowHeight(component, component.maxEventsInRowMap, rowIndex) + 'px';
        //const minRowHeight = 'calc((var(--component-height) - var(--header-height) - var(--view-header-height) - 10px) / ' + rowcount + ')';
        rowDates.forEach(function (rowDate) {
            cols.push(_this.getCellWrapper(component, rowDate, rowHeight));
        });
        return (h("div", { class: 'row', style: { 'height': rowHeight } }, cols));
    };
    Month.prototype.getCellWrapper = function (component, date, rowHeight) {
        var cls = ['item'];
        var contextMoment = component.contextMoment;
        var cellStyles = {
            background: ''
        };
        if (date.isSame(moment$1(), 'day')) {
            cls.push('today');
            cellStyles.background = fade(component.theme, 0.9);
        }
        if (date.isSame(contextMoment, 'day')) {
            cls.push('context-date');
        }
        if (!date.isSame(contextMoment, 'month')) {
            cls.push('grey-out');
        }
        return (h("div", { class: cls.join(' '), style: cellStyles }, h("div", { class: 'cell-wrapper', style: { height: rowHeight }, onClick: function () {
                component.cellClick.emit({
                    view: component.view,
                    from: date.format('YYYY-MM-DD HH:mm:ss'),
                    to: date.clone().add(1, 'day').add(-1, 'second').format('YYYY-MM-DD HH:mm:ss')
                });
            } }, h("div", { class: 'cell-header', style: { height: this.gridCellHeaderHeight + 'px' } }, h("div", { class: 'cell-date', onClick: function (ev) {
                component.contextDate = date.format(INTERNAL_FORMAT.DATE);
                component.view = VIEWS.day;
                ev.stopPropagation();
                ev.preventDefault();
            } }, date.format('DD'))))));
    };
    Month.prototype.renderViewHeader = function (component) {
        var gridHeaderDates = __spreadArrays(component.viewRange.dates).slice(0, 7);
        var cls = ['view-header'];
        var dayNames = [];
        gridHeaderDates.forEach(function (date) {
            var headerColumnCls = ['view-header-column'];
            dayNames.push(h("div", { class: 'item' }, h("div", { class: headerColumnCls.join(' ') }, h("div", { class: 'day-name' }, date.format('dddd')))));
        });
        return (h("div", { class: cls.join(' ') }, h("div", { class: 'row' }, dayNames)));
    };
    Month.prototype.calculateViewRange = function (contextMoment, weekStartDay) {
        return calculateDateRange(contextMoment, weekStartDay);
    };
    Month.prototype.getHeaderText = function (component) {
        return (h("div", null, component.contextMoment.format('MMMM YYYY')));
    };
    Month.prototype.getDatePickerLabel = function (component) {
        return component.contextMoment.format('MMM YYYY');
    };
    Month.prototype.processEventsInViewRange = function (component, events) {
        var processedEvents;
        this.chopEvents(component, events);
        processedEvents = this.chunkEvents(component, events);
        return processedEvents;
    };
    Month.prototype.chunkEvents = function (component, events) {
        var chunkEvents = [];
        var gridHeaderDates = __spreadArrays(component.viewRange.dates).slice(0, 7);
        var days = [];
        gridHeaderDates.forEach(function (date) {
            days.push(date.day());
        });
        events.forEach(function (event) {
            if (event.isMultiDay) {
                var eventEndIndex = days.indexOf(event.startMoment.day());
                var currentRowEndMoment = event.startMoment.clone().add(6 - eventEndIndex, 'days').endOf('day');
                if (currentRowEndMoment.isSameOrAfter(event.endMoment)) {
                    var chunkEvent = event.clone();
                    chunkEvent.startMoment = event.startMoment.clone();
                    chunkEvent.endMoment = event.endMoment.clone();
                    chunkEvents.push(chunkEvent);
                }
                else {
                    var startMoment = event.startMoment.clone();
                    while (currentRowEndMoment.isBefore(event.endMoment)) {
                        var chunkEvent_2 = event.clone();
                        chunkEvent_2.startMoment = startMoment.clone();
                        chunkEvent_2.endMoment = currentRowEndMoment.clone();
                        chunkEvents.push(chunkEvent_2);
                        startMoment = chunkEvent_2.endMoment.clone().add(1, 'day').startOf('day');
                        currentRowEndMoment.add(7, 'days');
                    }
                    var chunkEvent = event.clone();
                    chunkEvent.startMoment = startMoment.clone();
                    chunkEvent.endMoment = event.endMoment.clone();
                    chunkEvents.push(chunkEvent);
                }
            }
            else {
                var chunkEvent = event.clone();
                chunkEvent.startMoment = event.startMoment.clone();
                chunkEvent.endMoment = event.endMoment.clone();
                chunkEvents.push(chunkEvent);
            }
        });
        return chunkEvents;
    };
    return Month;
}(View));
var monthView = new Month();
var ContextPanelTemplateRenderer = /** @class */ (function () {
    function ContextPanelTemplateRenderer() {
    }
    return ContextPanelTemplateRenderer;
}());
var templateRenderer$5 = new ContextPanelTemplateRenderer();
var ContextPanel = /** @class */ (function () {
    function ContextPanel() {
        this.templateRenderer = templateRenderer$5;
    }
    ContextPanel.prototype.render = function (component) {
        if (!component.showContextPanel) {
            return;
        }
        return this.renderContextPanel(component);
    };
    ContextPanel.prototype.renderContextPanel = function (component) {
        return (h("div", { class: 'context-panel-container' }, h("div", { class: 'context-panel-wrapper' }, this.renderHeader(component), this.renderBody(component))));
    };
    ContextPanel.prototype.renderHeader = function (component) {
        return (h("div", { class: 'context-panel-header' }, h("div", { class: 'context-date' }, component.contextMoment.format('DD MMM, YYYY'))));
    };
    ContextPanel.prototype.renderBody = function (component) {
        return (h("div", { class: 'context-panel-body' }, this.renderContextDateEvents(component)));
    };
    ContextPanel.prototype.renderContextDateEvents = function (component) {
        var eventsDOM = [];
        var events = this.getContextDateEvents(component);
        if (events.length > 0) {
            events.forEach(function (event) {
                eventsDOM.push(h("div", { class: 'context-panel-event', style: { 'border-left-color': event.borderColor }, onClick: function () {
                        component.eventClick.emit({
                            event: event.rawEvent,
                            isContextPanel: true
                        });
                    } }, h("div", { class: 'context-panel-event-header' }, h("div", { class: 'event-time' }, event.startMoment.format(INTERNAL_FORMAT.DISPLAY_TIME), " - ", event.endMoment.format(INTERNAL_FORMAT.DISPLAY_TIME))), h("div", { class: 'context-panel-event-body' }, h("div", { class: 'event-title' }, event.title), h("div", { class: 'event-description' }, event.description))));
            });
            return eventsDOM;
        }
        return (h("div", { class: 'no-events' }, "No Events"));
    };
    ContextPanel.prototype.getContextDateEvents = function (component) {
        var contextStartMoment = component.contextMoment.clone().startOf('day');
        var contextEndMoment = component.contextMoment.clone().endOf('day');
        var events = component.eventStore.getEventsBetween(contextStartMoment.clone(), contextEndMoment.clone());
        this.chopEvents(component, events, contextStartMoment, contextEndMoment);
        return __spreadArrays(events);
    };
    ContextPanel.prototype.chopEvents = function (_component, events, contextStartMoment, contextEndMoment) {
        events.forEach(function (event) {
            if (event.startMoment.isBefore(contextStartMoment)) {
                event.startMoment = contextStartMoment.clone();
            }
            if (event.endMoment.isAfter(contextEndMoment)) {
                event.endMoment = contextEndMoment.clone();
            }
        });
    };
    return ContextPanel;
}());
var contextPanel = new ContextPanel();
var EditEvent = /** @class */ (function () {
    function EditEvent() {
    }
    EditEvent.prototype.render = function (component) {
        if (!component.selectedEvent) {
            return;
        }
        return this.renderEditEventModal(component);
    };
    EditEvent.prototype.renderEditEventModal = function (component) {
        return (h("div", { class: 'event-edit-container' }, h("div", { class: 'event-edit-wrapper', style: { 'border-top-color': component.selectedEvent.borderColor } }, this.renderHeader(component), this.renderBody(component), this.renderFooter(component))));
    };
    EditEvent.prototype.renderFooter = function (component) {
        return (h("div", { class: 'event-edit-footer' }, h("button", { class: 'sm-button', onClick: function () {
                component.selectedEvent = null;
            } }, "Cancel"), h("button", { class: 'sm-button primary flat ok-button', onClick: function () {
                component.eventUpdate.emit({
                    event: component.selectedEvent.rawEvent,
                    updatedValues: {
                        start: component.selectedEvent.originalStartMoment.format(INTERNAL_FORMAT.DATE_TIME),
                        end: component.selectedEvent.originalEndMoment.format(INTERNAL_FORMAT.DATE_TIME)
                    }
                });
                component.selectedEvent = null;
            } }, "Ok")));
    };
    EditEvent.prototype.renderHeader = function (component) {
        return (h("div", { class: 'event-edit-header' }, component.selectedEvent.title, h("div", { class: 'close', onClick: function () {
                component.selectedEvent = null;
            } }, "X")));
    };
    EditEvent.prototype.renderBody = function (component) {
        return (h("div", { class: 'event-edit-body' }, h("div", { class: 'form-row' }, h("label", { class: 'form-label' }, "Start time"), h("div", { class: 'form-element date-time-picker' }, h("div", { class: 'date-picker' }, h("sm-date-picker", { onDateSelected: function (payload) {
                component.selectedEvent.originalStartMoment = moment$1(payload.detail + ' ' + component.selectedEvent.originalStartMoment.format(INTERNAL_FORMAT.TIME));
            }, theme: component.theme, date: component.selectedEvent.originalStartMoment.format(INTERNAL_FORMAT.DATE), "week-start-day": component.weekStartDay })), h("div", { class: 'time-picker' }, h("sm-time-picker", { onTimeSelected: function (payload) {
                component.selectedEvent.originalStartMoment.hour(payload.detail.hour);
                component.selectedEvent.originalStartMoment.minute(payload.detail.minute);
            }, hour: component.selectedEvent.originalStartMoment.hour(), minute: component.selectedEvent.originalStartMoment.minute() })))), h("div", { class: 'form-row' }, h("label", { class: 'form-label' }, "End time"), h("div", { class: 'form-element date-time-picker' }, h("div", { class: 'date-picker' }, h("sm-date-picker", { onDateSelected: function (payload) {
                component.selectedEvent.originalEndMoment = moment$1(payload.detail + ' ' + component.selectedEvent.originalEndMoment.format(INTERNAL_FORMAT.TIME));
            }, theme: component.theme, date: component.selectedEvent.originalEndMoment.format(INTERNAL_FORMAT.DATE), "week-start-day": component.weekStartDay })), h("div", { class: 'time-picker' }, h("sm-time-picker", { onTimeSelected: function (payload) {
                component.selectedEvent.originalEndMoment.hour(payload.detail.hour);
                component.selectedEvent.originalEndMoment.minute(payload.detail.minute);
            }, hour: component.selectedEvent.originalEndMoment.hour(), minute: component.selectedEvent.originalEndMoment.minute() }))))));
    };
    return EditEvent;
}());
var editEvent = new EditEvent();
var Calendar = /** @class */ (function () {
    function Calendar() {
    }
    Calendar.prototype.getViewRenderer = function (component) {
        if (component.view === VIEWS.day)
            return dayView;
        else if (component.view === VIEWS.week)
            return weekView;
        else if (component.view === VIEWS.month)
            return monthView;
    };
    Calendar.prototype.render = function (component) {
        component.viewRenderer = this.getViewRenderer(component);
        component.contextPanel = contextPanel;
        var startMoment = component.startMoment, endMoment = component.endMoment;
        component.viewRange = {};
        component.viewRange.dates = component.viewRenderer.getDatesInViewRange(startMoment, endMoment);
        component.viewRange.events = component.viewRenderer.getEventsInViewRange(component);
        return (h("div", { class: 'sm-calendar-container', style: { '--header-height': '50px' } }, h("header", { class: 'sm-calendar-header' }, header.render(component)), h("div", { class: 'sm-calendar-body' }, component.viewRenderer.render(component), component.contextPanel.render(component)), h("div", { class: 'sm-calendar-other' }, editEvent.render(component))));
    };
    return Calendar;
}());
var calendar = new Calendar();
var CalendarEvent = /** @class */ (function () {
    /**
     *
     * @param rawEvent
     * @param timezone
     */
    function CalendarEvent(rawEvent, timezone) {
        if (timezone === void 0) { timezone = 'GMT'; }
        this.isMultiDay = false;
        this.chunks = [];
        this.id = rawEvent.id || this.generateId();
        this.title = rawEvent.title;
        this.description = rawEvent.description;
        this.start = rawEvent.start;
        this.end = rawEvent.end;
        this.text_color = rawEvent.text_color;
        this.background = rawEvent.background;
        this.timezone = timezone;
        this.rawEvent = rawEvent;
        if (INTERNAL_DATE_TIME_REGEX.test(this.start)) {
            this.startMoment = moment$1.tz(rawEvent.start, INTERNAL_FORMAT.DATE_TIME, true, timezone);
            this.originalStartMoment = this.startMoment.clone();
        }
        if (INTERNAL_DATE_TIME_REGEX.test(this.end)) {
            this.endMoment = moment$1.tz(rawEvent.end, INTERNAL_FORMAT.DATE_TIME, true, timezone);
            this.originalEndMoment = this.endMoment.clone();
        }
        if (!this.startMoment.isSame(this.endMoment, 'day')) {
            this.isMultiDay = true;
        }
        if (this.background && !this.text_color) {
            this.text_color = negate(this.background);
        }
        if (this.text_color && !this.background) {
            this.background = negate(this.text_color);
        }
        if (this.background) {
            this.borderColor = darken(this.background, 0.2);
        }
    }
    CalendarEvent.prototype.clone = function () {
        return new CalendarEvent(this.rawEvent, this.timezone);
    };
    /**
     *
     */
    CalendarEvent.prototype.generateId = function () {
        return Math.floor(100000000 + Math.random() * 900000000) + '';
    };
    return CalendarEvent;
}());
var EventStore = /** @class */ (function () {
    function EventStore() {
        this.events = [];
    }
    EventStore.prototype.addEvent = function (rawEvent, timezone) {
        this.events.push(new CalendarEvent(rawEvent, timezone));
    };
    EventStore.prototype.flush = function () {
        this.events = [];
    };
    /**
     *
     * @param rawEvents
     * @param timezone
     */
    EventStore.prototype.parseEvents = function (rawEvents, timezone) {
        var _this = this;
        if (rawEvents === void 0) { rawEvents = []; }
        this.flush();
        rawEvents.forEach(function (rawEvent) {
            _this.addEvent(rawEvent, timezone);
        });
    };
    /**
     *
     * @param startMoment
     * @param endMoment
     */
    EventStore.prototype.getEventsBetween = function (startMoment, endMoment) {
        var events = [];
        this.events.forEach(function (event) {
            if (!(event.startMoment.valueOf() > endMoment.valueOf() || event.endMoment.valueOf() < startMoment.valueOf() || event.endMoment.valueOf() === startMoment.valueOf())) {
                events.push(event.clone());
            }
        });
        return events.sort(function (a, b) { return a.startMoment.diff(b.startMoment); });
    };
    return EventStore;
}());
var eventStore = new EventStore();
var SmCalendar = /** @class */ (function () {
    function SmCalendar(hostRef) {
        registerInstance(this, hostRef);
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
        this.eventClick = createEvent(this, "eventClick", 7);
        this.cellClick = createEvent(this, "cellClick", 7);
        this.viewChange = createEvent(this, "viewChange", 7);
        this.eventUpdate = createEvent(this, "eventUpdate", 7);
    }
    /**
     * life cycle methods
     */
    SmCalendar.prototype.componentWillLoad = function () {
        this.eventStore.parseEvents(this.events, this.timezone);
        this.updateView();
    };
    /**
     * watchers
     */
    SmCalendar.prototype.handleContextDateChange = function () {
        this.contextMoment = moment(this.contextDate, INTERNAL_FORMAT.DATE, this.timezone);
        this.updateView();
    };
    SmCalendar.prototype.handleViewChange = function () {
        this.updateView();
    };
    SmCalendar.prototype.handleEventsChange = function () {
        this.eventStore.parseEvents(this.events, this.timezone);
    };
    /**
     *
     * Listners
     */
    SmCalendar.prototype.handleClick = function (mouseEvent) {
        var path = mouseEvent.composedPath ? mouseEvent.composedPath() : mouseEvent.path;
        var clickedInsideDatePicker = false;
        for (var i = 0; i < path.length; i++) {
            if (path[i].classList && path[i].classList.contains('sm-date-picker')) {
                clickedInsideDatePicker = true;
                break;
            }
        }
        if (!clickedInsideDatePicker) {
            var datePickers = this.ref.shadowRoot.querySelectorAll('sm-date-picker');
            datePickers.forEach(function (datePicker) {
                datePicker.showPicker = false;
            });
        }
    };
    /**
     * functions
     */
    SmCalendar.prototype.updateView = function () {
        var viewRange = calendar.getViewRenderer(this).calculateViewRange(this.contextMoment, WEEK_DAYS[this.weekStartDay]);
        this.startMoment = viewRange.startMoment;
        this.endMoment = viewRange.endMoment;
        this.viewChange.emit({
            view: this.view,
            start: this.startMoment.format(INTERNAL_FORMAT.DATE_TIME),
            end: this.endMoment.format(INTERNAL_FORMAT.DATE_TIME)
        });
    };
    /**
     * main renderer
     */
    SmCalendar.prototype.render = function () {
        var componentHeight = this.ref.style.height + '' || 'calc(100vh - 10px)';
        return (h(Host, { style: { '--theme-color': this.theme, '--component-height': componentHeight }, onClick: function () { } }, h("div", { class: 'sm-calendar' }, calendar.render(this))));
    };
    Object.defineProperty(SmCalendar.prototype, "ref", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmCalendar, "watchers", {
        get: function () {
            return {
                "contextDate": ["handleContextDateChange"],
                "view": ["handleViewChange"],
                "events": ["handleEventsChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmCalendar, "style", {
        get: function () { return "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}menu,ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}.sm-button{padding:8px 10px;-webkit-box-shadow:none;box-shadow:none;border:none;font-size:15px;background:transparent;outline:none}.sm-button.primary{color:var(--theme-color)}.sm-button:hover{cursor:pointer;text-decoration:underline}.sm-button.active{background:var(--theme-color);color:#fff}.sm-button.active:hover{text-decoration:none}.sm-button.flat{background:var(--theme-color);color:#fff}.left-triangle{width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid #444}.left-triangle:hover{cursor:pointer}.right-triangle{width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:10px solid #444}.right-triangle:hover{cursor:pointer}.btn-list,.sm-calendar-body{display:-ms-flexbox;display:flex}.sm-calendar-body .view-container{-ms-flex:1;flex:1}.sm-calendar-body .context-panel-container{width:300px;border-left:1px solid #ddd}.sm-calendar-header{width:100%;height:var(--header-height);border-bottom:1px solid #ddd;-webkit-box-shadow:0 0 4px #ddd;box-shadow:0 0 4px #ddd;background:#f2f2f4}.sm-calendar-header .header-container{display:-ms-flexbox;display:flex}.sm-calendar-header .header-container .header-section{-ms-flex:1;flex:1}.sm-calendar-header .header-container .header-section .context-date-label{text-align:center;font-size:18px;font-weight:lighter;padding-top:15px}.sm-calendar-header .header-container .header-section .view-range{text-align:center;font-size:17px;padding-top:14px}.sm-calendar-header .header-container .header-section .view-navigation{margin-top:7px;margin-left:100px}.sm-calendar-header .header-container .header-section .view-navigation .nav-item{display:inline-block;vertical-align:middle;margin-top:6px}.sm-calendar-header .header-container .header-section .view-navigation .nav-item .btn-list{margin-top:-4px}.sm-calendar-header .header-container .header-section .view-navigation .nav-item .date-picker{margin-left:20px}.sm-calendar-header .header-container .header-section .view-navigation .nav-item .today-button{font-weight:lighter;margin:2px 10px 0;font-size:16px}.sm-calendar-header .header-container .header-section .view-navigation .nav-item .today-button:hover{cursor:pointer}.sm-calendar-header .header-container .header-section .view-list{margin-top:7px;float:right;margin-right:25px;display:-ms-flexbox;display:flex;background:#fff;border-radius:3px;border:1px solid #ddd}.sm-calendar-header .header-container .header-section .view-list .view-name{-ms-flex:1;flex:1;padding:8px 15px;height:18px}.sm-calendar-header .header-container .header-section .view-list .view-name:not(:last-child){border-right:1px solid #ddd}.sm-calendar-header .header-container .header-section .view-list .view-name.active{background:var(--theme-color);color:#fff}.sm-calendar-header .header-container .header-section .view-list .view-name:hover{cursor:pointer}.events-wrapper .event{background:#d7e7f0;border:1px solid #78b0cc;word-wrap:break-word;-webkit-box-sizing:border-box;box-sizing:border-box}.events-wrapper .event:hover{cursor:pointer}.view-container.day .view-wrapper .view-header,.view-container.week .view-wrapper .view-header{border-bottom:1px solid #ddd;height:var(--view-header-height);overflow-y:scroll}.view-container.day .view-wrapper .view-header .row,.view-container.week .view-wrapper .view-header .row{display:-ms-flexbox;display:flex}.view-container.day .view-wrapper .view-header .row .empty-left-scale,.view-container.week .view-wrapper .view-header .row .empty-left-scale{width:var(--left-scale-width)}.view-container.day .view-wrapper .view-header .row .item,.view-container.week .view-wrapper .view-header .row .item{-ms-flex:1;flex:1;text-align:center;font-weight:300;overflow:hidden}.view-container.day .view-wrapper .view-header .row .item.context-date .view-header-column .day-date,.view-container.week .view-wrapper .view-header .row .item.context-date .view-header-column .day-date{background:var(--theme-color);color:#fff}.view-container.day .view-wrapper .view-header .row .item.context-date .view-header-column .day-date:hover,.view-container.week .view-wrapper .view-header .row .item.context-date .view-header-column .day-date:hover{opacity:1}.view-container.day .view-wrapper .view-header .row .item.today .view-header-column,.view-container.week .view-wrapper .view-header .row .item.today .view-header-column{border-top:4px solid var(--theme-color)}.view-container.day .view-wrapper .view-header .row .item.today .view-header-column .day-date,.view-container.week .view-wrapper .view-header .row .item.today .view-header-column .day-date{margin-top:6px}.view-container.day .view-wrapper .view-header .row .item .view-header-column,.view-container.week .view-wrapper .view-header .row .item .view-header-column{border-left:1px solid #ddd;height:var(--view-header-height);-webkit-box-sizing:border-box;box-sizing:border-box}.view-container.day .view-wrapper .view-header .row .item .view-header-column .day-name,.view-container.week .view-wrapper .view-header .row .item .view-header-column .day-name{display:inline-block;font-size:15px}.view-container.day .view-wrapper .view-header .row .item .view-header-column .day-date,.view-container.week .view-wrapper .view-header .row .item .view-header-column .day-date{display:inline-block;text-align:center;padding:5px;border-radius:50%;font-weight:600;margin-top:12px;margin-right:10px}.view-container.day .view-wrapper .view-header .row .item .view-header-column .day-date:hover,.view-container.week .view-wrapper .view-header .row .item .view-header-column .day-date:hover{cursor:pointer;background:var(--theme-color);color:#fff;opacity:.4}.view-container.day .view-wrapper .view-body .view-body-relative,.view-container.week .view-wrapper .view-body .view-body-relative{position:relative;overflow:auto;height:calc(var(--component-height) - var(--header-height) - var(--view-header-height) - 10px)}.view-container.day .view-wrapper .view-body .view-body-relative .left-scale,.view-container.week .view-wrapper .view-body .view-body-relative .left-scale{width:var(--left-scale-width)}.view-container.day .view-wrapper .view-body .view-body-relative .left-scale .step-container .step,.view-container.week .view-wrapper .view-body .view-body-relative .left-scale .step-container .step{position:relative;font-size:15px}.view-container.day .view-wrapper .view-body .view-body-relative .left-scale .step-container .step:after,.view-container.week .view-wrapper .view-body .view-body-relative .left-scale .step-container .step:after{content:\" \";position:absolute;top:-1.5px;width:15px;background:#ddd;height:1px;right:0}.view-container.day .view-wrapper .view-body .view-body-relative .left-scale .step-container .step .step-time,.view-container.week .view-wrapper .view-body .view-body-relative .left-scale .step-container .step .step-time{position:absolute;right:20px;top:-9px}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container{width:calc(100% - var(--left-scale-width));position:absolute;top:0;left:calc(var(--left-scale-width))}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative{position:relative}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row{display:-ms-flexbox;display:flex}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row:not(:last-child),.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row:not(:last-child){border-bottom:1px solid #ddd}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item{-ms-flex:1;flex:1;border-left:1px solid #ddd}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item:hover,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item:hover{cursor:crosshair}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event{position:absolute;overflow:hidden}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event .event-container,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event .event-container{padding:5px}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event .event-container .event-title,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event .event-container .event-title{font-size:12px;font-weight:600;margin-bottom:10px}.view-container.day .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event .event-container .event-description,.view-container.week .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event .event-container .event-description{font-size:13px}.view-container.month .view-wrapper .view-header{border-bottom:1px solid #ddd;height:var(--view-header-height);overflow-y:scroll}.view-container.month .view-wrapper .view-header .row{display:-ms-flexbox;display:flex}.view-container.month .view-wrapper .view-header .row .item{-ms-flex:1;flex:1;text-align:center;font-weight:300}.view-container.month .view-wrapper .view-header .row .item:not(:first-child) .view-header-column{border-left:1px solid #ddd}.view-container.month .view-wrapper .view-header .row .item .view-header-column{height:var(--view-header-height)}.view-container.month .view-wrapper .view-header .row .item .view-header-column .day-name{display:inline-block;font-size:15px;padding-top:15px}.view-container.month .view-wrapper .view-body .view-body-relative{position:relative;overflow-y:scroll;height:calc(var(--component-height) - var(--header-height) - var(--view-header-height) - 10px)}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative{position:relative}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row{display:-ms-flexbox;display:flex;border-bottom:1px solid #ddd;-webkit-box-sizing:border-box;box-sizing:border-box}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item{-ms-flex:1;flex:1;overflow:hidden}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item:hover{cursor:crosshair}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item:not(:first-child) .cell-wrapper{border-left:1px solid #ddd;-webkit-box-sizing:border-box;box-sizing:border-box}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item .cell-wrapper .cell-header{text-align:right}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item .cell-wrapper .cell-header .cell-date{border-radius:50%;text-align:center;padding:5px;margin-right:5px;margin-top:5px;display:inline-block}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item .cell-wrapper .cell-header .cell-date:hover{cursor:pointer}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item.grey-out .cell-wrapper .cell-header .cell-date{color:#aaa}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .grid-wrapper .row .item.context-date .cell-wrapper .cell-header .cell-date{background:var(--theme-color);color:#fff!important}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .view-more{position:absolute;font-size:12px;text-decoration:underline}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .view-more:hover{cursor:pointer}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event{position:absolute;overflow:hidden}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event .event-container{padding:3px}.view-container.month .view-wrapper .view-body .view-body-relative .drawing-area-container .drawing-area-container-relative .events-wrapper .event .event-container .event-title{font-size:12px}.context-panel-container .context-panel-wrapper .context-panel-header{border-bottom:1px solid #ddd}.context-panel-container .context-panel-wrapper .context-panel-header .context-date{padding:15px 0;text-align:center;font-size:17px}.context-panel-container .context-panel-wrapper .context-panel-body .no-events{text-align:center;font-size:18px;font-weight:700;margin-top:20px;color:#aaa}.context-panel-container .context-panel-wrapper .context-panel-body .context-panel-event{width:90%;margin:10px auto;border:1px solid #ddd;border-left:3px solid #78b0cc}.context-panel-container .context-panel-wrapper .context-panel-body .context-panel-event:hover{cursor:pointer}.context-panel-container .context-panel-wrapper .context-panel-body .context-panel-event .context-panel-event-header{font-size:14px;margin:5px 10px;border-bottom:1px solid #ddd}.context-panel-container .context-panel-wrapper .context-panel-body .context-panel-event .context-panel-event-header .event-time{font-weight:600;font-size:13px;margin-bottom:5px}.context-panel-container .context-panel-wrapper .context-panel-body .context-panel-event .context-panel-event-body{margin:5px 10px}.context-panel-container .context-panel-wrapper .context-panel-body .context-panel-event .context-panel-event-body .event-title{font-size:14px}.context-panel-container .context-panel-wrapper .context-panel-body .context-panel-event .context-panel-event-body .event-description{margin-top:10px;font-size:14px}.event-edit-container{position:absolute;left:0;top:0;width:100%;height:100vh;background:rgba(0,0,0,.5)}.event-edit-container .event-edit-wrapper{background:#fff;width:450px;margin:100px auto 0;height:250px;padding:10px;border-top:5px solid #78b0cc}.event-edit-container .event-edit-wrapper .event-edit-header{font-size:18px;border-bottom:1px solid #ddd;padding:0 10px 10px 0;font-weight:200}.event-edit-container .event-edit-wrapper .event-edit-header .close{float:right}.event-edit-container .event-edit-wrapper .event-edit-header .close:hover{cursor:pointer}.event-edit-container .event-edit-wrapper .event-edit-body{margin-top:20px}.event-edit-container .event-edit-wrapper .event-edit-body .form-row{margin-top:15px}.event-edit-container .event-edit-wrapper .event-edit-body .form-row .form-label{font-size:15px}.event-edit-container .event-edit-wrapper .event-edit-body .form-row .form-element{margin-top:5px;font-size:14px}.event-edit-container .event-edit-wrapper .event-edit-body .form-row .form-element.date-time-picker{display:-ms-flexbox;display:flex}.event-edit-container .event-edit-wrapper .event-edit-body .form-row .form-element.date-time-picker .date-picker{-ms-flex:1;flex:1}.event-edit-container .event-edit-wrapper .event-edit-body .form-row .form-element.date-time-picker .date-picker sm-date-picker{display:block;width:200px}.event-edit-container .event-edit-wrapper .event-edit-body .form-row .form-element.date-time-picker .time-picker{-ms-flex:1;flex:1}.event-edit-container .event-edit-wrapper .event-edit-body .form-row .form-element.date-time-picker .time-picker sm-time-picker{display:block;width:100px}.event-edit-container .event-edit-wrapper .event-edit-footer{margin-top:20px}.event-edit-container .event-edit-wrapper .event-edit-footer button.ok-button{width:100px;float:right;margin-right:50px}:host{--theme-color:teal}.sm-calendar{font-family:Open Sans,sans-serif;border:1px solid #ddd;-webkit-box-sizing:border-box;box-sizing:border-box}.sm-calendar .clear{clear:both}"; },
        enumerable: true,
        configurable: true
    });
    return SmCalendar;
}());
var INTERNAL_DATE = 'YYYY-MM-DD';
var CONTEXT_DATE = '2019-11-06';
function generateId() {
    return Math.floor(100000000 + Math.random() * 900000000) + '';
}
function getEvent(title, description, start, end, text_color, background) {
    if (text_color === void 0) { text_color = ''; }
    if (background === void 0) { background = ''; }
    return {
        id: generateId(),
        start: start,
        end: end,
        background: background,
        description: description,
        text_color: text_color,
        title: title
    };
}
function generateEvents(contextMoment) {
    var plus1Moment = contextMoment.clone().add(1, 'day').startOf('day');
    //const minus2Moment: Moment = contextMoment.clone().add(-2, 'day').startOf('day');
    var minus7Moment = contextMoment.clone().add(-7, 'day').startOf('day');
    var plus2Moment = contextMoment.clone().add(2, 'day').startOf('day');
    var plus7Moment = contextMoment.clone().add(7, 'day').startOf('day');
    var contextDateEvents = [
        getEvent('event-1', 'sample description', contextMoment.format(INTERNAL_DATE) + ' 08:00:00', contextMoment.format(INTERNAL_DATE) + ' 10:00:00')
    ];
    var plus1DateEvents = [
        getEvent('event-2', 'sample description', plus1Moment.format(INTERNAL_DATE) + ' 08:00:00', plus1Moment.format(INTERNAL_DATE) + ' 10:00:00')
    ];
    var multiDayEvents = [
        getEvent('multi day event-4', 'sample description', minus7Moment.format(INTERNAL_DATE) + ' 08:00:00', plus7Moment.format(INTERNAL_DATE) + ' 10:00:00', '', '#d2e7e3'),
        getEvent('multi day event-5', 'sample description', plus2Moment.format(INTERNAL_DATE) + ' 08:00:00', plus7Moment.format(INTERNAL_DATE) + ' 10:00:00', '', '#e9e1f1'),
        getEvent('multi day event-6', 'sample description', minus7Moment.format(INTERNAL_DATE) + ' 08:00:00', plus7Moment.format(INTERNAL_DATE) + ' 10:00:00', '', '#f3d9d2'),
        getEvent('multi day event-7', 'sample description', plus2Moment.format(INTERNAL_DATE) + ' 08:00:00', plus7Moment.format(INTERNAL_DATE) + ' 10:00:00', '', '#FFECB3')
    ];
    var events = __spreadArrays(contextDateEvents, plus1DateEvents, multiDayEvents);
    return events;
}
function getEvents() {
    var contextMoment = moment$1(CONTEXT_DATE, INTERNAL_DATE);
    return generateEvents(contextMoment);
}
var SmDemoCalendar = /** @class */ (function () {
    function SmDemoCalendar(hostRef) {
        registerInstance(this, hostRef);
        this.weekStartDay = 'sun';
        this.events = getEvents();
        this.contextDate = CONTEXT_DATE;
    }
    SmDemoCalendar.prototype.componentDidLoad = function () {
        setTimeout(function () {
            //this.events = [...this.events, this.events[0]];
        }, 2000);
    };
    SmDemoCalendar.prototype.render = function () {
        var _this = this;
        return (h("div", { class: 'sm-demo-calendar' }, h("sm-calendar", { events: this.events, view: "month", "context-date": this.contextDate, onViewChange: function (_payload) {
                //console.log(_payload.detail);
            }, onEventClick: function (_payload) {
                console.log(_payload.detail);
            }, onCellClick: function (_payload) {
                var newEvent = getEvent('new event', 'sample description', _payload.detail.from, _payload.detail.to);
                _this.events = __spreadArrays(_this.events, [newEvent]);
                console.log(_payload.detail);
            }, onEventUpdate: function (payload) {
                var updateEvent = payload.detail.event;
                var _a = payload.detail.updatedValues, start = _a.start, end = _a.end;
                var eventsBackUp = _this.events;
                eventsBackUp.forEach(function (event) {
                    // @ts-ignore
                    if (event.id === updateEvent.id) {
                        // @ts-ignore
                        event.start = start;
                        // @ts-ignore
                        event.end = end;
                    }
                });
                _this.events = __spreadArrays(eventsBackUp);
            } })));
    };
    Object.defineProperty(SmDemoCalendar, "style", {
        get: function () { return "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}menu,ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}body{margin:0;padding:0}"; },
        enumerable: true,
        configurable: true
    });
    return SmDemoCalendar;
}());
export { SmCalendar as sm_calendar, SmDemoCalendar as sm_demo_calendar };
