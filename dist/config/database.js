"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.disconnectDB = exports.connectDb = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectDb() {
    exports.prisma = new client_1.PrismaClient();
}
exports.connectDb = connectDb;
async function disconnectDB() {
    await exports.prisma?.$disconnect();
}
exports.disconnectDB = disconnectDB;
const redis = redis_1.createClient({
    url: process.env.REDIS_URL
});
exports.redis = redis;
async function connectCache() {
    await redis.connect();
}
connectCache();
