import supertest from 'supertest'
import app from '../../server'
import { Product } from '../../models/productModel'

const appReq = supertest(app)

let toekn: string;

// new product objec
const testProduct: Product = {
    product_name: 'Product Handler test',
    price: 43
}

describe('<-------------------- Product Handler Tests -------------------->', () => {
    beforeAll(async () => {
        // create new user to acquire new token
        try {
            await appReq.post('/user')
            .send({
                first_name: 'Test User',
                last_name: 'Product handler spec',
                user_password: 'pass'
            })
            .expect(200)
            .then((resData) => {
                toekn = resData.body
            })
        } catch(err) {
            console.error(err, 'could not create new user for product handler spec')
        }
    })

    it('POST: create new product - with valid Token', async () => {
        await appReq.post('/product')
        .set('Authorization', `Bearer ${toekn}`)
        .expect(200)
        .send(testProduct)
        .then((resData) => {
            testProduct.id = resData.body.id
        })
    })

    it('POST: do not create new product - with invalid Token', async () => {
        await appReq.post('/product')
        .set('Authorization', 'Bearer invalid token')
        .send(testProduct)
        .expect(401)
    })

    it('GET: index products', async () => {
        await appReq.get('/product')
        .expect(200)
    })

    it('GET: show product by id', async () => {
        await appReq.get(`/product/${testProduct.id}`)
        .expect(200)
        .then((res) => {
            expect(res.body).toBeTruthy()
            expect(res.body.id).toBeDefined()
            expect(res.body.product_name).toBeDefined()
            expect(res.body.price).toBeDefined()
        })
    }) 
})
