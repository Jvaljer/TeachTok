"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAvailableFields = (context, options) => {
    return (!(options === null || options === void 0 ? void 0 : options.availableFields))
        ? undefined
        : (typeof options.availableFields === "function")
            ? options.availableFields(context)
            : options.availableFields;
};
exports.default = getAvailableFields;
