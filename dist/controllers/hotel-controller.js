"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHotelsWithRooms = exports.getHotelsWithRooms = exports.getHotels = void 0;
const hotels_service_1 = __importDefault(require("../services/hotels-service/index"));
const http_status_1 = __importDefault(require("http-status"));
async function getHotels(req, res) {
    const { userId } = req;
    try {
        const hotels = await hotels_service_1.default.getHotels(Number(userId));
        return res.status(http_status_1.default.OK).send(hotels);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        if (error.name === "cannotListHotelsError") {
            return res.sendStatus(http_status_1.default.PAYMENT_REQUIRED);
        }
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.getHotels = getHotels;
async function getHotelsWithRooms(req, res) {
    const { userId } = req;
    const { hotelId } = req.params;
    try {
        const hotels = await hotels_service_1.default.getHotelsWithRooms(Number(userId), Number(hotelId));
        return res.status(http_status_1.default.OK).send(hotels);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        if (error.name === "cannotListHotelsError") {
            return res.sendStatus(http_status_1.default.PAYMENT_REQUIRED);
        }
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.getHotelsWithRooms = getHotelsWithRooms;
async function getAllHotelsWithRooms(req, res) {
    const { userId } = req;
    try {
        const hotels = await hotels_service_1.default.getAllHotelsWithRooms(Number(userId));
        return res.status(http_status_1.default.OK).send(hotels);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        if (error.name === "cannotListHotelsError") {
            return res.sendStatus(http_status_1.default.PAYMENT_REQUIRED);
        }
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.getAllHotelsWithRooms = getAllHotelsWithRooms;
