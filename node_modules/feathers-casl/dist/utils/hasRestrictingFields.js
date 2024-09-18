"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extra_1 = require("@casl/ability/extra");
const getMinimalFields_1 = __importDefault(require("./getMinimalFields"));
function areSameArray(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    }
    const arr1test = arr1.slice().sort();
    const arr2test = arr2.slice().sort();
    const result = !arr1test.some((val, idx) => val !== arr2test[idx]);
    return result;
}
const hasRestrictingFields = (ability, action, subject, options) => {
    let fields;
    if (typeof subject !== "string") {
        fields = (0, getMinimalFields_1.default)(ability, action, subject, {
            availableFields: options.availableFields,
            checkCan: false
        });
    }
    else {
        const permittedFieldsOfOptions = {
            fieldsFrom: (rule) => {
                return rule.fields || options.availableFields || [];
            }
        };
        fields = (0, extra_1.permittedFieldsOf)(ability, action, subject, permittedFieldsOfOptions);
    }
    if (fields.length === 0 && !options.availableFields) {
        return false;
    }
    if (fields.length > 0) {
        // check if fields is restricting at all or just complete array
        if (options.availableFields === fields ||
            (options.availableFields && areSameArray(fields, options.availableFields))) {
            // arrays are the same -> no restrictions
            return false;
        }
        else {
            return fields;
        }
    }
    return true;
};
exports.default = hasRestrictingFields;
