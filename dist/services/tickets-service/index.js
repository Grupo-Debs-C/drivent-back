"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors/index");
const ticket_repository_1 = __importDefault(require("../../repositories/ticket-repository/index"));
const enrollment_repository_1 = __importDefault(require("../../repositories/enrollment-repository/index"));
const client_1 = require("@prisma/client");
async function getTicketTypes() {
    const ticketTypes = await ticket_repository_1.default.findTicketTypes();
    if (!ticketTypes) {
        throw errors_1.notFoundError();
    }
    return ticketTypes;
}
async function getTicketByUserId(userId) {
    const enrollment = await enrollment_repository_1.default.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw errors_1.notFoundError();
    }
    const ticket = await ticket_repository_1.default.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) {
        throw errors_1.notFoundError();
    }
    return ticket;
}
async function createTicket(userId, ticketTypeId) {
    const enrollment = await enrollment_repository_1.default.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw errors_1.notFoundError();
    }
    const ticketData = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: client_1.TicketStatus.RESERVED
    };
    await ticket_repository_1.default.createTicket(ticketData);
    const ticket = await ticket_repository_1.default.findTicketByEnrollmentId(enrollment.id);
    return ticket;
}
const ticketService = {
    getTicketTypes,
    getTicketByUserId,
    createTicket
};
exports.default = ticketService;
