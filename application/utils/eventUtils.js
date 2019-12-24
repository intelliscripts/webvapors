var moment = require('moment-timezone');

const INTERNAL_DATE_TIME = 'YYYY-MM-DD HH:mm:ss';
const CONTEXT_DATE = new moment().format('YYYY-MM-DD');

function generateId() {
    return Math.floor(100000000 + Math.random() * 900000000) + '';
}

function getEvent(title, description, start, end, text_color, bg_color) {
    return{
        id: generateId(),
        start: start,
        end: end,
        bg_color: bg_color,
        description: description,
        text_color: text_color,
        title: title
    };
}

let eventsCount = 0;
const colors = ['#d2e7e3', '#e9e1f1', '#f3d9d2', '#FFECB3'];

function generateEventsForDate(dateMoment) {
    const dateMoment1 = dateMoment.clone();
    const events = [
    getEvent('event-' + eventsCount++, 'sample description', dateMoment1.add(1, 'hours').format(INTERNAL_DATE_TIME), dateMoment1.clone().add(5, 'hours').format(INTERNAL_DATE_TIME), '', colors[0]),
    getEvent('event-' + eventsCount++, 'sample description', dateMoment1.add(7, 'hours').format(INTERNAL_DATE_TIME), dateMoment1.clone().add(8, 'hours').format(INTERNAL_DATE_TIME), '', colors[1]),
        getEvent('event-' + eventsCount++, 'sample description', dateMoment1.add(5, 'hours').format(INTERNAL_DATE_TIME), dateMoment1.clone().add(8, 'hours').format(INTERNAL_DATE_TIME), '', colors[2]),
        ];
    return events;
}

function generateEventsForMonth(contextMoment) {
    let events = [];

    const monthStart = contextMoment.clone().startOf('month').add(7, 'days');


    events = events.concat(generateEventsForDate(monthStart));

    monthStart.add(2, 'days');
    events = events.concat(generateEventsForDate(monthStart));

    monthStart.add(3, 'days');
    events = events.concat(generateEventsForDate(monthStart));

    monthStart.add(3, 'days');
    events = events.concat(generateEventsForDate(monthStart));

    monthStart.add(2, 'days');
    events = events.concat(generateEventsForDate(monthStart));

    monthStart.add(3, 'days');
    events = events.concat(generateEventsForDate(monthStart));

    monthStart.add(4, 'days');
    events = events.concat(generateEventsForDate(monthStart));

    return events;
}

function generateEvents(contextMoment) {

    eventsCount = 1;
    return [
        ...generateEventsForMonth(contextMoment),
        ...generateEventsForMonth(contextMoment.add(1, 'month')),
        ...generateEventsForMonth(contextMoment.add(1, 'month')),
        ...generateEventsForMonth(contextMoment.add(1, 'month')),
        ...generateEventsForMonth(contextMoment.add(1, 'month')),
        ...generateEventsForMonth(contextMoment.add(1, 'month')),
        ...generateEventsForMonth(contextMoment.add(1, 'month')),
        ...generateEventsForMonth(contextMoment.add(-7, 'month')),
        ...generateEventsForMonth(contextMoment.add(-1, 'month')),
        ...generateEventsForMonth(contextMoment.add(-1, 'month')),
        ...generateEventsForMonth(contextMoment.add(-1, 'month')),
        ...generateEventsForMonth(contextMoment.add(-1, 'month')),
        ...generateEventsForMonth(contextMoment.add(-1, 'month')),
    ]
}

function getEvents() {
    const contextMoment = moment(CONTEXT_DATE, INTERNAL_DATE_TIME);
    return generateEvents(contextMoment);
}

module.exports = getEvents;