"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const paymentsRouter = express_1.Router();
exports.paymentsRouter = paymentsRouter;
paymentsRouter
    .all("/*", middlewares_1.authenticateToken)
    .get("/", controllers_1.getPaymentByTicketId)
    .post("/process", controllers_1.paymentProcess);
