import { User, UserModel } from '../../models/userModel'

const users = new UserModel()

// new user object 
const testUser: User = {
    first_name: 'New User',
    last_name: 'jasmine test',
    user_password: 'pass'
}

describe('2) <-------------------- User Model Tests ----------------------->', () => {
    
    it('Should have create method', async () => {
        expect(users.create).toBeDefined()
    })

    it('Should create new user', async () => {
        const createUser = await users.create(testUser.first_name, testUser.last_name, testUser.user_password)
        testUser.id = createUser.id
        expect(createUser).toBeTruthy()
        expect(createUser.first_name).toEqual(testUser.first_name)
        expect(createUser.last_name).toEqual(testUser.last_name)
    })
    
    it('Should have show method', async () => {
        expect(users.show).toBeDefined()
    })

    it('Shuld show user by id', async () => {
        const showUser = await users.show(String(testUser.id))
        expect(showUser).toBeTruthy()
        // refactor this might fail when u make more users // but i guess not becuse i have assigned it to the incoming id so let see
        expect(showUser.id).toEqual(testUser.id) 
        expect(showUser.first_name).toEqual(testUser.first_name)
        expect(showUser.last_name).toEqual(testUser.last_name)
    })

    it('Should have index method', async () => {
        expect(users.index).toBeDefined()
    })

    it('Should index user', async () => {
        const indexUser = await users.index()
        expect(indexUser).toBeTruthy()
        expect(indexUser.length).toBeGreaterThan(0)
        expect(indexUser[0].first_name).toBeDefined()
        expect(indexUser[0].last_name).toBeDefined()
        expect(indexUser[0].user_password).toBeDefined()
    })

    it('Should have delete method', async () => {
        expect(users.delete).toBeDefined()
    })

    it('Shuld delete user by id', async () => {
        const deleteUser = await users.delete(String(testUser.id))
        expect(deleteUser).toBeTruthy()
        expect(deleteUser.id).toEqual(testUser.id)
    })

})