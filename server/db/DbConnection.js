const mongoose = require('mongoose')
const colors = require('colors')

const DbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn){
            console.log(colors.green.inverse('Database Connected Successfully!'))
        }
    } catch (error) {
        console.log(colors.red.inverse('Database Connection Failed!'))
    }

}

module.exports = DbConnection;