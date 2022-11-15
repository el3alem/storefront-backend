// @ts-ignore
import pool from '../utils/database'
import Product from '../interfaces/productInterface'

const getAllProdcts = async (): Promise<Product[]> => {
    try {
        // @ts-ignore
        const connection = await pool.connect()
        const sql = 'SELECT * FROM products'

        const result = await connection.query(sql)
        connection.release()

        return result.rows
    } catch (err) {
        throw new Error(`Could not get products. Error: ${err}`)
    }
}

const getProdct = async (id: number): Promise<Product> => {
    try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        // @ts-ignore
        const connection = await pool.connect()

        const result = await connection.query(sql, [id])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
}

const createProdct = async (p: Product): Promise<Product> => {
    try {
        const sql =
            'INSERT INTO products (name, price, category, url, description) VALUES($1, $2, $3, $4, $5) RETURNING *'
        // @ts-ignore
        const connection = await pool.connect()

        const result = await connection.query(sql, [p.name, p.price, p.category, p.url, p.description])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
    }
}

const updateProdct = async (p: Product): Promise<Product> => {
    try {
        const sql = `UPDATE products SET name = $2, price = $3, category = $4 WHERE id = $1 RETURNING *`
        // @ts-ignore
        const connection = await pool.connect()
        const result = await connection.query(sql, [p.id, p.name, p.price, p.category])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not update product ${p.id}. Error: ${err}`)
    }
}

const deleteProdct = async (id: number): Promise<Product> => {
    try {
        const sql = 'DELETE FROM products WHERE id=($1)'
        // @ts-ignore
        const conn = await pool.connect()

        const result = await conn.query(sql, [id])
        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
}

export { getProdct, deleteProdct, getAllProdcts, updateProdct, createProdct }
