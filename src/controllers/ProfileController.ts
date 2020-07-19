import { Request, Response } from 'express';
import knex from '../database/connection';

class ProfileController {
    async index(request: Request, response: Response) {
        const { email, password } = request.body;

        const user = await knex('users').select('*').where({email: email, password: password});

        if(!user[0]){
            return response.json('Incorrect email or password');
        }

        return response.json(user);
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const user = await knex('users').where('id', id);
    
        return response.json(user);
    }

    async update(request: Request, response: Response){
        const { id } = request.params;

        const { name, email, password } = request.body;

        const user = {
            name,
            email,
            password,
        }

        const updateUser = await knex('users').where('id', id).update(user);
    
        return response.json(user);
    }
}

export default ProfileController;