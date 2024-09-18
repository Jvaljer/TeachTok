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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOOKNAME = void 0;
const authorize_hook_utils_1 = require("../hooks/authorize/authorize.hook.utils");
const common_1 = require("../hooks/common");
exports.HOOKNAME = "checkBasicPermission";
const defaultOptions = {
    checkCreateForData: false,
    storeAbilityForAuthorize: false
};
const makeOptions = (options) => {
    options = options || {};
    return Object.assign((0, common_1.makeDefaultBaseOptions)(), defaultOptions, options);
};
exports.default = (context, _options) => __awaiter(void 0, void 0, void 0, function* () {
    const options = makeOptions(_options);
    const { method } = context;
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
    if (options.checkMultiActions) {
        (0, authorize_hook_utils_1.checkMulti)(context, ability, modelName, options);
    }
    (0, authorize_hook_utils_1.throwUnlessCan)(ability, method, modelName, modelName, options);
    (0, common_1.checkCreatePerItem)(context, ability, modelName, options);
    if (options.storeAbilityForAuthorize) {
        (0, authorize_hook_utils_1.setPersistedConfig)(context, "ability", ability);
    }
    (0, authorize_hook_utils_1.setPersistedConfig)(context, "madeBasicCheck", true);
    return context;
});
