require ('dotenv').config()
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://nachodbuser:${process.env.MONGO_PASSWD}@cluster0.gdahqev.mongodb.net/eventual`)

.then(() => {
    console.log('Connected to Mongo')
})
.catch((error) => {
    console.log('Error ocurred connecting Mongo: ', error)
})

module.exports = mongoose