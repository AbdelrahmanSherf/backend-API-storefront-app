import express from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization!
        const token = authorizationHeader.split(' ')[1]
        const token_secret = String(process.env.TOKEN_SECRET)
        jwt.verify(token, token_secret)
        next()
    } catch(err) {
        console.error('Error VerifyAuthToken', err)
        return res.json(`Invalid authorization user with JWT x401 ${err}`).status(401)
    }
}

export default verifyAuthToken