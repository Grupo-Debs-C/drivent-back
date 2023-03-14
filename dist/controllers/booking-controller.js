"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeBooking = exports.bookingRoom = exports.listBooking = void 0;
const http_status_1 = __importDefault(require("http-status"));
const booking_service_1 = __importDefault(require("../services/booking-service/index"));
async function listBooking(req, res) {
    try {
        const { userId } = req;
        const booking = await booking_service_1.default.getBooking(userId);
        return res.status(http_status_1.default.OK).send({
            id: booking.id,
            occupancy: booking.occupancy,
            hotelName: booking.hotelName,
            hotelImage: booking.hotelImage,
            Room: booking.Room,
        });
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NOT_FOUND);
    }
}
exports.listBooking = listBooking;
async function bookingRoom(req, res) {
    try {
        const { userId } = req;
        const { roomId } = req.body;
        if (!roomId) {
            return res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
        const booking = await booking_service_1.default.bookingRoomById(userId, Number(roomId));
        return res.status(http_status_1.default.OK).send({
            bookingId: booking.id,
        });
    }
    catch (error) {
        if (error.name === "CannotBookingError") {
            return res.sendStatus(http_status_1.default.FORBIDDEN);
        }
        return res.sendStatus(http_status_1.default.NOT_FOUND);
    }
}
exports.bookingRoom = bookingRoom;
async function changeBooking(req, res) {
    try {
        const { userId } = req;
        const bookingId = Number(req.params.bookingId);
        if (!bookingId) {
            return res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
        const { roomId } = req.body;
        if (!roomId) {
            return res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
        const booking = await booking_service_1.default.changeBookingRoomById(userId, Number(roomId));
        return res.status(http_status_1.default.OK).send({
            bookingId: booking.id,
        });
    }
    catch (error) {
        if (error.name === "CannotBookingError") {
            return res.sendStatus(http_status_1.default.FORBIDDEN);
        }
        return res.sendStatus(http_status_1.default.NOT_FOUND);
    }
}
exports.changeBooking = changeBooking;
