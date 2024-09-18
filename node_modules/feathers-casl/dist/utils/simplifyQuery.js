"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const simplifyQuery = (query, replaceAnd = true, replaceOr = true) => {
    if (!query.$and && !query.$or) {
        return query;
    }
    let result = (0, cloneDeep_1.default)(query);
    if (result.$and && !result.$and.length) {
        delete result.$and;
    }
    if (result.$or && !result.$or.length) {
        delete result.$or;
    }
    /*if (result.$and && result.$or) {
      const or = (result.$or.length > 1) ? { $or: result.$or } : result.$or[0];
      result.$and.push(or);
      delete result.$or;
    }*/
    if (result.$and) {
        const $and = [];
        result.$and.forEach(q => {
            q = simplifyQuery(q, true, true);
            if ($and.some(x => (0, isEqual_1.default)(x, q)))
                return;
            $and.push(q);
        });
        if (replaceAnd && $and.length === 1 && Object.keys(result).length === 1) {
            result = $and[0];
        }
        else {
            result.$and = $and;
        }
    }
    if (result.$or) {
        const $or = [];
        result.$or.forEach(q => {
            q = simplifyQuery(q, true, true);
            if ($or.some(x => (0, isEqual_1.default)(x, q)))
                return;
            $or.push(q);
        });
        if (replaceOr && $or.length === 1 && Object.keys(result).length === 1) {
            result = $or[0];
        }
        else {
            result.$or = $or;
        }
    }
    return result;
};
exports.default = simplifyQuery;
