const express= require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')

// Import Files
const DbConnection = require('./db/DbConnection')


const app = express()
dotenv.config()

// Database Connection
DbConnection()

// middlewares
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 8000



app.get('/', (req, res) => {
    res.send("Hello From the Server!!!")
})






// Server Listen
app.listen(PORT, () => {
    console.log(colors.blue.inverse(`Server is Listening on PORT ${PORT}`))
})