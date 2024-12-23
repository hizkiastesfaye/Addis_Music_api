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
    const song3 = {
        title: 'john',
        artist:'abebaw',
        album:'manew',
        genre:'afrobit'
    }
    test('test /add',async()=>{
        const res = await request(app)
        .post('/add')
        .send(song1)
        console.log(res.body)
    })
    test('test /get',async()=>{
        const res = await request(app)
        .get('/get')
        console.log(res.body)
    })
    test('test /get?',async()=>{
        const res = await request(app)
        .get('/get?album=manew&title=adea')
        console.log(res.body)
    })
    test('test /update/:id',async()=>{
        const res = await request(app)
        .put('/update/67686e59aa4dc6b062857fd8')
        .send(song3)
        console.log(res.body)
    })
    test('test /delete/:id',async()=>{
        const res = await request(app)
        .delete('/delete')
        console.log(res.body)
    })
})

describe('test errors',()=>{
    const song4 = {
        title: 'wills',
        artist:'abebaw',
        
    }
    test('test /add',async()=>{
        const res = await request(app)
        .post('/add')
        .send(song4)
        console.log(res.body)
    })
    test.only('test /update/:id',async()=>{
        const res = await request(app)
        .put('/update/67686e59aa4dc6b062857fd8')
        .send(song4)
        console.log(res.body)
    })
    
})