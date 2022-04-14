const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

//Init Middleware
app.use(express.json({extended:false}))

app.use('/api/users',require('./src/routes/user.routes'))
app.use('/api/shop',require('./src/routes/seller.routes'))
app.use('/api/dashboard',require('./src/routes/dashboard.routes'))
app.use('/api/order',require('./src/routes/order.routes'))
app.use('/api/products',require('./src/routes/products.routes'))

const PORT = 8585


app.listen(PORT,(req,res)=>{
    console.log("Srever running on port 8585")
})

module.exports = app