"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@feathersjs/errors");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const pick_1 = __importDefault(require("lodash/pick"));
const set_1 = __importDefault(require("lodash/set"));
const ability_1 = require("@casl/ability");
const feathers_utils_1 = require("feathers-utils");
const hasRestrictingFields_1 = __importDefault(require("../../utils/hasRestrictingFields"));
const hasRestrictingConditions_1 = __importDefault(require("../../utils/hasRestrictingConditions"));
const couldHaveRestrictingFields_1 = __importDefault(require("../../utils/couldHaveRestrictingFields"));
const authorize_hook_utils_1 = require("./authorize.hook.utils");
const checkBasicPermission_hook_1 = __importDefault(require("../checkBasicPermission.hook"));
const getAvailableFields_1 = __importDefault(require("../../utils/getAvailableFields"));
const common_1 = require("../common");
const mergeQueryFromAbility_1 = __importDefault(require("../../utils/mergeQueryFromAbility"));
const HOOKNAME = "authorize";
exports.default = (context, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(options === null || options === void 0 ? void 0 : options.notSkippable) && ((0, feathers_utils_1.shouldSkip)(HOOKNAME, context) ||
        context.type !== "before" ||
        !context.params)) {
        return context;
    }
    if (!(0, authorize_hook_utils_1.getPersistedConfig)(context, "madeBasicCheck")) {
        const basicCheck = (0, checkBasicPermission_hook_1.default)({
            notSkippable: true,
            ability: options.ability,
            actionOnForbidden: options.actionOnForbidden,
            checkAbilityForInternal: options.checkAbilityForInternal,
            checkCreateForData: true,
            checkMultiActions: options.checkMultiActions,
            modelName: options.modelName,
            storeAbilityForAuthorize: true
        });
        yield basicCheck(context);
    }
    if (!options.modelName) {
        return context;
    }
    const modelName = (typeof options.modelName === "string")
        ? options.modelName
        : options.modelName(context);
    if (!modelName) {
        return context;
    }
    const ability = yield (0, authorize_hook_utils_1.getAbility)(context, options);
    if (!ability) {
        // Ignore internal or not authenticated requests
        return context;
    }
    const multi = (0, feathers_utils_1.isMulti)(context);
    // if context is with multiple items, there's a change that we need to handle each item separately
    if (multi) {
        if (!(0, couldHaveRestrictingFields_1.default)(ability, "find", modelName)) {
            // if has no restricting fields at all -> can skip _pick() in after-hook
            (0, authorize_hook_utils_1.setPersistedConfig)(context, "skipRestrictingRead.fields", true);
        }
    }
    if (["find", "get"].includes(context.method) || (feathers_utils_1.isMulti && !(0, hasRestrictingConditions_1.default)(ability, "find", modelName))) {
        (0, authorize_hook_utils_1.setPersistedConfig)(context, "skipRestrictingRead.conditions", true);
    }
    const { method, id } = context;
    const availableFields = (0, getAvailableFields_1.default)(context, options);
    if (["get", "patch", "update", "remove"].includes(method) && id != null) {
        // single: get | patch | update | remove
        yield handleSingle(context, ability, modelName, availableFields, options);
    }
    else if (method === "find" || (["patch", "remove"].includes(method) && id == null)) {
        // multi: find | patch | remove
        yield handleMulti(context, ability, modelName, availableFields, options);
    }
    else if (method === "create") {
        // create: single | multi
        (0, common_1.checkCreatePerItem)(context, ability, modelName, {
            actionOnForbidden: options.actionOnForbidden,
            checkCreateForData: true
        });
    }
    return context;
});
const handleSingle = (context, ability, modelName, availableFields, options) => __awaiter(void 0, void 0, void 0, function* () {
    // single: get | patch | update | remove
    var _a;
    // get complete item for `throwUnlessCan`-check to be trustworthy
    // -> initial 'get' and 'remove' have no data at all
    // -> initial 'patch' maybe has just partial data
    // -> initial 'update' maybe has completely changed data, for what the check could pass but not for initial data
    const { params, method, service, id } = context;
    const query = (0, mergeQueryFromAbility_1.default)(context.app, ability, method, modelName, (_a = context.params) === null || _a === void 0 ? void 0 : _a.query, context.service, options);
    (0, set_1.default)(context, "params.query", query);
    // ensure that only allowed data gets changed
    if (["update", "patch"].includes(method)) {
        const queryGet = Object.assign({}, params.query || {});
        if (queryGet.$select) {
            delete queryGet.$select;
        }
        const paramsGet = Object.assign({}, params, { query: queryGet });
        // TODO: If not allowed to .get() and to .[method](), then throw "NotFound" (maybe optional)
        const getMethod = (service._get) ? "_get" : "get";
        const item = yield service[getMethod](id, paramsGet);
        const restrictingFields = (0, hasRestrictingFields_1.default)(ability, method, (0, ability_1.subject)(modelName, item), { availableFields });
        if (restrictingFields && (restrictingFields === true || restrictingFields.length === 0)) {
            if (options.actionOnForbidden) {
                options.actionOnForbidden();
            }
            throw new errors_1.Forbidden("You're not allowed to make this request");
        }
        const data = (!restrictingFields) ? context.data : (0, pick_1.default)(context.data, restrictingFields);
        checkData(context, ability, modelName, data, options);
        if (!restrictingFields) {
            return context;
        }
        // if fields are not overlapping -> throw
        if ((0, isEmpty_1.default)(data)) {
            if (options.actionOnForbidden) {
                options.actionOnForbidden();
            }
            throw new errors_1.Forbidden("You're not allowed to make this request");
        }
        //TODO: if some fields not match -> `actionOnForbiddenUpdate`
        if (method === "patch") {
            context.data = data;
        }
        else {
            // merge with initial data
            const itemPlain = yield service._get(id, {});
            context.data = Object.assign({}, itemPlain, data);
        }
    }
    return context;
});
const checkData = (context, ability, modelName, data, options) => {
    if ((context.method === "patch" && !options.usePatchData) ||
        (context.method === "update" && !options.useUpdateData)) {
        return;
    }
    (0, authorize_hook_utils_1.throwUnlessCan)(ability, `${context.method}-data`, (0, ability_1.subject)(modelName, data), modelName, options);
};
const handleMulti = (context, ability, modelName, availableFields, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { method } = context;
    // multi: find | patch | remove
    if (method === "patch") {
        const fields = (0, hasRestrictingFields_1.default)(ability, method, modelName, { availableFields });
        if (fields === true) {
            if (options.actionOnForbidden) {
                options.actionOnForbidden();
            }
            throw new errors_1.Forbidden("You're not allowed to make this request");
        }
        if (fields && fields.length > 0) {
            const data = (0, pick_1.default)(context.data, fields);
            context.data = data;
        }
    }
    const query = (0, mergeQueryFromAbility_1.default)(context.app, ability, method, modelName, (_b = context.params) === null || _b === void 0 ? void 0 : _b.query, context.service, options);
    (0, set_1.default)(context, "params.query", query);
    return context;
});
