"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ProductsController {
    async index(request, response) {
        const products = await connection_1.default('products').select('*');
        const serializedProducts = products.map(product => {
            return {
                ...product,
                image_url: `http://192.168.86.6:3333/uploads/${product.image}`,
            };
        });
        return response.json(serializedProducts);
    }
    async show(request, response) {
        const { id } = request.params;
        const point = await connection_1.default('points').where('id', id).first();
        if (!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }
        const serializedPoint = {
            ...point,
            image_url: `http://192.168.86.6:3333/uploads/${point.image}`,
        };
        const items = await connection_1.default('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        return response.json({ point: serializedPoint, items });
    }
    async create(request, response) {
        const { name, } = request.body;
        console.log(request);
        const product = {
            name,
            image: request.file.filename,
        };
        const insertedProduct = await connection_1.default('products').insert(product);
        return response.json({
            id: insertedProduct,
            ...product,
        });
    }
}
exports.default = ProductsController;
