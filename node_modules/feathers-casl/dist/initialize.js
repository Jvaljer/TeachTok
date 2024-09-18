"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorize_hook_utils_1 = require("./hooks/authorize/authorize.hook.utils");
const channels_utils_1 = require("./channels/channels.utils");
exports.default = (options) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (options === null || options === void 0 ? void 0 : options.version) {
        // asserts that you call app.configure(casl({})) instead of app.configure(casl)
        throw new Error("You passed 'feathers-casl' to app.configure() without a function. You probably wanted to call app.configure(casl({}))!");
    }
    options = {
        defaultAdapter: (options === null || options === void 0 ? void 0 : options.defaultAdapter) || "feathers-memory",
        authorizeHook: (0, authorize_hook_utils_1.makeDefaultOptions)(options === null || options === void 0 ? void 0 : options.authorizeHook),
        channels: (0, channels_utils_1.makeDefaultOptions)(options === null || options === void 0 ? void 0 : options.channels)
    };
    return (app) => {
        if (app.get("casl")) {
            return;
        }
        app.set("casl", options);
    };
};
