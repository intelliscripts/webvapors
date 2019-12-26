'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-79884c17.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.bootstrapLazy([["sm-date-picker.cjs",[[1,"sm-date-picker",{"weekStartDay":[1537,"week-start-day"],"date":[1537],"showPicker":[1540,"show-picker"],"theme":[1537],"label":[1537],"pickerView":[32],"contextMoment":[32],"navMoment":[32]}]]],["sm-time-picker.cjs",[[1,"sm-time-picker",{"theme":[1537],"hour":[1538],"minute":[1538],"showPicker":[1540,"show-picker"],"isTwelveHourFormat":[1540,"is-twelve-hour-format"],"meridian":[1537],"pickerView":[32],"contextHour":[32],"contextMinute":[32]}]]],["sm-calendar_2.cjs",[[1,"sm-demo-calendar",{"weekStartDay":[32],"events":[32],"contextDate":[32]}],[1,"sm-calendar",{"theme":[1537],"contextDate":[1537,"context-date"],"availableViews":[1040],"view":[1537],"timezone":[1537],"weekStartDay":[1537,"week-start-day"],"events":[1040],"showContextPanel":[1540,"show-context-panel"],"contextMoment":[32],"startMoment":[32],"endMoment":[32],"eventStore":[32],"selectedEvent":[32]},[[2,"click","handleClick"]]]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
