import supertest from 'supertest'
import app from '../../server'
import { User } from '../../models/userModel'
import { Product } from '../../models/productModel'
import { Order } from '../../models/orderModel'
import { JwtPayload, verify } from 'jsonwebtoken'

const appReq = supertest(app)

const token_secret = process.env.TOKEN_SECRET
let token: string

// new user object
const testUser: User = {
    first_name: 'Test User',
    last_name: 'Order details handler sepc',
    user_password: 'pass'
}

// new product object 
const testProduct: Product = {
    product_name: 'Test product',
    price: 31
}

// new order object
const testOrder: Order = {
    user_id: 0,
    order_status: 'Canceled'
}

describe('<------------------ Order details Handler Tests ------------------>', () => {

    beforeAll(async () => {
        // create new user to acquire token 
        try {
            await appReq.post('/user')
            .send(testUser)
            .expect(200)
            .then((resData) => {
                token = resData.body
                const JWTDecoded = verify(token as string, token_secret as string) as JwtPayload
                testUser.id = JWTDecoded.tokenUser.id
                testOrder.user_id = JWTDecoded.tokenUser.id
            })
        } catch(err) {
            console.error(err, 'unable to create new user, order details handler spec')
        }

        // create new product to acquire product id 
        try {
            await appReq.post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send(testProduct)
            .expect(200)
            .then((resData) => {
                testProduct.id = resData.body.id
            })
        } catch(err) {
            console.error(err, 'unable to create new product, order details handler spec')
        }

        // create new order to acquire order id 
        try {
            await appReq.post('/order')
            .set('Authorization', `Bearer ${token}`)
            .send(testOrder)
            .expect(200)
            .then((resData) => {
                testOrder.id = resData.body.id
            })
        } catch(err) {
            console.error(err, 'unable to create new order, order details handler spec')
        }
    })

    it('POST: create order details - Token required', async () => {
        await appReq.post('/order-details')
        .set('Authorization', `Bearer ${token}`)
        .send({
            quantity: 94,
            order_id: testOrder.id,
            product_id: testProduct.id
        })
        .expect(200)
        .then((resData) => {
            expect(resData.body).toBeTruthy()
            expect(resData.body.quantity).toBeDefined()
            expect(resData.body.order_id).toBeDefined()
            expect(resData.body.product_id).toBeDefined()
            expect(resData.body.quantity).toEqual(94)
        })
        
    })

    it('POST: Should not create order details - invalid Token', async () => {
        await appReq.post('/order-details')
        .set('Authorization', `Bearer invalid token`)
        .send({
            quantity: 3000,
            order_id: testOrder.id,
            product_id: testProduct.id
        })
        .expect(401)
    })

    it('GET: show order details by order id - Token required', async () => {
        await appReq.get(`/order-details/${testOrder.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((resData) => {
            expect(resData.body).toBeTruthy()
            expect(resData.body[0].quantity).toBeDefined()
            expect(resData.body[0].quantity).toEqual(94)
            expect(resData.body[0].order_id).toBeDefined()
            expect(resData.body[0].product_id).toBeDefined()
        })
    })
})