"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const pick_1 = __importDefault(require("lodash/pick"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
require("@feathersjs/transport-commons");
const ability_1 = require("@casl/ability");
const base_1 = require("@feathersjs/transport-commons/lib/channels/channel/base");
const channels_utils_1 = require("./channels.utils");
const getModelName_1 = __importDefault(require("../utils/getModelName"));
const hasRestrictingFields_1 = __importDefault(require("../utils/hasRestrictingFields"));
const getAvailableFields_1 = __importDefault(require("../utils/getAvailableFields"));
exports.default = (app, data, context, _options) => {
    if (!(_options === null || _options === void 0 ? void 0 : _options.channels) && !app.channels.length) {
        return undefined;
    }
    const options = (0, channels_utils_1.makeOptions)(app, _options);
    const { channelOnError, activated } = options;
    const modelName = (0, getModelName_1.default)(options.modelName, context);
    if (!activated || !modelName) {
        return (!channelOnError) ? new base_1.Channel() : app.channel(channelOnError);
    }
    let channels = options.channels || app.channel(app.channels);
    if (!Array.isArray(channels)) {
        channels = [channels];
    }
    const dataToTest = (0, ability_1.subject)(modelName, data);
    let method = "get";
    if (typeof options.useActionName === "string") {
        method = options.useActionName;
    }
    else {
        const eventName = (0, channels_utils_1.getEventName)(context.method);
        if (eventName && options.useActionName[eventName]) {
            method = options.useActionName[eventName];
        }
    }
    let result = [];
    if (!options.restrictFields) {
        // return all fields for allowed
        result = channels.map(channel => {
            return channel.filter(conn => {
                const ability = (0, channels_utils_1.getAbility)(app, data, conn, context, options);
                return ability && ability.can(method, dataToTest);
            });
        });
    }
    else {
        // filter by restricted Fields
        const connectionsPerFields = [];
        for (let i = 0, n = channels.length; i < n; i++) {
            const channel = channels[i];
            const { connections } = channel;
            for (let j = 0, o = connections.length; j < o; j++) {
                const connection = connections[j];
                const { ability } = connection;
                if (!ability || !ability.can(method, dataToTest)) {
                    // connection cannot read item -> don't send data
                    continue;
                }
                const availableFields = (0, getAvailableFields_1.default)(context, options);
                const fields = (0, hasRestrictingFields_1.default)(ability, method, dataToTest, { availableFields });
                // if fields is true or fields is empty array -> full restriction
                if (fields && (fields === true || fields.length === 0)) {
                    continue;
                }
                const connField = connectionsPerFields.find(x => (0, isEqual_1.default)(x.fields, fields));
                if (connField) {
                    if (connField.connections.indexOf(connection) !== -1) {
                        // connection is already in array -> skip
                        continue;
                    }
                    connField.connections.push(connection);
                }
                else {
                    connectionsPerFields.push({
                        connections: [connection],
                        fields: fields
                    });
                }
            }
        }
        for (let i = 0, n = connectionsPerFields.length; i < n; i++) {
            const { fields, connections } = connectionsPerFields[i];
            const restrictedData = (fields)
                ? (0, pick_1.default)(data, fields)
                : data;
            if (!(0, isEmpty_1.default)(restrictedData)) {
                result.push(new base_1.Channel(connections, restrictedData));
            }
        }
    }
    return result.length === 1
        ? result[0]
        : result;
};
