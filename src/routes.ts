import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer'; 

import UsersController from './controllers/UsersController';
import ProfileController from './controllers/ProfileController';
import ShelvesController from './controllers/ShelvesController';
import ProductsController from './controllers/ProductsController';
import ItemProductController from './controllers/ItemProductController';
import SearchController from './controllers/SearchController';
import NotificationsController from './controllers/NotificationsController';

const routes = express.Router();
const upload = multer(multerConfig);

const usersController = new UsersController();
const profileController = new ProfileController();
const shelvesController = new ShelvesController();
const productsController = new ProductsController();
const itemProductController = new ItemProductController();
const searchController = new SearchController();
const notificationsController = new NotificationsController();

routes.get('/users', usersController.index);
routes.post('/users', usersController.create);

routes.post('/profile', profileController.index);
routes.get('/profile/:id', profileController.show);
routes.put('/profile/:id', profileController.update);

routes.get('/shelves', shelvesController.index);
routes.get('/shelfs', shelvesController.show);
routes.get('/racks', shelvesController.showRacks);
routes.get('/shelf', shelvesController.showShelf);
routes.post('/shelves', shelvesController.create);

routes.get('/products', productsController.index);
routes.post(
    '/products',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    productsController.create
);

routes.get('/item_product', itemProductController.index);
routes.get('/item_product/:id', itemProductController.show);
routes.post('/item_product', itemProductController.create);
routes.put('/item_product/:id', itemProductController.update);
routes.delete('/item_product/:id', itemProductController.delete);

routes.get('/search', searchController.index);

routes.get('/notifications', notificationsController.index);
routes.post('/notifications', notificationsController.create);

export default routes;