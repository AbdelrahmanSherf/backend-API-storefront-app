import express from 'express'
import orderDetailsRoute from './handlers/orderDetailsHandler'
import orderRoutes from './handlers/orderHandler'
import productRoutes from './handlers/productHandler'
import userRoutes from './handlers/userHandler'

const app = express()
const port = 5050

app.use(express.json())

app.listen(port, () => {
    console.log('Successful server running on port: ' + port)
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!')
})

/**
 * Application Routes
 */
// Product Routes
productRoutes(app)

// User Routes
userRoutes(app)

// Order Routes 
orderRoutes(app)

// Order Details Routes
orderDetailsRoute(app)

export default app
