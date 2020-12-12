const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const emailRouter = require('./routes/email-router')
const userRouter = require('./routes/user-router')

const app = express()
const apiPort = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', emailRouter)
app.use('/api', userRouter)



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))