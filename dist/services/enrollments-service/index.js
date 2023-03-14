"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cep_service_1 = require("../../utils/cep-service");
const errors_1 = require("../../errors/index");
const address_repository_1 = __importDefault(require("../../repositories/address-repository/index"));
const enrollment_repository_1 = __importDefault(require("../../repositories/enrollment-repository/index"));
const prisma_utils_1 = require("../../utils/prisma-utils");
async function getAddressFromCEP(cep) {
    const result = await cep_service_1.getAddress(cep);
    if (!result) {
        throw errors_1.notFoundError(); //lançar -> pro arquivo que chamou essa função
    }
    const { bairro, localidade, uf, complemento, logradouro } = result;
    const address = {
        bairro,
        cidade: localidade,
        uf,
        complemento,
        logradouro
    };
    return address;
}
async function getOneWithAddressByUserId(userId) {
    const enrollmentWithAddress = await enrollment_repository_1.default.findWithAddressByUserId(userId);
    if (!enrollmentWithAddress)
        throw errors_1.notFoundError();
    const [firstAddress] = enrollmentWithAddress.Address;
    const address = getFirstAddress(firstAddress);
    return {
        ...prisma_utils_1.exclude(enrollmentWithAddress, "userId", "createdAt", "updatedAt", "Address"),
        ...(!!address && { address }),
    };
}
function getFirstAddress(firstAddress) {
    if (!firstAddress)
        return null;
    return prisma_utils_1.exclude(firstAddress, "createdAt", "updatedAt", "enrollmentId");
}
async function createOrUpdateEnrollmentWithAddress(params) {
    const enrollment = prisma_utils_1.exclude(params, "address");
    const address = getAddressForUpsert(params.address);
    //BUG - Verificar se o CEP é válido
    const result = await getAddressFromCEP(address.cep);
    if (result.error) {
        throw errors_1.notFoundError();
    }
    const newEnrollment = await enrollment_repository_1.default.upsert(params.userId, enrollment, prisma_utils_1.exclude(enrollment, "userId"));
    await address_repository_1.default.upsert(newEnrollment.id, address, address);
}
function getAddressForUpsert(address) {
    return {
        ...address,
        ...(address?.addressDetail && { addressDetail: address.addressDetail }),
    };
}
const enrollmentsService = {
    getOneWithAddressByUserId,
    createOrUpdateEnrollmentWithAddress,
    getAddressFromCEP
};
exports.default = enrollmentsService;
