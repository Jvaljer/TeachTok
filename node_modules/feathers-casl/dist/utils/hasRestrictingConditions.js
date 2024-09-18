"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasRestrictingConditions = (ability, action, modelName) => {
    const rules = ability.possibleRulesFor(action, modelName);
    const hasConditions = rules.length === 0 || rules.some(x => !!x.conditions);
    return (hasConditions) ? rules : false;
};
exports.default = hasRestrictingConditions;
