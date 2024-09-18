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
exports.HOOKNAME = void 0;
const feathers_utils_1 = require("feathers-utils");
const checkBasicPermission_1 = __importDefault(require("../utils/checkBasicPermission"));
exports.HOOKNAME = "checkBasicPermission";
exports.default = (_options) => {
    return (context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(_options === null || _options === void 0 ? void 0 : _options.notSkippable) && ((0, feathers_utils_1.shouldSkip)(exports.HOOKNAME, context) ||
            context.type !== "before" ||
            !context.params)) {
            return context;
        }
        return yield (0, checkBasicPermission_1.default)(context, _options);
    });
};
