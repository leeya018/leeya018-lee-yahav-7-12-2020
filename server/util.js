
const Email = require('./models/email-model')

const initDb = () => {
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




let db = {
    users: [],
    emails: []
}


addEmail = (email) => {
    email._id = Date.now()
    db.emails.push(email)
    return email._id
}


getEmails = () => {
    return db.emails
}

getEmailsByUser = (username) => {
    return db.emails.filter((email) => (username == email.receiver || username == email.sender))
}

deleteEmail = (id) => {
    let foundEmail = db.emails.find(email => email._id == id)
    db.emails.filter(email => id !== email._id)
    return foundEmail ? foundEmail._id : null
}



module.exports = { addEmail, initDb, getEmails, getEmailsByUser, deleteEmail }