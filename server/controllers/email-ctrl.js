const Email = require('../models/email-model')

createEmail = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide en email',
        })
    }

    const email = new Email({ ...body, creationDate: new Date() })

    if (!email) {
        return res.status(400).json({ success: false, error: err })
    }

    email
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: email._id,
                message: 'email created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'email not created!',
            })
        })
}


getEmails = async (req, res) => {
    await Email.find({}, (err, emails) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!emails.length) {
            return res
                .status(404)
                .json({ success: false, error: `No More Emails` })
        }
        return res.status(200).json({ success: true, emails })
    }).catch(err => console.log(err))
}


getEmailsByUser = async (req, res) => {
    let { username } = req.params
    await Email.find({ $or: [{ sender: username }, { receiver: username }] }, (err, emails) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!emails.length) {
            return res
                .status(404)
                .json({ success: false, error: `No More Emails` })
        }
        return res.status(200).json({ success: true, emails })
    }).catch(err => console.log(err))
}

deleteEmails = async (req, res) => {
    let { id } = req.body
    await Email.findByIdAndDelete(id, (err, email) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!email) {
            return res
                .status(404)
                .json({ success: false, error: `Email not found` })
        }
        return res.status(200).json({
            success: true,
            data: { id },
            message: "email deleted"
        })
    }).catch(err => console.log(err))
}

module.exports = {
    createEmail,
    getEmails,
    getEmailsByUser,
    deleteEmails
}
