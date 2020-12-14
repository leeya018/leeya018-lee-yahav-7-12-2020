const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

const emailRouter = require('./server/routes/email-router')
const userRouter = require('./server/routes/user-router')

const app = express()
const apiPort = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'client/build')))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', emailRouter)
app.use('/api', userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'client/build/index.html'))
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))