import express from 'express'
import { ProductModel } from '../models/productModel'
import verifyAuthToken from '../middleware/verifyAuthToken'

const products = new ProductModel()

// index - product route 
const index = async (_req: express.Request, res: express.Response) => {
    try {
        const indexProducts = await products.index()
        return res.status(200).json(indexProducts)
    } catch(err) {
        return res.status(500).json(`could not index product route x500 ${err}`)
    }
}

// show - product by id route 
const show = async (req: express.Request, res: express.Response ) => {
    try {
        const userId = req.params.id
        const productById = await products.show(userId)
        return res.status(200).json(productById)
    } catch(err) {
        return res.status(500).json(`could not show product route x500 ${err}`)
    }
}

// create - product route 
const create = async (req: express.Request, res: express.Response) => {
    try {
        const { product_name, price } = req.body;
        const createNewProduct = await products.create(product_name, price)
        return res.status(200).json(createNewProduct)
    } catch(err) {
        return res.status(500).json(`could not create product route x500 ${err}`)
    }
}

// product routes 
const productRoutes = (app: express.Application) => {
    // create - token required
    app.post('/product', verifyAuthToken, create)
    // index
    app.get('/product', index)
    // show
    app.get('/product/:id', show)
}

export default productRoutes