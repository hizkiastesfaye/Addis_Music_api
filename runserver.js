require('dotenv').config()
const app = require('./src/app.js')
const gracefulShutdown = require('./utilities/gracefulShutdown')
const connectDB = require('./src/config/dbconfig.js')

async function StartServer (PORT=process.env.PORT || 3007){
    const server = app.listen(PORT,'0.0.0.0',()=>{
        connectDB()
        console.log('connected in http://localhost:3007 ....')
    })
    gracefulShutdown(server)
    return server
}
StartServer()