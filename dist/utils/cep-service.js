"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddress = void 0;
const request_1 = require("./request");
async function getAddress(cep) {
    const result = await request_1.request.get(`https://viacep.com.br/ws/${cep}/json/`);
    return result.data;
}
exports.getAddress = getAddress;
