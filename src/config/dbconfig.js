const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connect successfully')
    }
    catch(err){
        console.log('Mongodb connection failed. ',err)
        process.exit(1)
    }
}

module.exports = connectDB