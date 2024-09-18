"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const invertedMap = {
    "$gt": "$lte",
    "$gte": "$lt",
    "$lt": "$gte",
    "$lte": "$gt",
    "$in": "$nin",
    "$nin": "$in",
    "$ne": (prop) => {
        return prop["$ne"];
    }
};
const supportedOperators = Object.keys(invertedMap);
const invertedProp = (prop, name) => {
    const map = invertedMap[name];
    if (typeof map === "string") {
        return { [map]: prop[name] };
    }
    else if (typeof map === "function") {
        return map(prop);
    }
};
const convertRuleToQuery = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
rule, options) => {
    const { conditions, inverted } = rule;
    if (!conditions) {
        if (inverted && (options === null || options === void 0 ? void 0 : options.actionOnForbidden)) {
            options.actionOnForbidden();
        }
        return undefined;
    }
    if (inverted) {
        const newConditions = {};
        for (const prop in conditions) {
            if ((0, isPlainObject_1.default)(conditions[prop])) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const obj = conditions[prop];
                for (const name in obj) {
                    if (!supportedOperators.includes(name)) {
                        console.error(`CASL: not supported property: ${name}`);
                        continue;
                    }
                    newConditions[prop] = invertedProp(obj, name);
                }
            }
            else {
                newConditions[prop] = { $ne: conditions[prop] };
            }
        }
        return newConditions;
    }
    else {
        return conditions;
    }
};
exports.default = convertRuleToQuery;
