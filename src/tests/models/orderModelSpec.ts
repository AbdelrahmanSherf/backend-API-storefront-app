import { Order, OrderModel } from '../../models/orderModel'
import { User, UserModel } from '../../models/userModel'

const orders = new OrderModel()
const users = new UserModel()

// new user object
const testUser: User = {
    first_name: 'Test User',
    last_name: 'Order Model',
    user_password: 'pass'
}

// new order object
const testOrder: Order = {
    user_id: 0,
    order_status: 'Active'
}

describe('3) <-------------------- Order Model Tests ---------------------->', () => {
    beforeAll( async () => {
        // create new use to test order model
        try {
            const newUser = await users.create(testUser.first_name, testUser.last_name, testUser.user_password)
            // console.log('**************** Successfully created user for product model spec **') //debugging
            if(newUser.id !== null) {
                testUser.id = newUser.id
            } else { console.log('erro createing test user for order id is null') }
            testOrder.user_id = testUser.id as number 
        } catch(err) {
            console.log(err, 'error creating test user for order model spec')
        }
    })

    it('Shuld have create method', async () => {
        expect(orders.create).toBeDefined()
    })

    it('Shuld create new order', async () => {
        const createOrder = await orders.create(testOrder.user_id, testOrder.order_status)
        expect(createOrder).toBeTruthy()
        expect(createOrder.order_status).toEqual(testOrder.order_status)
        expect(Number(createOrder.user_id)).toEqual(testOrder.user_id) 
    })

    it('Should have show method', async () => {
        expect(orders.show).toBeDefined()
    })

    it('Should show order by user id', async () => {
        const showOrder = await orders.show(String(testUser.id))
        expect(showOrder).toBeTruthy()
        expect(showOrder.length).toBeGreaterThan(0)
    })
})