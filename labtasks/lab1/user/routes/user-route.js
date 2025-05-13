const express = require('express');
const { registerCustomer, getCustomer, updatePreferences } = require('../controllers/user-controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerCustomer);
router.get('/:id', authenticateToken, getCustomer);
router.put('/:id/preferences', authenticateToken, updatePreferences);

module.exports = router;
