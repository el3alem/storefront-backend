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
        console.log(result.id)
        expect(result).toEqual({
            id: 1,
            name: 'Test product',
            price: '30',
            category: 'Test category',
            url: 'http',
            description: 'bag',
        })
    })

    it('should update a product', async () => {
        try {
            const result = await updateProdct({
                id: 1,
                name: 'Test product 2',
                price: 99.99,
                category: 'New category',
                url: 'http',
                description: 'bag',
            })
            console.log(result.id)
            console.log('id')
            expect(result).toEqual({
                id: 1,
                name: 'Test product 2',
                price: '99.99',
                category: 'New category',
                url: 'http',
                description: 'bag',
            })
        } catch (error) {
            console.log(error)
        }
    })

    it('should return a list of products', async () => {
        try {
            const result = await getAllProdcts()
            console.log(result.length)
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
        } catch (error) {
            console.log(error)
        }
    })

    it('should return the correct product', async () => {
        try {
            const result = await getProdct(1)
            console.log(result.name)

            expect(result).toEqual({
                id: 1,
                name: 'Test product 2',
                price: '99.99',
                category: 'New category',
                url: 'http',
                description: 'bag',
            })
        } catch (error) {
            console.log(error)
        }
    })
})
