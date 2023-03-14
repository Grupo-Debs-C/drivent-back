"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentProcess = exports.getPaymentByTicketId = void 0;
const payments_service_1 = __importDefault(require("../services/payments-service/index"));
const http_status_1 = __importDefault(require("http-status"));
async function getPaymentByTicketId(req, res) {
    try {
        const ticketId = Number(req.query.ticketId);
        const { userId } = req;
        if (!ticketId) {
            return res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
        const payment = await payments_service_1.default.getPaymentByTicketId(userId, ticketId);
        if (!payment) {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        return res.status(http_status_1.default.OK).send(payment);
    }
    catch (error) {
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED);
        }
        return res.sendStatus(http_status_1.default.NOT_FOUND);
    }
}
exports.getPaymentByTicketId = getPaymentByTicketId;
async function paymentProcess(req, res) {
    try {
        const { userId } = req;
        const { ticketId, cardData, } = req.body;
        if (!ticketId || !cardData) {
            return res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
        const payment = await payments_service_1.default.paymentProcess(ticketId, userId, cardData);
        if (!payment) {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        return res.status(http_status_1.default.OK).send(payment);
    }
    catch (error) {
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED);
        }
        return res.sendStatus(http_status_1.default.NOT_FOUND);
    }
}
exports.paymentProcess = paymentProcess;
