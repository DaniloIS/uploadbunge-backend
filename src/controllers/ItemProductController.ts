import { Request, Response } from 'express';
import knex from '../database/connection';
import { date } from '@hapi/joi';


class ItemProductController {
    async index(request: Request, response: Response) {
        const { page = 1 } = request.query;

        const [count] = await knex('item_product').count();

        const itemProducts = await knex('item_product')
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

    async show(request: Request, response: Response) {
        const { id } = request.params;
        console.log(id);
        const itemProduct = await knex('item_product')
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

    async create(request: Request, response: Response) {
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

        const insertItem = await knex('item_product').insert(item);

        return response.json({
            id: insertItem,
            ...item,
        });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const deleteItemProduct = await knex('item_product').where('id', id).delete();

        if(!deleteItemProduct){
            return response.status(400).json({ error:'Product not found.' })
        }

        return response.json({message: 'Product deleted'})
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const { lot, fabrication_dt, expiration_dt, color, carousel, } = request.body;

        const item = { 
            lot, 
            fabrication_dt, 
            expiration_dt, 
            color, 
            carousel, 
        };

        const updateItemProduct = await knex('item_product').where('id', id).update(item);

        return response.json({id: updateItemProduct, ...item})
    }
}

export default ItemProductController;