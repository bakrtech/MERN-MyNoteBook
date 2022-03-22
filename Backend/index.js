const connectToMongo = require("./db")
const express = require('express')
connectToMongo();
const app = express()
const port = 5000
//if we want to use body through request we need a middle ware : the way is the following:
app.use(express.json())
//Avaible Routes:
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Mynotebook Backend listening on port https://127.0.0.1:${port}`)
})