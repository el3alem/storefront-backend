import express from 'express'
import { getUser, deleteUser, getAllUsers, updateUser, createUser } from '../controllers/users'
import auth from '../middleware/authorizer'

const userRoute = express.Router()

userRoute.get('/', auth, getAllUsers)
userRoute.get('/:id', auth, getUser)
userRoute.post('/create', createUser)
userRoute.put('/:id', auth, updateUser)
userRoute.delete('/:id', auth, deleteUser)

export default userRoute
