require('dotenv').config()
const express = require('express')
const connectToMongo = require('./utils/connectToMongo')
const Link = require('./models/Link')
const fs = require('fs')


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/static'))



const PORT = process.env.PORT || 9000

const startServer = async()=>{
    await connectToMongo()
    app.listen(PORT,()=>{
        console.log(`
        #######################################

        #### App is listening on port ${PORT}#####
        #######################################`)
    })

}






app.get('/',(req,res,next)=>{
    return res.status(200).sendFile(
        __dirname+'/static/index.html'
    )
})

app.post('/create',async (req,res,next)=>{

    const {title,url,method} = req.body
    const link = await Link.create({
        title,
        url,
        method
    })

    res.status(200).send(
        `
        Your link can be tested at ${req.protocol+'://'+req.headers.host+'/'+link._id}
        `
    )
})

app.get('/:id',async(req,res,next)=>{
    const id = req.params.id

    console.log(id)

    try {
        const link = await Link.findById(id)
        if(!link)
        {
            return res.status(404).send("Link expired or not found")
        }
        fs.readFile(__dirname+'/static/form.html', (err,html)=>{
            html = String(html)
            html = String(html).replace("{DEFAULT_URL}",link.url)
            html = String(html).replace("{TITLE}",link.title)
            html = String(html).replace(`\"${link.method}\"`,`\"${link.method}\" selected`)
            res.status(200).write(String(html))
            res.end()
        })
        //res.status(200).sendFile(__dirname+'/static/form.html')
        
    } catch (error) {
        console.log(error)
        res.status(404).send("Page not found")
    }
})


app.use("*",(req,res,next)=>{
    return res.status(404).json({
        status:"error",
        message:"specified endpoint does not exist on this server"
    })
})


startServer()
