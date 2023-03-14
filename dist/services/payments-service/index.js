"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors/index");
const payment_repository_1 = __importDefault(require("../../repositories/payment-repository/index"));
const ticket_repository_1 = __importDefault(require("../../repositories/ticket-repository/index"));
const enrollment_repository_1 = __importDefault(require("../../repositories/enrollment-repository/index"));
async function verifyTicketAndEnrollment(ticketId, userId) {
    const ticket = await ticket_repository_1.default.findTickeyById(ticketId);
    if (!ticket) {
        throw errors_1.notFoundError();
    }
    const enrollment = await enrollment_repository_1.default.findById(ticket.enrollmentId);
    if (enrollment.userId !== userId) {
        throw errors_1.unauthorizedError();
    }
}
async function getPaymentByTicketId(userId, ticketId) {
    await verifyTicketAndEnrollment(ticketId, userId);
    const payment = await payment_repository_1.default.findPaymentByTicketId(ticketId);
    if (!payment) {
        throw errors_1.notFoundError();
    }
    return payment;
}
async function paymentProcess(ticketId, userId, cardData) {
    await verifyTicketAndEnrollment(ticketId, userId);
    const ticket = await ticket_repository_1.default.findTickeWithTypeById(ticketId);
    const paymentData = {
        ticketId,
        value: ticket.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4),
    };
    const payment = await payment_repository_1.default.createPayment(ticketId, paymentData);
    await ticket_repository_1.default.ticketProcessPayment(ticketId);
    return payment;
}
const paymentService = {
    getPaymentByTicketId,
    paymentProcess,
};
exports.default = paymentService;
