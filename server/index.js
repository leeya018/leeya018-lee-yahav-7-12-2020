const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {initDb} = require('./util.js')

const db = require('./db')
const emailRouter = require('./routes/email-router')
const userRouter = require('./routes/user-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

initDb()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', emailRouter)
app.use('/api', userRouter)



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))