import { EventEmitter } from '../../stencil.core';
import { Moment } from 'moment-timezone';
export declare class SmDatePicker {
    /**
     * weekStartDay
     */
    weekStartDay: string;
    /**
     * date
     */
    date: string;
    /**
     * showPicker
     */
    showPicker: boolean;
    /**
     * Theme
     */
    theme: string;
    pickerView: string;
    contextMoment: Moment;
    navMoment: Moment;
    /**
     * label
     */
    label: string;
    handleDateChange(date: string): void;
    handleContextMomentChange(contextMoment: Moment): void;
    handleShowPickerChange(): void;
    dateSelected: EventEmitter;
    render(): any;
}
