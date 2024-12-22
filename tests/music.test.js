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

    const song1 = {
        title: 'derese',
        artist:'abebaw',
        album:'manew',
        genre:'afrobit'
    }
    const song2 = {
        title: 'adea',
        artist:'abebaw',
        album:'manew',
        genre:'pop'
    }
    test('test /add',async()=>{
        const res = await request(app)
        .post('/add')
        .send(song2)
        console.log(res.text)
    })
    test.only('test /get',async()=>{
        const res = await request(app)
        .get('/get')
        console.log(res.body)
    })
    test('test /get?',async()=>{
        const res = await request(app)
        .get('/get?album=manew&title=adea')
        console.log(res.body)
    })
})