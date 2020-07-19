"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class UsersController {
    async index(request, response) {
        const users = await connection_1.default('users').select('*');
        return response.json(users);
    }
    async create(request, response) {
        const { name, email, password } = request.body;
        const emailExists = await connection_1.default('users').select('users.email').where('users.email', email).first();
        const firstUser = await connection_1.default('users').select('*').first();
        if (!emailExists) {
            if (!firstUser) {
                const user = {
                    name,
                    email,
                    password,
                    admin: 1
                };
                const insertUser = await connection_1.default('users').insert(user);
                return response.json({ id: insertUser, ...user, });
            }
            else {
                const user = {
                    name,
                    email,
                    password,
                    admin: 0
                };
                const insertUser = await connection_1.default('users').insert(user);
                return response.json({ id: insertUser, ...user, });
            }
        }
        else {
            return response.status(401).json({ error: 'Email already registered!' });
        }
    }
}
exports.default = UsersController;
