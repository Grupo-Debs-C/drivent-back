"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function findWithAddressByUserId(userId) {
    return config_1.prisma.enrollment.findFirst({
        where: { userId },
        include: {
            Address: true,
        },
    });
}
async function findById(enrollmentId) {
    return config_1.prisma.enrollment.findFirst({
        where: { id: enrollmentId }
    });
}
async function upsert(userId, createdEnrollment, updatedEnrollment) {
    return config_1.prisma.enrollment.upsert({
        where: {
            userId,
        },
        create: createdEnrollment,
        update: updatedEnrollment,
    });
}
const enrollmentRepository = {
    findWithAddressByUserId,
    upsert,
    findById,
};
exports.default = enrollmentRepository;
