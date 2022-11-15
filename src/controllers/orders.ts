import express from 'express'
import {
    getOrdr,
    deleteOrdr,
    getAllOrdrs,
    updateOrdr,
    createOrdr,
    addProductToOrdr,
    getCurrentOrdrs,
} from '../models/order'

const getAllOrders = async (_req: express.Request, res: express.Response) => {
    try {
        const orders = await getAllOrdrs()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getOrder = async (req: express.Request, res: express.Response) => {
    try {
        const order = await getOrdr(parseInt(req.params.id))
        res.status(200).json(order)
    } catch (err) {
        res.status(400).json(err)
    }
}

const createOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { userid, status } = req.body

        if (!userid || !status) {
            return res.status(400).json({
                error: 'Missing one or more required parameters',
            })
        }

        const order = await createOrdr({
            userid: parseInt(userid as string),
            status: status as string,
        })

        res.status(201).json(order)
    } catch (err) {
        res.status(400).json(err)
    }
}

const updateOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { userid, status } = req.body
        const id = req.params.id

        if (!id || !userid || !status) {
            return res.status(400).json({
                error: 'Missing one or more required parameters',
            })
        }

        const order = await updateOrdr({
            id: parseInt(req.params.id as string),
            userid: parseInt(userid as string),
            status: status as string,
        })
        res.status(201).json(order)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteOrder = async (req: express.Request, res: express.Response) => {
    try {
        await deleteOrdr(parseInt(req.params.id as string))
        res.status(200).json({ status: `Deleted order ${req.params.id}` })
    } catch (err) {
        res.status(500).json(err)
    }
}

const addProductToOrder = async (req: express.Request, res: express.Response) => {
    try {
        const orderid = parseInt(req.params.id)
        const productid = parseInt(req.body.Orderid as string)
        const quantity = parseInt(req.body.quantity as string)

        if (!orderid || !productid || !quantity) {
            return res.status(400).json({
                error: 'Missing one or more required parameters',
            })
        }

        const Order = await addProductToOrdr({
            orderid,
            productid,
            quantity,
        })

        res.status(200).json(Order)
    } catch (err) {}
}

const getCurrentOrders = async (req: express.Request, res: express.Response) => {
    try {
        const currentOrders = await getCurrentOrdrs(parseInt(req.params.id as string))
        res.status(200).json(currentOrders)
    } catch (err) {
        res.status(400).json(err)
    }
}

export { getOrder, deleteOrder, getAllOrders, updateOrder, createOrder, addProductToOrder, getCurrentOrders }
