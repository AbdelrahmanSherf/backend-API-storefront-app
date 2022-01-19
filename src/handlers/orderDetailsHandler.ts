import express from 'express'
import { OrderDetailsModel } from '../models/orderDetailsModel'
import verifyAuthToken from '../middleware/verifyAuthToken'

const orderDetails = new OrderDetailsModel()

// create - order details 
const create = async (req: express.Request, res: express.Response) => {
    try {
        const { quantity, order_id, product_id } = req.body
        const createOrderDetails = await orderDetails.create(quantity, order_id, product_id)
        return res.status(200).json(createOrderDetails)
    } catch(err) {
        return res.status(500).json(`could not create order details route x500 ${err}`)
    }
}

// show - order details with order id 
const show = async (req: express.Request, res: express.Response) => {
    try {
        const orderId = req.params.id
        const orderDetailsById = await orderDetails.shsow(orderId)
        return res.status(200).json(orderDetailsById)
    } catch(err) {
        return res.status(500).json(`could not show order details route x500 ${err}`)
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
