"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("@feathersjs/authentication");
const authentication_local_1 = require("@feathersjs/authentication-local");
const authentication_oauth_1 = require("@feathersjs/authentication-oauth");
const authentication_hooks_1 = __importDefault(require("./authentication.hooks"));
function default_1(app) {
    const authentication = new authentication_1.AuthenticationService(app);
    authentication.register('jwt', new authentication_1.JWTStrategy());
    authentication.register('local', new authentication_local_1.LocalStrategy());
    app.use('/authentication', authentication);
    app.service('authentication').hooks(authentication_hooks_1.default);
    app.configure((0, authentication_oauth_1.expressOauth)());
}
exports.default = default_1;
