import { TemplateRenderer } from "../view/TemplateRenderer";
import { h } from "@stencil/core";
import { INTERNAL_FORMAT } from "../../constants";
export class ColumnTemplateRenderer extends TemplateRenderer {
    constructor() {
        super();
    }
    eventContainer(event) {
        const start = event.startMoment.format(INTERNAL_FORMAT.DISPLAY_TIME);
        const end = event.endMoment.format(INTERNAL_FORMAT.DISPLAY_TIME);
        return (h("div", { class: "event-container" },
            h("div", { class: "event-title" },
                h("span", null,
                    start,
                    " - ",
                    end),
                h("br", null),
                event.title),
            h("div", { class: "event-description" }, event.description)));
    }
}
export default new ColumnTemplateRenderer();
