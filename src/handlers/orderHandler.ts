import express from 'express'
import { OrderModel } from '../models/orderModel'
import verifyAuthToken from '../middleware/verifyAuthToken'

const orders = new OrderModel()

// create - new order
const create = async (req: express.Request, res: express.Response) => {
    try {
        const { user_id, order_status } = req.body
        const createOrder = await orders.create(user_id, order_status)
        return res.json(createOrder).status(200)
    } catch(err) {
        return res.json(`could not create order route x500 ${err}`).status(500)
    }
}

// show - order by user id 
// returns quantity, orderID, productID
const show = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id
        const orderById = await orders.show(userId)
        console.log(orderById)
        return res.json(orderById).status(200)
    } catch (err) {
        return res.json(`could not show order route x500 ${err}`).status(500)
    }
}

// order routes 
const orderRoutes = async (app: express.Application) => {
    // create route - token required
    app.post('/order', create)
    // show - token required 
    app.get('/order/:id', show)
}

export default orderRoutes
