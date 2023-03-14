"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function findAllByHotelId(hotelId) {
    return config_1.prisma.room.findMany({
        where: {
            hotelId,
        }
    });
}
async function findById(roomId) {
    return config_1.prisma.room.findFirst({
        where: {
            id: roomId,
        }
    });
}
const roomRepository = {
    findAllByHotelId,
    findById
};
exports.default = roomRepository;
