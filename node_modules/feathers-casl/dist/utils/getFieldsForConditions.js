"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFieldsForConditions = (ability, action, modelName) => {
    const rules = ability.possibleRulesFor(action, modelName);
    const allFields = [];
    for (const rule of rules) {
        if (!rule.conditions) {
            continue;
        }
        const fields = Object.keys(rule.conditions);
        fields.forEach(field => {
            if (!allFields.includes(field)) {
                allFields.push(field);
            }
        });
    }
    return allFields;
};
exports.default = getFieldsForConditions;
