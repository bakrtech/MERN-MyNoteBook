const mongoose = require('mongoose');
const mongooseURL='mongodb://localhost:27017/mynotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const connectToMongo =() => {
    mongoose.connect(mongooseURL,()=>{
        console.log('connected to mongo');
    })
}
module.exports = connectToMongo;