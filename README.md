# Storefront Backend Project

# Installation Instructions

## Dev mode

To install the app dep and use the app in dev mode:`yarn && yarn create-dev-db` To run the app in dev mode execute
`yarn start`.

## Test mode

To install the app dep and use the app in test mode:`yarn && yarn create-test-db` To run the tests: `yarn test`.

## Ports

The application runs on port `8080` with database on `5432`.

## Environment variables

NODE_ENV=dev

# DB VARIABLES

POSTGRES_HOST=localhost DEV_POSTGRES_DB=full_stack_dev TEST_POSTGRES_DB=full_stack_test POSTGRES_USER=postgres
POSTGRES_PASSWORD=password143

# BCRYPT VARIABLES

BCRYPT_PASSWORD=balabizo SALT_ROUNDS=10

# JWT

TOKEN_SECRET=francewillwinworldcup!

# create user

sh CREATE USER full stack_user WITH PASSWORD 'Pass1234';

# Or, via SQL query

CREATE DATABASE storefront_db; CREATE DATABASE storefront_test_db;

## **Grant all database privileges to user in both databases**

`sh GRANT ALL PRIVILEGES ON DATABASE storefront_db TO full_stack_user; GRANT ALL PRIVILEGES ON DATABASE
storefront_test_db TO full_stack_user;

# routes

## indRoute

localhost:8080/api/users  
localhost:8080/api/products localhost:8080/api//orders

## userRoute

localhost:8080/api/users

userRoute.get('/', getAllUsers) localhost:8080/api/users/ userRoute.get('/:id', getUser) localhost:8080/api/users/:id
userRoute.post('/create', createUser) localhost:8080/api/users/create userRoute.put('/:id', auth, updateUser)
localhost:8080/api/users/:id userRoute.delete('/:id', auth, deleteUser) localhost:8080/api/users/:id

## productRoute

localhost:8080/api/products

userRoute.get('/', getAllProducts) localhost:8080/api/products/ userRoute.get('/:id', getProduct)
localhost:8080/api/products/:id userRoute.post('/create', createProduct) localhost:8080/api/products/create
userRoute.put('/:id', auth, updateProducts) localhost:8080/api/products/:id userRoute.delete('/:id', auth,
deleteProduct) localhost:8080/api/products/:id

## orderRoute

localhost:8080/api/orders

localhost:8080/api/Orders/ localhost:8080/api/Orders/:id localhost:8080/api/Orders/create localhost:8080/api/Orders/:id
localhost:8080/apiOrders/:id orderRoute.get('/', authToken, getAllOrders) orderRoute.get('/:id', authToken, getOrder)
orderRoute.get('/current-orders/:id', authToken, getCurrentOrders) orderRoute.post('/create', authToken, createOrder)
orderRoute.post('/add-product/:id', authToken, addProductToOrder) orderRoute.put('/:id', authToken, updateOrder)
orderRoute.delete('/:id', authToken, deleteOrder)

# tables

## product

Column | Type | Collation | Nullable | Default
----------+------------------------+-----------+----------+-------------------------------------- id | integer | | not
null | nextval('products_id_seq'::regclass) name | character varying(100) | | not null | price | numeric | | | 0.00
category | character varying(50) | | | Indexes: "products_pkey" PRIMARY KEY, btree (id) Referenced by: TABLE
"order_products" CONSTRAINT "fk_products" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE
CASCADE

## orders

                                 Table "public.orders"

Column | Type | Collation | Nullable | Default
---------+-------------------+-----------+----------+------------------------------------ id | integer | | not null |
nextval('orders_id_seq'::regclass) user_id | integer | | not null | status | character varying | | not null | Indexes:
"orders_pkey" PRIMARY KEY, btree (id) Foreign-key constraints: "fk_orders_users" FOREIGN KEY (user_id) REFERENCES
users(id) ON UPDATE CASCADE ON DELETE CASCADE Referenced by: TABLE "order_products" CONSTRAINT "fk_order" FOREIGN KEY
(order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE

## users

Column | Type | Collation | Nullable | Default
------------+-----------------------+-----------+----------+----------------------------------- id | integer | | not
null | nextval('users_id_seq'::regclass) username | character varying(30) | | not null | first_name | character
varying(50) | | not null | last_name | character varying(50) | | not null | password_d | character varying | | |
Indexes: "users_pkey" PRIMARY KEY, btree (id) Referenced by: TABLE "orders" CONSTRAINT "fk_orders_users" FOREIGN KEY
(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE

## after adding product to order

full_stack_test=# \d products Table "public.products" Column | Type | Collation | Nullable | Default
-------------+------------------------+-----------+----------+-------------------------------------- id | integer | |
not null | nextval('products_id_seq'::regclass) name | character varying(100) | | not null | price | numeric | | | 0.00
category | character varying(50) | | | url | character varying(255) | | | description | text | | | Indexes:
"products_pkey" PRIMARY KEY, btree (id) Referenced by: TABLE "order_products" CONSTRAINT "fk_products" FOREIGN KEY
(product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
