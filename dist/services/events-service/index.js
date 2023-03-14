"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors/index");
const event_repository_1 = __importDefault(require("../../repositories/event-repository/index"));
const prisma_utils_1 = require("../../utils/prisma-utils");
const dayjs_1 = __importDefault(require("dayjs"));
async function getFirstEvent() {
    const event = await event_repository_1.default.findFirst();
    if (!event)
        throw errors_1.notFoundError();
    return prisma_utils_1.exclude(event, "createdAt", "updatedAt");
}
async function isCurrentEventActive() {
    const event = await event_repository_1.default.findFirst();
    if (!event)
        return false;
    const now = dayjs_1.default();
    const eventStartsAt = dayjs_1.default(event.startsAt);
    const eventEndsAt = dayjs_1.default(event.endsAt);
    return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}
const eventsService = {
    getFirstEvent,
    isCurrentEventActive,
};
exports.default = eventsService;
