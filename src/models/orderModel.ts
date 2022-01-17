import DBConn from '../database'

export type Order = {
    id?: number;
    user_id: number;
    order_status: string;
}

export type OrderDetails = {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
}

export class orderModel {
    // create - new order with user id and status
    async create(user_id: number, order_status: string): Promise<Order> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *'
            const result = await dbConn.query(sqlQuery, [user_id, order_status])
            dbConn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error('Unable to create new order' + err)
        }
    }
    // show - fetch orders by user id
    // refactor refactor refactor  determine the returing type after u test it with postmen
    // refactor refactor refactor  determine the returing type after u test it with postmen
    // refactor refactor refactor  determine the returing type after u test it with postmen
    // refactor refactor refactor  determine the returing type after u test it with postmen
    // refactor refactor refactor  determine the returing type after u test it with postmen
    async show(userId: string) {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'SELECT quantity, order_id, product_id FROM order_details INNER JOIN orders on order_details.order_id = orders.id WHERE orders.user_id = ($1)'
            const result = await dbConn.query(sqlQuery, [userId])
            dbConn.release()
            return result.rows[0]
        } catch(err) {

        }
    }
    // create order with detials
}