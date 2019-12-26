/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from './stencil.core';


export namespace Components {
  interface SmCalendar {
    /**
    * availableViews
    */
    'availableViews': Array<string>;
    /**
    * contextDate
    */
    'contextDate': string;
    /**
    * events
    */
    'events': Array<object>;
    /**
    * showContextPanel
    */
    'showContextPanel': boolean;
    /**
    * Theme
    */
    'theme': string;
    /**
    * timezone
    */
    'timezone': string;
    /**
    * view
    */
    'view': string;
    /**
    * weekStartDay
    */
    'weekStartDay': string;
  }
  interface SmDatePicker {
    /**
    * date
    */
    'date': string;
    /**
    * label
    */
    'label': string;
    /**
    * showPicker
    */
    'showPicker': boolean;
    /**
    * Theme
    */
    'theme': string;
    /**
    * weekStartDay
    */
    'weekStartDay': string;
  }
  interface SmDemoCalendar {}
  interface SmTimePicker {
    /**
    * hour
    */
    'hour': number;
    /**
    * isTwelveHourFormat
    */
    'isTwelveHourFormat': boolean;
    /**
    * meridian
    */
    'meridian': string;
    /**
    * minute
    */
    'minute': number;
    /**
    * showPicker
    */
    'showPicker': boolean;
    /**
    * Theme
    */
    'theme': string;
  }
}

declare global {


  interface HTMLSmCalendarElement extends Components.SmCalendar, HTMLStencilElement {}
  var HTMLSmCalendarElement: {
    prototype: HTMLSmCalendarElement;
    new (): HTMLSmCalendarElement;
  };

  interface HTMLSmDatePickerElement extends Components.SmDatePicker, HTMLStencilElement {}
  var HTMLSmDatePickerElement: {
    prototype: HTMLSmDatePickerElement;
    new (): HTMLSmDatePickerElement;
  };

  interface HTMLSmDemoCalendarElement extends Components.SmDemoCalendar, HTMLStencilElement {}
  var HTMLSmDemoCalendarElement: {
    prototype: HTMLSmDemoCalendarElement;
    new (): HTMLSmDemoCalendarElement;
  };

  interface HTMLSmTimePickerElement extends Components.SmTimePicker, HTMLStencilElement {}
  var HTMLSmTimePickerElement: {
    prototype: HTMLSmTimePickerElement;
    new (): HTMLSmTimePickerElement;
  };
  interface HTMLElementTagNameMap {
    'sm-calendar': HTMLSmCalendarElement;
    'sm-date-picker': HTMLSmDatePickerElement;
    'sm-demo-calendar': HTMLSmDemoCalendarElement;
    'sm-time-picker': HTMLSmTimePickerElement;
  }
}

declare namespace LocalJSX {
  interface SmCalendar {
    /**
    * availableViews
    */
    'availableViews'?: Array<string>;
    /**
    * contextDate
    */
    'contextDate'?: string;
    /**
    * events
    */
    'events'?: Array<object>;
    'onCellClick'?: (event: CustomEvent<any>) => void;
    /**
    * Events
    */
    'onEventClick'?: (event: CustomEvent<any>) => void;
    'onEventUpdate'?: (event: CustomEvent<any>) => void;
    'onViewChange'?: (event: CustomEvent<any>) => void;
    /**
    * showContextPanel
    */
    'showContextPanel'?: boolean;
    /**
    * Theme
    */
    'theme'?: string;
    /**
    * timezone
    */
    'timezone'?: string;
    /**
    * view
    */
    'view'?: string;
    /**
    * weekStartDay
    */
    'weekStartDay'?: string;
  }
  interface SmDatePicker {
    /**
    * date
    */
    'date'?: string;
    /**
    * label
    */
    'label'?: string;
    'onDateSelected'?: (event: CustomEvent<any>) => void;
    /**
    * showPicker
    */
    'showPicker'?: boolean;
    /**
    * Theme
    */
    'theme'?: string;
    /**
    * weekStartDay
    */
    'weekStartDay'?: string;
  }
  interface SmDemoCalendar {}
  interface SmTimePicker {
    /**
    * hour
    */
    'hour'?: number;
    /**
    * isTwelveHourFormat
    */
    'isTwelveHourFormat'?: boolean;
    /**
    * meridian
    */
    'meridian'?: string;
    /**
    * minute
    */
    'minute'?: number;
    'onTimeSelected'?: (event: CustomEvent<any>) => void;
    /**
    * showPicker
    */
    'showPicker'?: boolean;
    /**
    * Theme
    */
    'theme'?: string;
  }

  interface IntrinsicElements {
    'sm-calendar': SmCalendar;
    'sm-date-picker': SmDatePicker;
    'sm-demo-calendar': SmDemoCalendar;
    'sm-time-picker': SmTimePicker;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'sm-calendar': LocalJSX.SmCalendar & JSXBase.HTMLAttributes<HTMLSmCalendarElement>;
      'sm-date-picker': LocalJSX.SmDatePicker & JSXBase.HTMLAttributes<HTMLSmDatePickerElement>;
      'sm-demo-calendar': LocalJSX.SmDemoCalendar & JSXBase.HTMLAttributes<HTMLSmDemoCalendarElement>;
      'sm-time-picker': LocalJSX.SmTimePicker & JSXBase.HTMLAttributes<HTMLSmTimePickerElement>;
    }
  }
}


