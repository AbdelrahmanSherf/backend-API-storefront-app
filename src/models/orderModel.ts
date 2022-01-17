import DBConn from '../database'

export type Order = {
    id?: number;
    user_id: number;
    order_status: string;
}

export class OrderModel {
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
    async show(userId: string): Promise<Order[]> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'SELECT orders.id, orders.order_status FROM orders INNER JOIN users on users.id = orders.user_id WHERE users.id = ($1)'
            const result = await dbConn.query(sqlQuery, [userId])
            console.log(result.rows, 'from model show method')
            dbConn.release()
            return result.rows
        } catch(err) {
            throw new Error('Unable to show order by user id' + err)
        }
    }
}