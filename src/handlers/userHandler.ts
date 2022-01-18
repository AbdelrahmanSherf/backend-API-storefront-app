import express from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/userModel'
import verifyAuthToken from '../middleware/verifyAuthToken'

const users = new UserModel()
const token_secret = String(process.env.TOKEN_SECRET)

// create - new user
const create = async (req: express.Request, res: express.Response) => {
    if(req.body.first_name == undefined || req.body.last_name == undefined || req.body.user_password == undefined) {
        return res.status(404).json('Error invalid user information')
    } else {
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
            return res.status(200).json(generateToken)
        } catch(err) {
            return res.status(500).json(`could not create user route x500 ${err}`)
        }
    }
}

// show - user by id
const show = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id
        const userById = await users.show(userId)
        return res.status(200).json(userById)
    } catch(err) {
        return res.status(500).json(`could not show user by id route x500 ${err}`)
    }
}

// index - users
const index = async(_req: express.Request, res: express.Response) => {
    try {
        const indexUsers = await users.index()
        return res.status(200).json(indexUsers)
    } catch(err) {
        return res.status(500).json(`could not index users route x500 ${err}`)
    }
}

// delete - user by id 
const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id
        const deleteUser = await users.delete(userId)
        return res.status(200).json(deleteUser)
    } catch(err) {
        return res.status(500).json(`could not delete users route x500 ${err}`)
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
