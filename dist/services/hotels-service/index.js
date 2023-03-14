"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_repository_1 = __importDefault(require("../../repositories/hotel-repository/index"));
const enrollment_repository_1 = __importDefault(require("../../repositories/enrollment-repository/index"));
const ticket_repository_1 = __importDefault(require("../../repositories/ticket-repository/index"));
const errors_1 = require("../../errors/index");
const cannot_list_hotels_error_1 = require("../../errors/cannot-list-hotels-error");
async function listHotels(userId) {
    //Tem enrollment?
    const enrollment = await enrollment_repository_1.default.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw errors_1.notFoundError();
    }
    //Tem ticket pago isOnline false e includesHotel true
    const ticket = await ticket_repository_1.default.findTicketByEnrollmentId(enrollment.id);
    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannot_list_hotels_error_1.cannotListHotelsError();
    }
}
async function getHotels(userId) {
    await listHotels(userId);
    const hotels = await hotel_repository_1.default.findHotels();
    return hotels;
}
async function getAllHotelsWithRooms(userId) {
    await listHotels(userId);
    const hotels = await hotel_repository_1.default.findAllHotelsWithRooms();
    return hotels;
}
async function getHotelsWithRooms(userId, hotelId) {
    await listHotels(userId);
    const hotel = await hotel_repository_1.default.findRoomsByHotelId(hotelId);
    if (!hotel) {
        throw errors_1.notFoundError();
    }
    return hotel;
}
const hotelService = {
    getHotels,
    getHotelsWithRooms,
    getAllHotelsWithRooms
};
exports.default = hotelService;
