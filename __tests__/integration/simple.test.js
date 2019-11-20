const request = require('supertest')
const app = require('../../src/config/server-app')

describe('testing the jest Tdd', ()=>{
    it('',()=>{
        const a = 1
        const b = 3

        const sum = a+b

        expect(sum).toBe(4)
    })

    it('shall get a user', async ()=>{
        const response = await request(app)
        .get('/candidates')
        .send()
        console.log(response.body)
        
        expect(response.body.length).toBeGreaterThan(0)
    })
})