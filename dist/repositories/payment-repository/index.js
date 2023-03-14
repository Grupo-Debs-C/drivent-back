"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function findPaymentByTicketId(ticketId) {
    return config_1.prisma.payment.findFirst({
        where: {
            ticketId,
        }
    });
}
async function createPayment(ticketId, params) {
    return config_1.prisma.payment.create({
        data: {
            ticketId,
            ...params,
        }
    });
}
const paymentRepository = {
    findPaymentByTicketId,
    createPayment,
};
exports.default = paymentRepository;
