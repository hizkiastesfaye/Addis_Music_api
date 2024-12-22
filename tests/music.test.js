const app = require('../src/app')
const request = require('supertest')
const mongoose = require('mongoose')
const SongModel = require('../src/features/model/musicModel')
const connectDB = require('../src/config/dbconfig')


beforeAll(async ()=>{
    connectDB()
})
afterAll(async ()=>{
    await mongoose.connection.close()
})
describe('test /music',()=>{
    test('test first test', async ()=>{
        const res = await request(app)
        .get('/')
        console.log(res.text)
    })
    test('test /add',async()=>{
        const res = await request(app)
        .get('/add')
        console.log(res.text)
    })
})