"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const bookingRouter = express_1.Router();
exports.bookingRouter = bookingRouter;
bookingRouter
    .all("/*", middlewares_1.authenticateToken)
    .get("", controllers_1.listBooking)
    .post("", controllers_1.bookingRoom)
    .put("/:bookingId", controllers_1.changeBooking);
