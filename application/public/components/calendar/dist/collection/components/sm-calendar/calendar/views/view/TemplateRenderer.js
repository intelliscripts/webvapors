import { h } from "@stencil/core";
export class TemplateRenderer {
    eventContainer(event) {
        return (h("div", { class: "event-container" },
            h("div", { class: "event-title" }, event.title)));
    }
}
export default new TemplateRenderer();
