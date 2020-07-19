"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ItemProductController {
    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection_1.default('item_product').count();
        const itemProducts = await connection_1.default('item_product')
            .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
            .join('products', 'products.id', '=', 'item_product.product_id')
            .limit(5)
            .offset((Number(page) - 1) * 5)
            .select([
            'item_product.*',
            'products.name',
            'products.image',
            'shelves.shelf',
            'shelves.rack'
        ]);
        const serializedItems = itemProducts.map(item => {
            return {
                ...item,
                image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
            };
        });
        response.header('X-Total-Count', count['count(*)']);
        return response.json(serializedItems);
    }
    async show(request, response) {
        const { id } = request.params;
        console.log(id);
        const itemProduct = await connection_1.default('item_product')
            .where('item_product.id', id)
            .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
            .join('products', 'products.id', '=', 'item_product.product_id')
            .select([
            'item_product.*',
            'products.name',
            'products.image',
            'shelves.shelf',
            'shelves.rack'
        ]);
        const serializedItem = itemProduct.map(item => {
            return {
                ...item,
                image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
            };
        });
        return response.json(serializedItem);
    }
    async create(request, response) {
        const { shelf_id, product_id, lot, fabrication_dt, expiration_dt, color, carousel, } = request.body;
        const item = {
            shelf_id,
            product_id,
            lot,
            fabrication_dt,
            expiration_dt,
            color,
            carousel,
        };
        const insertItem = await connection_1.default('item_product').insert(item);
        return response.json({
            id: insertItem,
            ...item,
        });
    }
    async delete(request, response) {
        const { id } = request.params;
        const deleteItemProduct = await connection_1.default('item_product').where('id', id).delete();
        if (!deleteItemProduct) {
            return response.status(400).json({ error: 'Product not found.' });
        }
        return response.json({ message: 'Product deleted' });
    }
    async update(request, response) {
        const { id } = request.params;
        const { lot, fabrication_dt, expiration_dt, color, carousel, } = request.body;
        const item = {
            lot,
            fabrication_dt,
            expiration_dt,
            color,
            carousel,
        };
        const updateItemProduct = await connection_1.default('item_product').where('id', id).update(item);
        return response.json({ id: updateItemProduct, ...item });
    }
}
exports.default = ItemProductController;
