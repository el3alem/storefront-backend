import express from 'express'
import jwt from 'jsonwebtoken'
import { getUsr, deleteUsr, getAllUsrs, updateUsr, createUsr } from '../models/user'
import bcrypt from 'bcrypt'

const pepper: string = process.env.BCRYPT_PASSWORD as string
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string)

const getAllUsers = async (_req: express.Request, res: express.Response) => {
    try {
        const users = await getAllUsrs()
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json(err)
    }
}

const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsr(parseInt(req.params.id))

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json('user not found')
        }
    } catch (err) {
        // @ts-ignore
        res.status(400).json({ e: e.toString() })
    }
}

const createUser = async (req: express.Request, res: express.Response) => {
    try {
        if (!(req.body.username || !req.body.password)) {
            return res.status(400).json({
                error: 'Missing username or password',
            })
        }

        const hashedPassword = bcrypt.hashSync(req.body.password + pepper, saltRounds)

        const user = await createUsr({
            username: req.body.username as string,
            first_name: req.body.first_name as string,
            last_name: req.body.last_name as string,
            password: hashedPassword,
        })
        delete user.password_digest

        // @ts-ignore
        user.token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET as string)
        res.status(201).json(user)
    } catch (err) {
        return res.status(400).json(err)
    }
}

const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                error: 'Missing required parameters',
            })
        }
        const user = await updateUsr({
            id: parseInt(req.params.id as string),
            username: req.body.username as string,
            first_name: req.body.first_name as string,
            last_name: req.body.last_name as string,
            password: req.body.password as string,
        })
        delete user.password_digest

        res.status(201).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}

const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        await deleteUsr(parseInt(req.params.id as string))
        res.status(200).json({ status: `Deleted user ${req.params.id}` })
    } catch (err) {
        res.status(500).json(err)
    }
}

export { getUser, deleteUser, getAllUsers, updateUser, createUser }
