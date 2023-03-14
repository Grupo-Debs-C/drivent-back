"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelsRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const hotelsRouter = express_1.Router();
exports.hotelsRouter = hotelsRouter;
hotelsRouter
    .all("/*", middlewares_1.authenticateToken)
    .get("/", controllers_1.getHotels)
    .get("/all", controllers_1.getAllHotelsWithRooms)
    .get("/:hotelId", controllers_1.getHotelsWithRooms);
