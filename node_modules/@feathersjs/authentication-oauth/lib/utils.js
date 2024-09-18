"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultSettings = void 0;
const getDefaultSettings = (_app, other) => {
    const defaults = Object.assign({ linkStrategy: 'jwt' }, other);
    return defaults;
};
exports.getDefaultSettings = getDefaultSettings;
//# sourceMappingURL=utils.js.map