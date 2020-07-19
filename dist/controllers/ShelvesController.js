"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ShelvesController {
    async index(request, response) {
        const shelves = await connection_1.default('shelves').select('*');
        return response.json(shelves);
    }
    async show(request, response) {
        const shelves = await connection_1.default('shelves').select('shelves.shelf').distinct();
        return response.json(shelves);
    }
    async showRacks(request, response) {
        const shelf = request.query.shelf;
        const racks = await connection_1.default('shelves').select('shelves.rack').where('shelf', String(shelf)).distinct();
        return response.json(racks);
    }
    async showShelf(request, response) {
        const { shelf, rack } = request.query;
        const shelfId = await connection_1.default('shelves')
            .select('shelves.id')
            .where('shelf', String(shelf))
            .where('rack', String(rack))
            .first();
        return response.json(shelfId);
    }
    async create(request, response) {
        const userId = request.headers.authorization;
        const { shelf, rack } = request.body;
        const shelfExists = await connection_1.default('shelves').select('shelf').where({ shelf: shelf, rack: rack }).first();
        const admPermission = await connection_1.default('users').select('users.admin').where({ id: userId }).first();
        if (!shelfExists) {
            if (admPermission.admin == 1) {
                const shelves = {
                    shelf,
                    rack,
                };
                const insertShelf = await connection_1.default('shelves').insert(shelves);
                return response.json({ id: insertShelf, ...shelves, });
            }
            else {
                return response.status(401).json({ error: 'You do not have administrator permission!' });
            }
        }
        else {
            return response.status(401).json({ error: 'Shelf already registered!' });
        }
    }
}
exports.default = ShelvesController;
