// routing  for emails
const express = require('express')
const EmailCtrl = require('../controllers/email-ctrl')
const {validateFields} = require('../middlewares/email-middleware')
const {authenticate} = require('../middlewares/auth-middleware')


const router = express.Router()

router.post('/email',validateFields , EmailCtrl.createEmail)
router.get('/emails', EmailCtrl.getEmails)
router.get('/emails/:username',authenticate, EmailCtrl.getEmailsByUser)
router.delete('/email', EmailCtrl.deleteEmails)


module.exports = router