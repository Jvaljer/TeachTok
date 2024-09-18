"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ability_1 = require("@casl/ability");
const feathers_utils_1 = require("feathers-utils");
const getMinimalFields = (ability, action, subject, options) => {
    var _a;
    if (options.checkCan && !ability.can(action, subject)) {
        return [];
    }
    const subjectType = (0, ability_1.detectSubjectType)(subject);
    const rules = ability.possibleRulesFor(action, subjectType).filter(rule => {
        const { fields } = rule;
        const matched = rule.matchesConditions(subject);
        return fields && matched;
    });
    if (rules.length === 0) {
        return options.availableFields || [];
    }
    let fields;
    if (options.availableFields) {
        fields = options.availableFields;
    }
    else {
        fields = (_a = rules.find(x => !x.inverted)) === null || _a === void 0 ? void 0 : _a.fields;
        if (!fields) {
            return [];
        }
    }
    rules.forEach(rule => {
        if (rule.inverted) {
            fields = fields.filter(x => !rule.fields.includes(x));
        }
        else {
            fields = (0, feathers_utils_1.mergeArrays)(fields, rule.fields, "intersect");
        }
    });
    return fields;
};
exports.default = getMinimalFields;
