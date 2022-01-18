import { User, UserModel } from '../../models/userModel'
import { Product, ProductModel } from '../../models/productModel'
import { Order, OrderModel } from '../../models/orderModel'
import { OrderDetails, OrderDetailsModel } from '../../models/orderDetailsModel'

const users = new UserModel()
const products = new ProductModel()
const orders = new OrderModel()
const orderDetails = new OrderDetailsModel()

// new user object
const testUser: User = {
    first_name: 'Test User',
    last_name: 'Order details model',
    user_password: 'pass'
}

// new product object 
const testProduct: Product = {
    product_name: 'Test Product',
    price: 30
}

// new order object
const testOrder: Order = {
    user_id: 0,
    order_status: 'Active'
}

// new order details object 
const testOrderDetails: OrderDetails = {
    quantity: 6,
    order_id: 0,
    product_id: 0
}

describe('<------------------ Order Details Model Tests ----------------->', () => {
    beforeAll( async () => {
        // create new user
        try {
            const newUser = await users.create(testUser.first_name, testUser.last_name, testUser.user_password)
            testUser.id = newUser.id
            // console.log(newUser) // debugging
        } catch(err) {
            console.error(err, 'unable to create new user order details model spec')
        }
        // create product
        try {
            const newProduct = await products.create(testProduct.product_name, testProduct.price)
            testProduct.id = newProduct.id
            // console.log(newProduct) // debugging
        } catch(err) {
            console.error(err, 'unable to create new user order details model spec')
        }
        // create new order with user id
        try {
            const newOrder = await orders.create(Number(testUser.id), testOrder.order_status)
            testOrder.id = newOrder.id
            // console.log(newOrder) // debugging
        } catch(err) {
            console.error(err, 'unable to create new user order details model spec')
        }
    })
    
    it('Should have create method', async () => {
        expect(orderDetails.create).toBeDefined()
    })

    it('Should create order details', async () => {
        const createOrderDetails = await orderDetails.create(testOrderDetails.quantity, Number(testOrder.id), Number(testProduct.id))
        // console.log(createOrderDetails) // debugging
        expect(createOrderDetails).toBeTruthy()
        expect(createOrderDetails.quantity).toBeDefined()
        expect(createOrderDetails.order_id).toBeDefined()
        expect(createOrderDetails.product_id).toBeDefined()
    })

    it('Should have show method', async () => {
        expect(orderDetails.shsow).toBeDefined()
    })

    it('Should show order details by order id', async () => {
        const showOrderDetails = await orderDetails.shsow(String(testOrder.id))
        // console.log(showOrderDetails) //debugging
        expect(showOrderDetails).toBeTruthy()
        expect(showOrderDetails[0].quantity).toBeDefined()
        expect(showOrderDetails[0].order_id).toBeDefined()
        expect(showOrderDetails[0].product_id).toBeDefined()
    })
})
