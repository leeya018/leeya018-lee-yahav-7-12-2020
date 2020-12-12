

let db = {
    users: [],
    emails: []
}
//=====users ====
findUser = ( username, password)=>{
    let userFound = db.users.find(user=>(user.username == username))
    return userFound

}
checkUserAndPass = ( username, password)=>{
    let userFound = db.users.find(user=>(user.username == username && user.password == password))
    return userFound

}
addUser = ( newUser )=>{
    newUser._id = Date.now()
    db.users.push(newUser)
    return newUser._id
}

//=====emails ====


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
    db.emails = db.emails.filter(email => id !== email._id)
    return foundEmail ? foundEmail._id : null
}



module.exports = { addEmail, getEmails, getEmailsByUser, deleteEmail,findUser,addUser }