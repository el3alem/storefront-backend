import express from 'express'
import { getProdct, deleteProdct, getAllProdcts, updateProdct, createProdct } from '../models/product'

const getAllProducts = async (_req: express.Request, res: express.Response) => {
    try {
        const products = await getAllProdcts()
        res.status(200).json(products)
    } catch (err) {
        res.status(500)
        res.json(err)
    }
}

const getProduct = async (req: express.Request, res: express.Response) => {
    try {
        const product = await getProdct(parseInt(req.params.id))
        res.status(200).json(product)
    } catch (err) {
        res.status(500)
        res.json(err)
    }
}

const createProduct = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                error: 'Product name is required',
            })
        }
        const product = await createProdct({
            name: req.body.name as string,
            price: parseFloat(req.body.price as string),
            category: req.body.category as string,
            description: req.body.description as string,
            url: req.body.url as string,
        })
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                error: 'Product name is required',
            })
        }
        const product = await updateProdct({
            id: parseInt(req.params.id as string),
            name: req.body.name as string,
            price: parseFloat(req.body.price as string),
            category: req.body.category as string,
            description: req.body.description as string,
            url: req.body.url as string,
        })
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        await deleteProdct(parseInt(req.params.id as string))
        res.status(200).json({ status: `Deleted product ${req.params.id}` })
    } catch (err) {
        res.status(500).json(err)
    }
}
export { getProduct, deleteProduct, getAllProducts, updateProduct, createProduct }
