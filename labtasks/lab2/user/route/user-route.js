const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');

router.post('/', userController.registerUser);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateActiveBookings);

module.exports = router;
