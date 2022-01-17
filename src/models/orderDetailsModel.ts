import DBConn from '../database'

export type OrderDetails = {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
}

// create order with detials
export class OrderDetailsModel {
    // create new product details
    async create(quantity: number, order_id: number, product_id: number): Promise<OrderDetails> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'INSERT INTO order_details (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const result = await dbConn.query(sqlQuery, [quantity, order_id, product_id])
            return result.rows[0]
        } catch (err) {
            throw new Error('Unable to create order details' + err)
        }
    }

    // show order details by order id
    async shsow(orderid: string): Promise<OrderDetails[]> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'SELECT * FROM order_details WHERE order_details.order_id = ($1)'
            const result = await dbConn.query(sqlQuery, [orderid])
            return result.rows
        } catch(err) {
            throw new Error('Unable to show order details by order id' + err)
        }
    }
}
