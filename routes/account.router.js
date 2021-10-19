const express = require('express');
const router = express.Router();
const accountController = require('../controller/account.controller');
const middleware = require('../middleware/account.middleware')

router.post('/account/login',middleware.login ,accountController.login);
router.post('/account/logout', accountController.logout);
router.post('/account/change-password',middleware.changePassword ,accountController.changePassword);
router.post('/account/get-user',middleware.getUser, accountController.getUser);
router.post('/account/get-info',middleware.getUser, accountController.getInfo);
router.post('/account/update-info',middleware.updateInfo, accountController.updateInfo);

module.exports = router;