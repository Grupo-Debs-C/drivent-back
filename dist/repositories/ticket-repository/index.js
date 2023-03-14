"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
const client_1 = require("@prisma/client");
async function findTicketTypes() {
    return config_1.prisma.ticketType.findMany();
}
async function findTickeyById(ticketId) {
    return config_1.prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            Enrollment: true,
        }
    });
}
async function findTickeWithTypeById(ticketId) {
    return config_1.prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            TicketType: true,
        }
    });
}
async function findTicketByEnrollmentId(enrollmentId) {
    return config_1.prisma.ticket.findFirst({
        where: {
            enrollmentId,
        },
        include: {
            TicketType: true, //inner join
        }
    });
}
async function createTicket(ticket) {
    return config_1.prisma.ticket.create({
        data: {
            ...ticket,
        }
    });
}
async function ticketProcessPayment(ticketId) {
    return config_1.prisma.ticket.update({
        where: {
            id: ticketId,
        },
        data: {
            status: client_1.TicketStatus.PAID,
        }
    });
}
const ticketRepository = {
    findTicketTypes,
    findTicketByEnrollmentId,
    createTicket,
    findTickeyById,
    findTickeWithTypeById,
    ticketProcessPayment,
};
exports.default = ticketRepository;
