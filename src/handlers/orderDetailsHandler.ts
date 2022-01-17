import express from 'express'
import { OrderDetailsModel } from '../models/orderDetailsModel'
import verifyAuthToken from '../middleware/verifyAuthToken'
import app from '../server'

const orderDetails = new OrderDetailsModel()

// create - order details 
const create = async (req: express.Request, res: express.Response) => {
    try {
        const { quantity, order_id, product_id } = req.body
        const createOrderDetails = await orderDetails.create(quantity, order_id, product_id)
        return res.json(createOrderDetails).status(200)
    } catch(err) {
        return res.json(`could not create order details route x500 ${err}`).status(500)
    }
}

// show - order details with order id 
const show = async (req: express.Request, res: express.Response) => {
    try {
        const orderId = req.params.id
        const orderDetailsById = await orderDetails.shsow(orderId)
        return res.json(orderDetailsById).status(200)
    } catch(err) {
        return res.json(`could not show order details route x500 ${err}`).status(500)
    }
}

// order details routes
const orderDetailsRoute = async (app: express.Application) => {
    // create route - token required
    app.post('/order-details', verifyAuthToken, create)
    // show route - token required
    app.get('/order-details/:id', verifyAuthToken, show)
}

export default orderDetailsRoute
