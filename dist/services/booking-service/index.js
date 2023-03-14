"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors/index");
const room_repository_1 = __importDefault(require("../../repositories/room-repository/index"));
const booking_repository_1 = __importDefault(require("../../repositories/booking-repository/index"));
const enrollment_repository_1 = __importDefault(require("../../repositories/enrollment-repository/index"));
const ticket_repository_1 = __importDefault(require("../../repositories/ticket-repository/index"));
const hotel_repository_1 = __importDefault(require("../../repositories/hotel-repository/index"));
async function checkEnrollmentTicket(userId) {
    const enrollment = await enrollment_repository_1.default.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw errors_1.cannotBookingError();
    }
    const ticket = await ticket_repository_1.default.findTicketByEnrollmentId(enrollment.id);
    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw errors_1.cannotBookingError();
    }
}
async function checkValidBooking(roomId) {
    const room = await room_repository_1.default.findById(roomId);
    const bookings = await booking_repository_1.default.findByRoomId(roomId);
    if (!room) {
        throw errors_1.notFoundError();
    }
    if (room.capacity <= bookings.length) {
        throw errors_1.cannotBookingError();
    }
}
async function getBooking(userId) {
    const booking = await booking_repository_1.default.findByUserId(userId);
    if (!booking) {
        throw errors_1.notFoundError();
    }
    const bookingForTheRoom = await booking_repository_1.default.findByRoomId(booking.Room.id);
    const hotel = await hotel_repository_1.default.findRoomsByHotelId(booking.Room.hotelId);
    const completeBooking = {
        ...booking,
        occupancy: bookingForTheRoom.length,
        hotelName: hotel.name,
        hotelImage: hotel.image
    };
    return completeBooking;
}
async function bookingRoomById(userId, roomId) {
    await checkEnrollmentTicket(userId);
    await checkValidBooking(roomId);
    return booking_repository_1.default.create({ roomId, userId });
}
async function changeBookingRoomById(userId, roomId) {
    await checkValidBooking(roomId);
    const booking = await booking_repository_1.default.findByUserId(userId);
    if (!booking || booking.userId !== userId) {
        throw errors_1.cannotBookingError();
    }
    return booking_repository_1.default.upsertBooking({
        id: booking.id,
        roomId,
        userId
    });
}
const bookingService = {
    bookingRoomById,
    getBooking,
    changeBookingRoomById,
};
exports.default = bookingService;
