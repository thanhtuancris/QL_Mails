const express = require('express');
const router = express.Router();
const mailController = require('../controller/mail.controller');
// const middleware = require('../middleware/data.middleware')

router.post('/mail/add-mail', mailController.addMail);
// router.post('/mail/get-all-mail', mailController.getMailByAdmin);
router.post('/mail/get-mail', mailController.getMailByUser);
module.exports = router;