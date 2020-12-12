const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Email = new Schema(
    {
        sender: { type: String, required: true },
        receiver: { type: String, required: true },
        message: { type: String, required: true },
        subject: { type: String, required: true },
        creationDate: { type: Date, required: true },
    },
)

module.exports = mongoose.model('emails', Email)