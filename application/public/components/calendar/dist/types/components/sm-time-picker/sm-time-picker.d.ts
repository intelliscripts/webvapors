import { EventEmitter } from '../../stencil.core';
export declare class SmTimePicker {
    /**
     * Theme
     */
    theme: string;
    /**
     * hour
     */
    hour: number;
    /**
     * minute
     */
    minute: number;
    /**
     * showPicker
     */
    showPicker: boolean;
    /**
     * isTwelveHourFormat
     */
    isTwelveHourFormat: boolean;
    /**
     * meridian
     */
    meridian: string;
    pickerView: string;
    contextHour: number;
    contextMinute: number;
    handleShowPickerChange(): void;
    timeSelected: EventEmitter;
    render(): any;
}
