"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function create({ roomId, userId }) {
    return config_1.prisma.booking.create({
        data: {
            roomId,
            userId,
        }
    });
}
async function findByRoomId(roomId) {
    return config_1.prisma.booking.findMany({
        where: {
            roomId,
        },
        include: {
            Room: true,
        }
    });
}
async function findByUserId(userId) {
    return config_1.prisma.booking.findFirst({
        where: {
            userId,
        },
        include: {
            Room: true,
        }
    });
}
async function upsertBooking({ id, roomId, userId }) {
    return config_1.prisma.booking.upsert({
        where: {
            id,
        },
        create: {
            roomId,
            userId,
        },
        update: {
            roomId,
        }
    });
}
const bookingRepository = {
    create,
    findByRoomId,
    findByUserId,
    upsertBooking,
};
exports.default = bookingRepository;
