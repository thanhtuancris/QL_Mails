const express = require('express');
const router = express.Router();
const mailController = require('../controller/mail.controller');
const middleware = require('../middleware/mail.middleware')

router.post('/mail/add-mail', mailController.addMail);
// router.post('/mail/get-all-mail', mailController.getMailByAdmin);
router.post('/mail/get-mail', middleware.getMail, mailController.getMailByUser);
router.post('/mail/test', mailController.testgetMailByUser);
router.post('/mail/edit-mail',middleware.editMail, mailController.editMail);
router.post('/mail/delete-mail', mailController.deleteMail);
router.post('/mail/delete-mails',middleware.deleteMails, mailController.deleteMails);
module.exports = router;