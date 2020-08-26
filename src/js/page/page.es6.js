'use strict';

class Page {
    static async renderComponent(component, parentElement) {
        if (typeof component.renderIn === "undefined") {
            throw new Error(`Method renderIn was not found in ${component.__proto__.constructor.name}`);
        }

        await component.renderIn(parentElement);
    }
}

export default Page;
