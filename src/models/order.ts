// @ts-ignore
import pool from '../utils/database'
import { Order, ProductToOrder } from '../interfaces/orderInterface'

const getAllOrdrs = async (): Promise<Order[]> => {
    try {
        // @ts-ignore
        const connection = await pool.connect()
        const sql = 'SELECT * FROM orders'

        const result = await connection.query(sql)
        connection.release()

        return result.rows
    } catch (err) {
        throw new Error(`Could not get orders. Error: ${err}`)
    }
}

const getOrdr = async (id: number): Promise<Order> => {
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const connection = await pool.connect()

        const result = await connection.query(sql, [id])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
}

const createOrdr = async (o: Order): Promise<Order> => {
    try {
        const sql = 'INSERT INTO orders (userid, status) VALUES($1, $2) RETURNING *'
        // @ts-ignore
        const connection = await pool.connect()

        const result = await connection.query(sql, [o.userid, o.status])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not add new order. Error: ${err}`)
    }
}

const updateOrdr = async (o: Order): Promise<Order> => {
    try {
        const sql = `UPDATE orders SET userid = $2, status = $3 WHERE id = $1 RETURNING *`
        // @ts-ignore
        const connection = await pool.connect()

        const result = await connection.query(sql, [o.id, o.userid, o.status])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not update order ${o.id}. Error: ${err}`)
    }
}

const deleteOrdr = async (id: number): Promise<Order> => {
    try {
        // @ts-ignore
        const conn = await pool.connect()
        const sql = 'DELETE FROM products WHERE id=($1)'

        const result = await conn.query(sql, [id])
        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
}

const getCurrentOrdrs = async (id: number) => {
    try {
        // @ts-ignore
        const conn = await pool.connect()
        const sql = `SELECT *
                         FROM orders
                         WHERE userid = ($1);`
        const result = await conn.query(sql, [id])
        conn.release()

        return result.rows
    } catch (err) {
        throw new Error(`Could not get orders for user ${id}. Error: ${err}`)
    }
}

const addProductToOrdr = async (p: ProductToOrder): Promise<ProductToOrder> => {
    try {
        const sql = 'INSERT INTO order_products (orderid, productid, quantity) VALUES($1, $2, $3) RETURNING *'
        // @ts-ignore
        const connection = await pool.connect()

        const result = await connection.query(sql, [p.orderid, p.productid, p.quantity])
        connection.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not add product. Error: ${err}`)
    }
}
export { getOrdr, deleteOrdr, getAllOrdrs, updateOrdr, createOrdr, addProductToOrdr, getCurrentOrdrs }
