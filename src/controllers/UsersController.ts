import { Request, Response } from 'express';
import knex from '../database/connection';

class UsersController {
    async index(request: Request, response: Response) {
        const users = await knex('users').select('*');

        return response.json(users);
    }

    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;
        const emailExists = await knex('users').select('users.email').where('users.email', email).first();
        const firstUser = await knex('users').select('*').first();

        if(!emailExists){
            if(!firstUser){
                const user = {
                    name,
                    email,
                    password,
                    admin: 1
                };

                const insertUser = await knex('users').insert(user)
                
                return response.json({id: insertUser, ...user,});
            }else{
                const user = {
                    name,
                    email,
                    password,
                    admin: 0
                };
    
                const insertUser = await knex('users').insert(user)
                
                return response.json({id: insertUser, ...user,});
            }
        }else{
            return response.status(401).json({ error: 'Email already registered!' });
        }
        

    }
}

export default UsersController;