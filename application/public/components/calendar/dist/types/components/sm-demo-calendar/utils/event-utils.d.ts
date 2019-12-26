export declare const CONTEXT_DATE: string;
export declare function getEvent(title: string, description: string, start: string, end: string, text_color?: string, background?: string): {
    id: string;
    start: string;
    end: string;
    background: string;
    description: string;
    text_color: string;
    title: string;
};
export declare function getEvents(): object[];
