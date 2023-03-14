"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function findHotels() {
    return config_1.prisma.hotel.findMany();
}
async function findAllHotelsWithRooms() {
    return config_1.prisma.hotel.findMany({
        include: {
            Rooms: {
                include: {
                    Booking: true
                }
            }
        }
    });
}
async function findRoomsByHotelId(hotelId) {
    return config_1.prisma.hotel.findFirst({
        where: {
            id: hotelId,
        },
        include: {
            Rooms: true,
        }
    });
}
const hotelRepository = {
    findHotels,
    findAllHotelsWithRooms,
    findRoomsByHotelId,
};
exports.default = hotelRepository;
