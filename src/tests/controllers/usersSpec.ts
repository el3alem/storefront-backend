import superpass from 'supertest'
import app from '../../server'
import { createJWTToken } from '../../utils/authentication'

const request = superpass(app)
const token: string = createJWTToken(1, 'Ahly')

describe('Users controllers: ', () => {
    it('return user', () => {
        const data = {
            username: 'elalemm',
            first_name: 'omar',
            last_name: 'elalem',
            password: 'pass1234',
        }
        request.post('/api/users/create').send(data).expect('Content-Type', 'application/json').expect(201).expect({
            id: 1,
            username: 'elalemm',
            first_name: 'omar',
            last_name: 'elalem',
        })
    })

    it('fail-username not sent', () => {
        const data = {
            first_name: 'omar',
            last_name: 'elalem',
            password: 'pass1234',
        }
        request
            .post('/api/users/create')
            .set('Authorization', `Ahly ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'Missing username or password',
            })
    })

    it('fail- password not sent', () => {
        const data = {
            username: 'elalemm',
            first_name: 'omar',
            last_name: 'elalem',
        }
        request
            .post('/api/users/create')
            .set('Authorization', `Ahly ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'Missing username or password',
            })
    })

    it('all users', () => {
        request
            .get('/api/users')
            .set('Authorization', `Ahly ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
                {
                    id: 1,
                    username: 'elalemm',
                    first_name: 'omar',
                    last_name: 'elalem',
                },
            ])
    })

    it('show user', () => {
        request
            .get('/api/users/1')
            .set('Authorization', `Ahly ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                first_name: 'omar',
                last_name: 'elalem',
                password_digest: 'pass1234',
            })
    })

    it('should update user', () => {
        const data = {
            username: 'cristiano',
            first_name: 'cristiano',
            last_name: 'ronaldo',
            password_digest: 'pass1234',
        }
        request
            .put('/api/users/1')
            .set('Authorization', `Ahly ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                username: 'cristiano',
                first_name: 'cristiano',
                last_name: 'ronaldo',
                password_digest: 'pass1234',
            })
    })

    it('/users/:id should delete a user', () => {
        request.delete('/api/users/1').expect(200).expect({
            status: 'Deleted user 1',
        })
    })
})
