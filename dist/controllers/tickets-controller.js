"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = exports.getTickets = exports.getTicketTypes = void 0;
const tickets_service_1 = __importDefault(require("../services/tickets-service/index"));
const http_status_1 = __importDefault(require("http-status"));
async function getTicketTypes(req, res) {
    try {
        const ticketTypes = await tickets_service_1.default.getTicketTypes();
        return res.status(http_status_1.default.OK).send(ticketTypes);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NO_CONTENT);
    }
}
exports.getTicketTypes = getTicketTypes;
async function getTickets(req, res) {
    const { userId } = req;
    try {
        const ticketTypes = await tickets_service_1.default.getTicketByUserId(userId);
        return res.status(http_status_1.default.OK).send(ticketTypes);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NOT_FOUND);
    }
}
exports.getTickets = getTickets;
async function createTicket(req, res) {
    const { userId } = req;
    //TODO validação do JOI
    const { ticketTypeId } = req.body;
    if (!ticketTypeId) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    try {
        const ticketTypes = await tickets_service_1.default.createTicket(userId, ticketTypeId);
        return res.status(http_status_1.default.CREATED).send(ticketTypes);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NOT_FOUND);
    }
}
exports.createTicket = createTicket;
