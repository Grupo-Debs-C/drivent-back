"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers/index");
const githubRouter = express_1.Router();
exports.githubRouter = githubRouter;
githubRouter
    .post("/", controllers_1.github);
