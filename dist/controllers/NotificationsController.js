"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class NotificationController {
    async index(request, response) {
        const notifications = await connection_1.default('notifications').select('*');
        return response.json(notifications);
    }
    async show(request, response) {
        const { id } = request.params;
        const notification = await connection_1.default('notifications').where('id', id);
        return response.json(notification);
    }
    async create(request, response) {
        const date = new Date();
        const dateTime = Date.parse(String(date));
        const products = await connection_1.default('item_product')
            .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
            .join('products', 'products.id', '=', 'item_product.product_id')
            .select([
            'item_product.*',
            'products.name',
            'products.image',
            'shelves.shelf',
            'shelves.rack'
        ])
            .where('item_product.expired', null);
        const serializedProducts = products.map(item => {
            return {
                ...item,
                timestamp: `${Date.parse(String(item.expiration_dt))}`,
            };
        });
        const filterProducts = serializedProducts.filter(product => product.timestamp <= dateTime);
        if (!filterProducts.length) {
            return response.json('Not Product expired!');
        }
        const productId = [];
        for (var i = 0; i < filterProducts.length; i++) {
            productId[i] = filterProducts[i].id;
        }
        const notification = {
            title: 'Produto Vencido',
            description: `${filterProducts.length} produtos vencidos`,
            date: date,
            viewed: 0,
            item_product_id: `${productId}`
        };
        const insertNotification = await connection_1.default('notifications').insert(notification);
        for (var i = 0; i < productId.length; i++) {
            const updateExpired = await connection_1.default('item_product').where('id', productId[i]).update('expired', 1);
        }
        return response.json(notification);
    }
}
exports.default = NotificationController;
