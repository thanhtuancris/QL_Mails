const express = require('express');
const router = express.Router();
const accountController = require('../controller/account.controller');
// const middleware = require('../middleware/account.middleware')

router.post('/account/login', accountController.login);
router.post('/account/logout', accountController.logout);
router.post('/account/change-password', accountController.changePassword);
router.post('/account/get-user', accountController.getUser);

module.exports = router;