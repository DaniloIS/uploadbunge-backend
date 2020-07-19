"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class SearchController {
    async index(request, response) {
        const { page = 1, search, shelf, rack, expired } = request.query;
        console.log({ page, search, shelf, rack, expired });
        if (!search && !shelf && !rack && !expired) {
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
        if (search && !shelf && !rack && !expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('products.name', String(search))
                .count();
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
            ])
                .where('products.name', String(search));
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (!search && shelf && !rack && !expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('shelves.shelf', String(shelf))
                .count();
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
            ])
                .where('shelves.shelf', String(shelf));
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (!search && shelf && rack && !expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('shelves.shelf', String(shelf))
                .where('shelves.rack', Number(rack))
                .count();
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
            ])
                .where('shelves.shelf', String(shelf))
                .where('shelves.rack', Number(rack));
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (!search && !shelf && !rack && expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1)
                .count();
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
            ])
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1);
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (search && shelf && rack && expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('products.name', String(search))
                .where('shelves.shelf', String(shelf))
                .where('shelves.rack', Number(rack))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1)
                .count();
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
            ])
                .where('products.name', String(search))
                .where('shelves.shelf', String(shelf))
                .where('shelves.rack', Number(rack))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1);
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (search && shelf && !rack && !expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('products.name', String(search))
                .where('shelves.shelf', String(shelf))
                .count();
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
            ])
                .where('products.name', String(search))
                .where('shelves.shelf', String(shelf));
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (search && shelf && rack && !expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('products.name', String(search))
                .where('shelves.shelf', String(shelf))
                .where('shelves.rack', Number(rack))
                .count();
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
            ])
                .where('products.name', String(search))
                .where('shelves.shelf', String(shelf))
                .where('shelves.rack', Number(rack));
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (search && shelf && !rack && expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('products.name', String(search))
                .where('shelves.shelf', String(shelf))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1)
                .count();
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
            ])
                .where('products.name', String(search))
                .where('shelves.shelf', String(shelf))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1);
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (search && !shelf && !rack && expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('products.name', String(search))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1)
                .count();
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
            ])
                .where('products.name', String(search))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1);
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (!search && shelf && rack && expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('shelves.shelf', String(shelf))
                .where('shelves.rack', Number(rack))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1)
                .count();
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
            ])
                .where('shelves.shelf', String(shelf))
                .where('shelves.rack', Number(rack))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1);
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        if (!search && shelf && !rack && expired) {
            const [count] = await connection_1.default('item_product')
                .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
                .join('products', 'products.id', '=', 'item_product.product_id')
                .where('shelves.shelf', String(shelf))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1)
                .count();
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
            ])
                .where('shelves.shelf', String(shelf))
                .where('item_product.expired', expired === '1' ? 1 : expired === '0' ? null : 1);
            if (!itemProducts.length) {
                return response.json('Product not found!');
            }
            const serializedItems = itemProducts.map(item => {
                return {
                    ...item,
                    image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
                };
            });
            response.header('X-Total-Count', count['count(*)']);
            return response.json(serializedItems);
        }
        /*const [count] = await knex('item_product')
            .join('shelves', 'shelves.id', '=', 'item_product.shelf_id')
            .join('products', 'products.id', '=', 'item_product.product_id')
            .where('products.name', String(search))
            .where('shelves.shelf', String(shelf))
            .where('item_product.expired', expired? String(expired): null)
            .count();

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
            ])
            .where('shelves.shelf', String(shelf))
            .where('products.name', String(search))
            .where('item_product.expired', expired? 1 : null);
            //.where('item_product.expired', expired === '' ? 'item_product.expired' : expired === '0' ? null : 1);

        if(!itemProducts.length){
            return response.json('Product not found!');
        }

        const serializedItems = itemProducts.map(item => {
            return {
                ...item,
                image_url: `http://192.168.86.6:3333/uploads/${item.image}`,
            };
        });
        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(itemProducts);*/
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
}
exports.default = SearchController;
