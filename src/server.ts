import express from 'express'
import productRoutes from './handlers/productHandler'

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

export default app
