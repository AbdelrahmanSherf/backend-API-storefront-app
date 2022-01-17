import express from 'express'
import { ProductModel } from '../models/productModel'
import verifyAuthToken from '../middleware/verifyAuthToken'

const products = new ProductModel()

// index - product route 
const index = async (_req: express.Request, res: express.Response) => {
    try {
        const indexProducts = await products.index()
        return res.json(indexProducts).status(200)
    } catch(err) {
        return res.json(`could not index product route x500 ${err}`).status(500)
    }
}

// show - product by id route 
const show = async (req: express.Request, res: express.Response ) => {
    try {
        const userId = req.params.id
        const productById = await products.show(userId)
        return res.json(productById).status(200)
    } catch(err) {
        return res.json(`could not show product route x500 ${err}`).status(500)
    }
}

// create - product route 
const create = async (req: express.Request, res: express.Response) => {
    try {
        const { product_name, price } = req.body;
        const createNewProduct = await products.create(product_name, price)
        return res.json(createNewProduct).status(200)
    } catch(err) {
        return res.json(`could not create product route x500 ${err}`).status(500)
    }
}

// product routes 
const productRoutes = (app: express.Application) => {
    // create - token required
    app.post('/product',verifyAuthToken, create)
    // index
    app.get('/product', index)
    // show
    app.get('/product/:id', show)
}

export default productRoutes