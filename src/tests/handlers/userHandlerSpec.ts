import supertest from 'supertest'
import app from '../../server'
import { JwtPayload, verify } from 'jsonwebtoken'
import { User } from '../../models/userModel'

const appReq = supertest(app)

// global variables
let token_secret = process.env.TOKEN_SECRET
let token: string
let userId: number

// new user object
const testUser: User = {
    first_name: 'New User',
    last_name: 'User handler spec',
    user_password: 'pass'
}

describe('<-------------------- User Handler Tests -------------------->', () => {

    it('POST: create new user - generates Token', async () => {
        await appReq.post('/user')
        .send(testUser)
        .expect(200)
        .then((resData) => {
            // extracting the token and user id from JWTPayload
            token = resData.body
            const JWTDecoded = verify(token as string, token_secret as string) as JwtPayload
            userId = JWTDecoded.tokenUser.id

            // expect tests
            expect(resData).toBeTruthy()
            expect(JWTDecoded.tokenUser.first_name).toBeDefined()
            expect(JWTDecoded.tokenUser.last_name).toBeDefined()
            expect(JWTDecoded.tokenUser.user_password).toBeDefined()
        })
    })

    it('POST: Should not create new user', async () => {
        await appReq.post('/user')
        .expect(404)
    })

    it('GET: show user by id - with valid Token', async () => {
        await appReq.get(`/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((resData) => {
            expect(resData).toBeTruthy()
            expect(resData.body.first_name).toBeDefined()
            expect(resData.body.last_name).toBeDefined()
            expect(resData.body.user_password).toBeDefined()
        })
    })

    it('GET: Should not show user by id - invalid Token', async () => {
        await appReq.get(`/user/${userId}`)
        .set('Authorization', 'Bearer invalid token')
        .expect(401)
    })

    it('GET: index user - Token required', async () => {
        await appReq.get('/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((resData) => {
            expect(resData.body).toBeTruthy()
        })
    })

    it('GET: Should not index user - invalid Token', async () => {
        await appReq.get('/user')
        .set('Authorization', 'Bearer invalid token')
        .expect(401)
    })

    it('DELETE: delete user by id - Token required', async () => {
        await appReq.delete(`/user/${String(userId)}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((resData) => {
            expect(resData).toBeTruthy()
            expect(resData.body.first_name).toBeDefined()
            expect(resData.body.last_name).toBeDefined()
            expect(resData.body.user_password).toBeDefined()
        })
    })

    it('DELETE: Should not delete user by id - invalid Token', async () => {
        await appReq.delete(`/user/${String(userId)}`)
        .set('Authorization', 'Bearer invalid token')
        .expect(401)
    })
})