let util = require("../util")

createEmail = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide en email',
        })
    }


    const email = { ...body, creationDate: new Date() }

    if (!email) {
        return res.status(400).json({ success: false, error: err })
    }

    let id = util.addEmail(email)
    if (id) {
        return res.status(201).json({
            success: true,
            id: id,
            message: 'email created!',
        })
    } else {
        return res.status(400).json({
            error,
            message: 'email not created!',
        })
    }
}


getEmails = async (req, res) => {
    let emails = util.getEmails()
    if (!emails.length) {
        return res
            .status(404)
            .json({ success: false, error: `No More Emails` })
    }
    return res.status(200).json({ success: true, emails })

}


getEmailsByUser = async (req, res) => {
    let { username } = req.params
    let emails = util.getEmailsByUser(username)

    if (!emails.length) {
        return res
            .status(404)
            .json({ success: false, error: `No More Emails` })
    }
    return res.status(200).json({ success: true, emails })
}

deleteEmails = async (req, res) => {
    let { id } = req.body
    let id_deletedEmail = util.deleteEmail(id)
    if (!id_deletedEmail) {
        return res
            .status(404)
            .json({ success: false, error: `Email not found` })
    }
    return res.status(200).json({
        success: true,
        data: { id_deletedEmail },
        message: "email deleted"
    })
}

module.exports = {
    createEmail,
    getEmails,
    getEmailsByUser,
    deleteEmails
}
