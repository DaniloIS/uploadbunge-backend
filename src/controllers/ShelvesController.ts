import { Request, Response } from 'express';
import knex from '../database/connection';
import { boolean, number } from '@hapi/joi';

class ShelvesController {
    async index(request: Request, response: Response) {
        const shelves = await knex('shelves').select('*');

        return response.json(shelves);
    }

    async show(request: Request, response: Response) {
        const shelves = await knex('shelves').select('shelves.shelf').distinct();

        return response.json(shelves);
    }

    async showRacks(request: Request, response: Response) {
        const shelf = request.query.shelf;
        const racks = await knex('shelves').select('shelves.rack').where('shelf', String(shelf)).distinct();
        
        return response.json(racks);
    }

    async showShelf(request: Request, response: Response) {
        const { shelf, rack } = request.query;
        const shelfId = await knex('shelves')
            .select('shelves.id')
            .where('shelf', String(shelf))
            .where('rack', String(rack))
            .first()
        
        return response.json(shelfId);
    }

    async create(request: Request, response: Response) {
        const userId = request.headers.authorization;
        const { shelf, rack } = request.body;
        
        const shelfExists = await knex('shelves').select('shelf').where({shelf: shelf, rack: rack}).first();
        const admPermission = await knex('users').select('users.admin').where({id: userId}).first();
        
        if(!shelfExists){
            if(admPermission.admin == 1){
                const shelves = {
                    shelf,
                    rack,
                };

                const insertShelf = await knex('shelves').insert(shelves);
                
                return response.json({id: insertShelf, ...shelves,});
            }else{
                return response.status(401).json({ error: 'You do not have administrator permission!' });
            }
        }else{
            return response.status(401).json({ error: 'Shelf already registered!' });
        }
        

    }
}

export default ShelvesController;