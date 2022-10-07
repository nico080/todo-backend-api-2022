const supertest = require("supertest");
const app = require("../src/app");
const randomstring = require("randomstring");

const uname = randomstring.generate({
    length: 8,
    charset: 'alphabetic'
})

const user = {
    uname,
    password: 'password123'
}


describe('Create User & Generate Token', () => {
    it('Should create a new user', async () => {
        const res = await supertest(app)
            .post(`/api/users`)
            .send(user)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
    })

    it('Should be able to generate token', async () => {
        const res = await supertest(app)
            .post(`/api/auth`)
            .send(user)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })
})