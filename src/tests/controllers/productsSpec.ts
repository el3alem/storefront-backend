import supertest from 'supertest'
import app from '../../server'
import { createJWTToken } from '../../utils/authentication'

const request = supertest(app)
const token: string = createJWTToken(1, 'Ahly')

describe('Productcontroller: ', () => {
    it('new user', () => {
        const data = {
            name: 'Test',
            price: 40.0,
            category: 'category a',
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Ahly ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
                id: 1,
                name: 'Test',
                price: '$40.00',
                category: 'category a',
            })
    })

    it('fail-name not included', () => {
        const data = {
            name: 'Test',
            price: 40.0,
            category: 'category b',
        }
        request.post('/api/products/create').set('Authorization', `Ahly ${token}`).send(data).expect(400).expect({
            error: 'Error: Product name is required',
        })
    })

    it('show all products', () => {
        request.get('/api/products').expect('Content-Type', /json/).expect(200).expect({
            id: 1,
            name: 'Test',
            price: 40.0,
            category: 'category a',
        })
    })

    it('show product', () => {
        request.get('/api/products/1').expect('Content-Type', /json/).expect(200).expect({
            id: 1,
            name: 'Test',
            price: 40.0,
            category: 'category a',
        })
    })

    it('update product', () => {
        const data = {
            name: 'Test edited',
            price: 50.0,
        }
        request
            .put('/api/products/1')
            .set('Authorization', `Ahly ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                name: 'Test edited',
                price: 50.0,
                category: 'category a',
            })
    })

    it('delete product', () => {
        request
            .delete('/api/products/1')
            .set('Authorization', `Ahly ${token}`)
            .expect(200)
            .then(() => {
                request.get('/api/products').expect({})
            })
    })
})
