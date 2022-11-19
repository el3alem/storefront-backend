import { getUsr, deleteUsr, getAllUsrs, updateUsr, createUsr } from '../../models/user'

describe('User Model', () => {
    it('should create a user', async () => {
        const result = await createUsr({
            username: 'sayed',
            first_name: 'abosayed',
            last_name: 'Test',
            password: 'password143',
        })
        expect(result.username).toEqual('sayed')
    })

    it('should update a user', async () => {
        const users = await getAllUsrs()
        const userId = users[0].id

        const result = await updateUsr({
            id: userId,
            username: 'ellol',
            first_name: 'ellol',
            last_name: 'Tester',
            password: 'password143',
        })
        expect(result.username).toEqual('ellol')
    })

    it('should return a list of users', async () => {
        const result = await getAllUsrs()
        expect(result.length).toEqual(1)
    })

    it('should return the correct user', async () => {
        const users = await getAllUsrs()
        const userId = users[0].id as number

        const result = await getUsr(userId)
        expect(result.username).toEqual('ellol')
    })

    it('should delete the user', async () => {
        let users = await getAllUsrs()
        const userId = users[0].id as number

        await deleteUsr(userId)
        users = await getAllUsrs()

        expect(users.length).toEqual(0)
    })
})
