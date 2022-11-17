// @ts-ignore
import pool from '../utils/database'
import { User } from '../interfaces/userInterface'

const getAllUsrs = async (): Promise<User[]> => {
    try {
        // @ts-ignore
        const connection = await pool.connect()
        const sql = 'SELECT * FROM users'
        const result = await connection.query(sql)
        connection.release()

        return result.rows
    } catch (err) {
        throw new Error(`Could not get users. Error: ${err}`)
    }
}

const getUsr = async (id: number): Promise<User> => {
    try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const connection = await pool.connect()
        const result = await connection.query(sql, [id])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
}

const createUsr = async (u: User): Promise<User> => {
    try {
        // @ts-ignore
        const connection = await pool.connect()
        const sql = 'INSERT INTO users (username, first_name, last_name, password_d) VALUES($1, $2, $3, $4) RETURNING *'

        const result = await connection.query(sql, [u.username, u.first_name, u.last_name, u.password])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`)
    }
}

const updateUsr = async (u: User): Promise<User> => {
    try {
        // @ts-ignore
        const connection = await pool.connect()
        const sql = `UPDATE users SET username = $2, first_name = $3, last_name = $4, password_d = $5 WHERE id = $1 RETURNING *`

        const result = await connection.query(sql, [u.id, u.username, u.first_name, u.last_name, u.password])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not update user ${u.id}. Error: ${err}`)
    }
}

const deleteUsr = async (id: number): Promise<User> => {
    try {
        // @ts-ignore
        const connection = await pool.connect()
        const sql = 'DELETE FROM users WHERE id=($1)'
        const result = await connection.query(sql, [id])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
}
export { getUsr, deleteUsr, getAllUsrs, updateUsr, createUsr }
