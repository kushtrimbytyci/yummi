const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const db = require('./config/db')


dotenv.config({path:path.join(__dirname,'/config','/config.env')})
const app = express()

//Body parsers
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('images'))
app.use(cors())

//API routes
const user = require('./routes/user')
app.use('/api',user)
const auth = require('./routes/auth')
app.use('/api/auth',auth)
const orders = require('./routes/orders')
app.use('/api/orders',orders)
const products = require('./routes/products')
app.use('/api/products',products)



app.use((error, req, res, next) => {
    
    res.status(error.statusCode || 500); 
    res.json({
        error: error.message || "Not Found"
    });
  });
  
  if(process.env.NODE_ENV==='production')
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
  
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })







const PORT = process.env.PORT || 5000
//In order to make sure database gets first connected and then the server listens.
db.authenticate().then(()=>{
    console.log('Database connected')
    app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`))
}).catch((e)=>{
    console.log('Something is wrong with the database',e)
})



const http = require('http')
const server = http.createServer()
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`);
  server.close(() => process.exit(1));
});
