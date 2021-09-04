const mongoose = require('mongoose')


const linkSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'title is required']
        },
        url:{
            type:String,
            required:[true,'url is required']
        },

        method:{
            type:String,
            required:[true,'method is required'],
            enum:['POST','PUT','PATCH','GET','DELETE']
        },
    },
    {timestamps:true}
)

module.exports = mongoose.model("Link",linkSchema) 