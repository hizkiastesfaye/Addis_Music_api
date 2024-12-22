require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const SongModel = require('./features/model/musicModel')
const Music = require('./features/routing/musicRoute')


const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/music',(req,res)=>{
    res.send('Welcome to addis music')
})
app.get('/post',async (req,res)=>{

    res.send('Welcome to addis music')
    
})
app.get('/gett',async (req,res)=>{
    const anoSong = await SongModel.findOne({title:'koye'})
    if(anoSong.length ==0){
        res.send('try again')
    }
    else{
        res.send(anoSong)
    }
})
app.use('/',Music)

app.use((req,res)=>{
    res.status(404).json({error:'page not found'})
})

module.exports = app
