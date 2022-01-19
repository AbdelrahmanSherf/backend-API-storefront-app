import express from 'express'
import { OrderModel } from '../models/orderModel'
import verifyAuthToken from '../middleware/verifyAuthToken'

const orders = new OrderModel()

// create - new order
const create = async (req: express.Request, res: express.Response) => {
    try {
        const { user_id, order_status } = req.body
        const createOrder = await orders.create(user_id, order_status)
        return res.status(200).json(createOrder)
    } catch(err) {
        return res.status(500).json(`could not create order route x500 ${err}`)
    }
}

// show - order by user id 
// returns quantity, orderID, productID
const show = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id
        const orderById = await orders.show(userId)
        // console.log(orderById) // debugging
        return res.status(200).json(orderById)
    } catch (err) {
        return res.status(500).json(`could not show order route x500 ${err}`)
    }
}

// order routes 
const orderRoutes = async (app: express.Application) => {
    // create route - token required
    app.post('/order', verifyAuthToken, create)
    // show - token required 
    app.get('/order/:id', verifyAuthToken, show)
}

export default orderRoutes
