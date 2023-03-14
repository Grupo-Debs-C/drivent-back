"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const ticketsRouter = express_1.Router();
exports.ticketsRouter = ticketsRouter;
ticketsRouter
    .all("/*", middlewares_1.authenticateToken)
    .get("/types", controllers_1.getTicketTypes)
    .get("", controllers_1.getTickets)
    .post("", controllers_1.createTicket);
