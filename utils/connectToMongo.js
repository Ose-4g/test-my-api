const mongoose = require('mongoose')

const DB = process.env.MONGO_URL

const connectToMongo = async()=>{
    
    try{
        const conn = await mongoose.connect(DB, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        }) 

        console.log(`Mongo.db successfully connected to ${conn.connection.host}`)
    }

    catch(err){
        console.log("unable to connect to database")
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectToMongo