import DBConn from '../database'

export type Product = {
    id?: number;
    product_name: string;
    price: number
}

// -- ToDo: -- 
// await db connection
// sql 
// awai tquery the sql 
// release connection
// reutrn result whether an arry or not it depends

export class productModel {
    // index - fetch all products 
    async index(): Promise<Product[]> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'SELECT * FROM products'
            const result = await dbConn.query(sqlQuery)
            dbConn.release()
            return result.rows
        } catch(err) {
            throw new Error('Unable to fetch all products' + err)
        }
    }

    // show - get a specific product by id 
    async show(productId: string): Promise<Product> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'SELECT * FROM products WHERE id=($1)'
            const result = await dbConn.query(sqlQuery, [productId])
            dbConn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error('Unable to fetch product with id' + productId + err)
        }
    }

    // create - create new product with name and price
    async create(product_name: string, price: number): Promise<Product> {
        try {
            const dbConn = await DBConn.connect()
            const sqlQuery = 'INSERT INTO products (product_name, price) VALUES($1, $2) RETURNING *'
            const result = await dbConn.query(sqlQuery, [product_name, price])
            // console.log(result.rows[0], 'product result from model') //debugging
            dbConn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Unable to create new product with name: ${product_name}, ${err}`)
        }
    }
}