import { Product, ProductModel } from '../../models/productModel'
import { User, UserModel } from '../../models/userModel'

const products = new ProductModel()
const users = new UserModel()

// new user object 
// const test----------------------: User = {
//     first_name: 'Product',
//     last_name: 'test user',
//     user_password: 'pass'
// }

// new product object
const testProduct: Product = {
    product_name: 'product model spec',
    price: 250
}


describe('1) <-------------------- Product Model Tests -------------------->', () => {
    // refactoreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    beforeAll( async () => {
        // create new user to test with
        // try {
        //     const createUser = await users.create(testUser.first_name, testUser.last_name, testUser.user_password)
        //     console.log('************** Successfully created user for product model spec **')
        // } catch(err) {
        //     console.log(err, 'error creating test user for product model spec')
        // }
    })

    it('Should have create method', async () => {
        expect(products.create).toBeDefined()
    })

    it('Should create new product', async () => {
        const createProduct = await products.create(testProduct.product_name, testProduct.price)
        testProduct.id = createProduct.id
        expect(createProduct.product_name).toEqual(testProduct.product_name)
        expect(createProduct.price).toEqual(testProduct.price)
    })

    it('Should have show method', async () => {
        expect(products.show).toBeDefined()
    })

    it('Should show product by id', async () => {
        const showProduct = await products.show(String(testProduct.id))
        expect(showProduct).toBeTruthy()
    })

    it('Should have index method', async () => {
        expect(products.index).toBeDefined()
    })

    it('Should index product', async () => {
        const indexProduct = await products.index()
        expect(indexProduct).toContain(testProduct)
        expect(indexProduct).toBeTruthy()
    })
})