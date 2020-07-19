"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const ProfileController_1 = __importDefault(require("./controllers/ProfileController"));
const ShelvesController_1 = __importDefault(require("./controllers/ShelvesController"));
const ProductsController_1 = __importDefault(require("./controllers/ProductsController"));
const ItemProductController_1 = __importDefault(require("./controllers/ItemProductController"));
const SearchController_1 = __importDefault(require("./controllers/SearchController"));
const NotificationsController_1 = __importDefault(require("./controllers/NotificationsController"));
const routes = express_1.default.Router();
const upload = multer_1.default(multer_2.default);
const usersController = new UsersController_1.default();
const profileController = new ProfileController_1.default();
const shelvesController = new ShelvesController_1.default();
const productsController = new ProductsController_1.default();
const itemProductController = new ItemProductController_1.default();
const searchController = new SearchController_1.default();
const notificationsController = new NotificationsController_1.default();
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
routes.post('/products', upload.single('image'), celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
    })
}, {
    abortEarly: false
}), productsController.create);
routes.get('/item_product', itemProductController.index);
routes.get('/item_product/:id', itemProductController.show);
routes.post('/item_product', itemProductController.create);
routes.put('/item_product/:id', itemProductController.update);
routes.delete('/item_product/:id', itemProductController.delete);
routes.get('/search', searchController.index);
routes.get('/notifications', notificationsController.index);
routes.post('/notifications', notificationsController.create);
exports.default = routes;
