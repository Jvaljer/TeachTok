"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelName = exports.getContextPath = void 0;
const getContextPath = (context) => {
    return context.path;
};
exports.getContextPath = getContextPath;
const getModelName = (context) => {
    const { service } = context;
    const modelName = service.modelName || (service.Model && service.Model.name);
    return modelName;
};
exports.getModelName = getModelName;
