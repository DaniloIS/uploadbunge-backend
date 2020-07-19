import { Request, Response } from 'express';
import knex from '../database/connection';

class ProductsController {
    async index (request: Request, response: Response) {
        const products = await knex('products').select('*');

        const serializedProducts = products.map(product => {
            return {
                ...product,
                image_url: `http://192.168.86.6:3333/uploads/${product.image}`,
            };
        });

        return response.json(serializedProducts);
    }

    async show (request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message:'Point not found.' })
        }

        const serializedPoint =  {
                ...point,
                image_url: `http://192.168.86.6:3333/uploads/${point.image}`,
        };
        
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point: serializedPoint, items });
    }

    async create (request: Request, response: Response) {
        const {
            name,
        } = request.body;
        console.log(request);
        const product = {
            name,
            image: request.file.filename,
        };
        
        const insertedProduct = await knex('products').insert(product);
    
        return response.json({
            id: insertedProduct,
            ...product,
        });
    }
}

export default ProductsController;