import express from 'express'
import authToken from '../middleware/authorizer'
import {
    getOrder,
    deleteOrder,
    getAllOrders,
    updateOrder,
    createOrder,
    getCurrentOrders,
    addProductToOrder,
} from '../controllers/orders'

const orderRoute = express.Router()

orderRoute.get('/', authToken, getAllOrders)
orderRoute.get('/:id', authToken, getOrder)
orderRoute.get('/current-orders/:id', authToken, getCurrentOrders)
orderRoute.post('/create', authToken, createOrder)
orderRoute.post('/add-product/:id', authToken, addProductToOrder)
orderRoute.put('/:id', authToken, updateOrder)
orderRoute.delete('/:id', authToken, deleteOrder)

export default orderRoute
