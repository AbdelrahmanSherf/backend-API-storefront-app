import express from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/userModel'
import verifyAuthToken from '../middleware/verifyAuthToken'

const users = new UserModel()
const token_secret = String(process.env.TOKEN_SECRET)

// create - new user
const create = async (req: express.Request, res: express.Response) => {
    try {
        const { first_name, last_name, user_password } = req.body
        const createUser = await users.create(first_name, last_name, user_password)
        // JWT token creation process
        const generateToken = jwt.sign({
            tokenUser: {
                id: createUser.id,
                first_name: createUser.first_name,
                last_name: createUser.last_name,
                user_password: createUser.user_password
            }
        }, token_secret)
        return res.json(generateToken).status(200)
    } catch(err) {
        return res.json(`could not create user route x500 ${err}`).status(500)
    }
}

// show - user by id
const show = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id
        const userById = await users.show(userId)
        return res.json(userById).status(200)
    } catch(err) {
        return res.json(`could not show user by id route x500 ${err}`).status(500)
    }
}

// index - users
const index = async(_req: express.Request, res: express.Response) => {
    try {
        const indexUsers = await users.index()
        return res.json(indexUsers).status(200)
    } catch(err) {
        return res.json(`could not index users route x500 ${err}`).status(500)
    }
}

// delete - user by id 
const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id
        const deleteUser = await users.delete(userId)
        return res.json(deleteUser).status(200)
    } catch(err) {
        return res.json(`could not delete users route x500 ${err}`).status(500)
    }
}

// user routes
const userRoutes = async (app: express.Application) => {
    // create - ** generates token ** 
    app.post('/user', create)
    // show - token required 
    app.get('/user/:id', verifyAuthToken, show)
    // index - token required 
    app.get('/user', verifyAuthToken, index)
    // delete - token required
    app.delete('/user/:id', verifyAuthToken, destroy)
}

export default userRoutes
