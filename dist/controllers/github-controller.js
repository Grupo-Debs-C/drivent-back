"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.github = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const qs_1 = __importDefault(require("qs"));
async function github(req, res) {
    const { code } = req.body;
    if (!code) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
    const body = {
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/sign-in',
        client_id: '8b03db19625ccc7dad31',
        client_secret: "aef2208dd4cbf6099b9e3ff9d8763b85468ef532"
    };
    try {
        const { data } = await axios_1.default.post("https://github.com/login/oauth/access_token", body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const parsedData = qs_1.default.parse(data);
        const token = parsedData.access_token;
        const fetchUser = await axios_1.default.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const user = fetchUser.data;
        return res.status(200).send(user);
    }
    catch {
        return res.status(500);
    }
}
exports.github = github;
