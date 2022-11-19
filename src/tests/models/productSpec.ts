import { getProdct, deleteProdct, getAllProdcts, updateProdct, createProdct } from '../../models/product'

describe('Product Model', () => {
    it('should create a product', async () => {
        const result = await createProdct({
            name: 'Test product',
            price: 30.0,
            category: 'Test category',
            url: 'http',
            description: 'bag',
        })
        expect(result).toEqual({
            id: 1,
            name: 'Test product',
            price: '30.00',
            category: 'Test category',
            url: 'http',
            description: 'bag',
        })
    })

    it('should update a product', async () => {
        const result = await updateProdct({
            id: 1,
            name: 'Test product 2',
            price: 99.99,
            category: 'New category',
            url: 'http',
            description: 'bag',
        })
        expect(result).toEqual({
            id: 1,
            name: 'Test product 2',
            price: '99.99',
            category: 'New category',
            url: 'http',
            description: 'bag',
        })
    })

    it('should return a list of products', async () => {
        const result = await getAllProdcts()
        expect(result).toEqual([
            {
                id: 1,
                name: 'Test product 2',
                price: '99.99',
                category: 'New category',
                url: 'http',
                description: 'bag',
            },
        ])
    })

    it('should return the correct product', async () => {
        const result = await getProdct(1)
        expect(result).toEqual({
            id: 1,
            name: 'Test product 2',
            price: '99.99',
            category: 'New category',
            url: 'http',
            description: 'bag',
        })
    })

    it('should delete the product', async () => {
        await deleteProdct(1)
        const result = await getAllProdcts()

        expect(result).toEqual([])
    })
})
