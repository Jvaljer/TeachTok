"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBasicPermission = exports.authorize = void 0;
var authorize_hook_1 = require("./authorize/authorize.hook");
Object.defineProperty(exports, "authorize", { enumerable: true, get: function () { return __importDefault(authorize_hook_1).default; } });
var checkBasicPermission_hook_1 = require("./checkBasicPermission.hook");
Object.defineProperty(exports, "checkBasicPermission", { enumerable: true, get: function () { return __importDefault(checkBasicPermission_hook_1).default; } });
