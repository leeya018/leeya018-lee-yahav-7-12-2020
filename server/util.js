
const Email = require('./models/email-model')

module.exports = initDb = () => {
    const emails = [
        new Email({ sender: "leeya", receiver: "roni", message: "This was a long day", subject: "STATEMENT", creationDate: new Date() }),
        new Email({ sender: "roni", receiver: "lee", message: "I know", subject: "respond", creationDate: new Date() })
    ]

    for (email of emails) {
        email
            .save()
            .then(() => {
                console.log("data has added")
            }).catch(error => {
                console.log(error)
            })
    }
}