"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ability_1 = require("@casl/ability");
function makeAbilityFromRules(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
rules, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
options) {
    rules = rules || [];
    options = options || {};
    return new ability_1.Ability(rules, options);
}
exports.default = makeAbilityFromRules;
