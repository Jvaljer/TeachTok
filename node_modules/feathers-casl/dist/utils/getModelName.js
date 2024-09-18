"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getModelName = (modelName, context) => {
    if (modelName === undefined) {
        return context.path;
    }
    if (typeof modelName === "string") {
        return modelName;
    }
    if (typeof modelName === "function") {
        return modelName(context);
    }
    throw new Error("feathers-casl: 'modelName' is not a string or function");
};
exports.default = getModelName;
