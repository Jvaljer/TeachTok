"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function couldHaveRestrictingFields(ability, action, subjectType) {
    return ability.possibleRulesFor(action, subjectType).some(rule => {
        return !!rule.fields;
    });
}
exports.default = couldHaveRestrictingFields;
