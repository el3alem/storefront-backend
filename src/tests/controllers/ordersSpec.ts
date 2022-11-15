import supertest from 'supertest'
import app from '../../server'
import { createJWTToken } from '../../utils/authentication'

const request = supertest(app)
const token: string = createJWTToken(1, 'Ahly')

describe('Orderscontroller: ', () => {
    it('return new order ', () => {
        const data = {
            user_id: 1,
            status: 'new',
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Ahly ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                user_id: 1,
                status: 'new',
            })
    })

    it('add product to order', () => {
        const data = {
            product_id: 1,
            quantity: 10,
        }
        request
            .post('/api/orders/add-product/1')
            .set('Authorization', `Ahly ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 10,
            })
    })

    it(' fail bec user_id is not included', () => {
        const data = {
            status: 'new',
        }
        request.post('/api/orders/create').set('Authorization', `Ahly ${token}`).send(data).expect(400).expect({
            error: 'Missing one or more required parameters',
        })
    })

    it('/orders/create should fail if status is not included in parameters', () => {
        const data = {
            user_id: 1,
        }
        request.post('/api/orders/create').set('Authorization', `Ahly ${token}`).send(data).expect(400).expect({
            error: 'Missing one or more required parameters',
        })
    })

    it('/orders should show all orders', () => {
        request.get('/api/orders').expect('Content-Type', 'application/json').expect(200).expect({
            id: 1,
            user_id: 1,
            status: 'new',
        })
    })

    it('/orders/:id show a order', () => {
        request
            .get('/api/orders/1')
            .set('Authorization', `Ahly ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: 'new',
            })
    })

    it('/orders should update an order', () => {
        const data = {
            id: 1,
            user_id: 1,
            status: 'in progress',
        }
        request
            .put('/api/orders/1')
            .set('Authorization', `Ahly ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: 'in progress',
            })
    })

    it('/orders/:id should delete an order given its id', () => {
        request.delete('/api/orders/1').set('Authorization', `Ahly ${token}`).expect(200).expect({
            id: 1,
            user_id: 1,
            status: 'in progress',
        })
    })

    it('show not completed orders', () => {
        request
            .get('/api/orders/current-order/1')
            .set('Authorization', `Ahly ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: 'in progress',
            })
    })
})
