const request = require('supertest')
const app = require('../../src/config/server-app')

describe('Test CANDIDATE - Method: GET', ()=>{
    it('Shall get an array with more than 0 elements', async ()=>{
        const response = await request(app)
        .get('/candidates')
        .send()
        expect(response.body.length).toBeGreaterThan(0)
    })
    it('Shall get an obj at first position with Name and Email filled', async ()=>{
        const response = await request(app)
        .get('/candidates')
        .send()
        //console.log(response.body[0])
        const n = 0
        let isText = 1;
        const arrItensOfCandidateObj = [
            response.body[n].name,
            response.body[n].email
        ]
        arrItensOfCandidateObj.forEach(item=>{
            if( !(typeof item == 'string') ){
                isText = 0
            }
        })
        expect(isText).toBe(1)
    })

})