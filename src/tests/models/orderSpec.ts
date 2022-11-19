import {
    getOrdr,
    deleteOrdr,
    getAllOrdrs,
    updateOrdr,
    createOrdr,
    addProductToOrdr,
    getCurrentOrdrs,
} from '../../models/order'
import { getProdct, deleteProdct, getAllProdcts, updateProdct, createProdct } from '../../models/product'
import { getUsr, deleteUsr, getAllUsrs, updateUsr, createUsr } from '../../models/user'

let productId: number, userId: number

describe('Order Model', () => {
    beforeAll(async () => {
        const product = await createProdct({
            name: 'Superman bag',
            price: 40.0,
            category: 'Bag',
            url: 'http',
            description: 'bag',
        })
        productId = product.id as number
        const user = await createUsr({
            username: 'sayed',
            first_name: 'sayed',
            last_name: 'Test',
            password: 'password123',
        })
        userId = user.id as number
    })

    afterAll(async () => {
        await deleteProdct(productId)
        await deleteUsr(userId)
    })

    it('should create an order', async () => {
        const result = await createOrdr({
            // productid: productId,
            // quantity: 10,
            userid: userId,
            status: 'new',
        })
        expect(result).toEqual({
            id: 1,
            // productid: productId,
            // quantity: 10,
            userid: userId,
            status: 'new',
        })
    })

    it('should return a list of orders', async () => {
        const result = await getAllOrdrs()
        expect(result).toEqual([
            {
                id: 1,
                // productid: productId,
                // quantity: 10,
                userid: userId,
                status: 'new',
            },
        ])
    })

    it('should return the correct order', async () => {
        const result = await getOrdr(1)
        expect(result).toEqual({
            id: 1,
            // productid: productId,
            // quantity: 10,
            userid: userId,
            status: 'new',
        })
    })

    it('should update order status', async () => {
        const result = await updateOrdr({
            id: 1,
            // productid: productId,
            // quantity: 10,
            userid: userId,
            status: 'complete',
        })
        expect(result).toEqual({
            id: 1,
            // productid: productId,
            // quantity: 10,
            userid: userId,
            status: 'complete',
        })
    })

    it('should delete the order', async () => {
        await deleteOrdr(1)
        const result = await getAllOrdrs()
        expect(result).toEqual([])
    })
})
