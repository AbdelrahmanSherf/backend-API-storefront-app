import supertest from 'supertest'
import app from '../../server'
import { JwtPayload, verify } from 'jsonwebtoken'

const appReq = supertest(app)
const token_secret = process.env.TOKEN_SECRET

let token: string
let userId: string

describe('<-------------------- Order Handler Tests -------------------->', () => {
    beforeAll(async () => {
        // create new user to acquire new token
        await appReq.post('/user')
        .send({
            first_name: 'Test user',
            last_name: 'order handler spec',
            user_password: 'pass'
        })
        .expect(200)
        .then((resData) => {
            token = resData.body
            const JWTDecoded = verify(token as string, token_secret as string) as JwtPayload
            userId = JWTDecoded.tokenUser.id
        })
    })

    it('POST: create new order - Token required', async () => {
        await appReq.post('/order')
        .set('Authorization', `Bearer ${token}`)
        .send({
            user_id: userId,
            order_status: 'Active'
        })
        .expect(200)
        .then((resData) => {
            expect(resData).toBeTruthy()
            expect(resData.body.order_status).toBeDefined()
        })
    })

    it('POST: Should not create new order - invalid Token', async () => {
        await appReq.post('/order')
        .send({
            user_id: userId,
            order_status: 'Inactive'
        })
        .expect(401)
    })

    it('GET: show order by user id - Token required', async () => {
        await appReq.get(`/order/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((resData) => {
            expect(resData).toBeTruthy()
        })
    })

    it('GET: Should not show order by user id - invalid Token', async () => {
        await appReq.get(`/order/${userId}`)
        .expect(401)
    })
})