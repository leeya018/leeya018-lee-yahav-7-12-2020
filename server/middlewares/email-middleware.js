// check that all fields are filled with data

validateFields = (req, res, next) => {
    let { sender,receiver,message,subject } = req.body
    let errMessages = []
    if (!sender) {
        errMessages.push("Sender is missing")
    }
    if (!receiver) {
        errMessages.push("Receiver is missing")
    }
    if (!message) {
        errMessages.push("Message is missing")
    }
    if (!subject) {
        errMessages.push("Subject is missing")
    }
    if (errMessages.length > 0) {
        return res.status(400).json({
            success: false,
            validation: false,
            errors: errMessages
        })
    }
    next()
}

module.exports = {
    validateFields
}   