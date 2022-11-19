import express from 'express'
import { getProduct, deleteProduct, getAllProducts, updateProduct, createProduct } from '../controllers/products'
import authToken from '../middleware/authorizer'

const prodRoute = express.Router()

prodRoute.get('/', getAllProducts)
prodRoute.get('/:id', getProduct)
prodRoute.post('/create', authToken, createProduct)
prodRoute.put('/:id', updateProduct)
prodRoute.delete('/:id', authToken, deleteProduct)

export default prodRoute
