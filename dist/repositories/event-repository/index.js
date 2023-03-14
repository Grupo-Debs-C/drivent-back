"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function findFirst() {
    let event = JSON.parse((await config_1.redis.get("event"))).data;
    return event;
}
const eventRepository = {
    findFirst,
};
exports.default = eventRepository;
