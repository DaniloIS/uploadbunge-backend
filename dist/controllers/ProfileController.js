"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ProfileController {
    async index(request, response) {
        const { email, password } = request.body;
        const user = await connection_1.default('users').select('*').where({ email: email, password: password });
        if (!user[0]) {
            return response.json('Incorrect email or password');
        }
        return response.json(user);
    }
    async show(request, response) {
        const { id } = request.params;
        const user = await connection_1.default('users').where('id', id);
        return response.json(user);
    }
    async update(request, response) {
        const { id } = request.params;
        const { name, email, password } = request.body;
        const user = {
            name,
            email,
            password,
        };
        const updateUser = await connection_1.default('users').where('id', id).update(user);
        return response.json(user);
    }
}
exports.default = ProfileController;
