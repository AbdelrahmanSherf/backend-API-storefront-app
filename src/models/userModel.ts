import DBConn from '../database'
import bcrypt from 'bcrypt'

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    user_password: string;
}

// global variables
const paper = process.env.BCRYPT_SECRET
const salt = Number(process.env.SALT_ROUNDS)

export class userModel {
    // create - create new user
    async create(first_name: string, last_name: string, user_password: string): Promise<User> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'INSERT INTO students (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *'
            const hashedPassword = bcrypt.hashSync(user_password + paper, salt)
            const result = await dbConn.query(sqlQuery, [first_name, last_name, hashedPassword])
            dbConn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Unable to create new user with first name ${first_name}, ${err}`)
        }
    }

    // show - fetch a specific user by id
    async show(userId: string): Promise<User> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            const result = await dbConn.query(sqlQuery, [userId])
            dbConn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error('Unable to fetch user with id ' + userId)
        }
    }

    // index - fetch all users
    async index(): Promise<User[]> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'SELECT * FROM users'
            const result = await dbConn.query(sqlQuery)
            dbConn.release()
            return result.rows
        } catch(err) {
            throw new Error('Unable to fetch all users' + err)
        }
    }

    // delete - delete a specific user by id
    async delete(userId: string): Promise<User> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'DELETE FROM users WHERE id=($1) RETURNING *'
            const result = await dbConn.query(sqlQuery, [userId])
            dbConn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error('Unable to delete user with id ' + err)
        }
    }
}