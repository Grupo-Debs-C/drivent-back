"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressFromCEP = exports.postCreateOrUpdateEnrollment = exports.getEnrollmentByUser = void 0;
const enrollments_service_1 = __importDefault(require("../services/enrollments-service/index"));
const http_status_1 = __importDefault(require("http-status"));
async function getEnrollmentByUser(req, res) {
    const { userId } = req;
    try {
        const enrollmentWithAddress = await enrollments_service_1.default.getOneWithAddressByUserId(userId);
        return res.status(http_status_1.default.OK).send(enrollmentWithAddress);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NOT_FOUND);
    }
}
exports.getEnrollmentByUser = getEnrollmentByUser;
async function postCreateOrUpdateEnrollment(req, res) {
    try {
        await enrollments_service_1.default.createOrUpdateEnrollmentWithAddress({
            ...req.body,
            userId: req.userId,
        });
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.postCreateOrUpdateEnrollment = postCreateOrUpdateEnrollment;
async function getAddressFromCEP(req, res) {
    const { cep } = req.query;
    try {
        const address = await enrollments_service_1.default.getAddressFromCEP(cep);
        return res.status(http_status_1.default.OK).send(address);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
    }
}
exports.getAddressFromCEP = getAddressFromCEP;
